import EventBus from "./EventBus";
import {nanoid} from 'nanoid';
import Handlebars from "handlebars";
export default class Block {
    static EVENTS = {
        INIT: "init",
        FLOW_CDM: "flow:component-did-mount",
        FLOW_CDU: "flow:component-did-update",
        FLOW_RENDER: "flow:render"
    };

    public id = nanoid(6);
    protected props: any;
    protected refs: Record<string, Block> | Record<string, HTMLElement> = {};
    public children: Record<string, Block>;
    private _element: HTMLElement | null = null;
    private _meta: {props: any};
    private eventBus: () => EventBus;

    constructor(propsWithChildren: any = {}) {
        const eventBus = new EventBus();

        const {props, children} = this._getChildrenAndProps(propsWithChildren);

        this._meta = {
            props
        };
        this.children = children;

        this.props = this._makePropsProxy(props);

        this.eventBus = () => eventBus;

        this._registerEvents(eventBus);
        eventBus.emit(Block.EVENTS.INIT);
    }

    private _getChildrenAndProps(childrenAndProps: any) {
        const props: Record<string, any> = {};
        const children: Record<string, Block> = {};

        Object.entries(childrenAndProps).forEach(([key, value]) => {
            if (value instanceof Block) {
                children[key] = value;
            } else {
                props[key] = value;
            }
        });

        return {props, children};
    }

    private _registerEvents(eventBus: EventBus) {
        eventBus.on(Block.EVENTS.INIT, this._init.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
        eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    }

    private _init() {
        this.init();

        this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }

    protected init() {}

    private _componentDidMount() {
        this.componentDidMount();
    }

    protected componentDidMount() {}


    dispatchComponentDidMount() {
        this.eventBus().emit(Block.EVENTS.FLOW_CDM);

        Object.values(this.children).forEach(child => child.dispatchComponentDidMount());
    }

    private _componentDidUpdate(oldProps: any, newProps: any) {
        const response = this.componentDidUpdate(oldProps, newProps);
        if (response) {
            this._render();
        }
    }

    protected componentDidUpdate(oldProps: any, newProps: any) {
        return true;
    }

    protected unmountComponent() {
        if (this._element) {
            this._componentWillUnmount();
            this._removeEvents();
            Object.values(this.children).reverse().forEach(child => child.unmountComponent());
        }
    }

    private _componentWillUnmount() {
        this.componentWillUnmount();
    }

    protected componentWillUnmount() {}

    private _removeEvents() {
        const {events = {}} = this.props as { events: Record<string, () => void> };

        Object.keys(events).forEach(eventName => {
            this._element?.removeEventListener(eventName, events[eventName]);
        });
    }

    protected setProps(nextProps: any) {
        if (!nextProps) {
            return;
        }

        Object.assign(this.props, nextProps);
    }

    private _render() {
        this.unmountComponent();

        const fragment = this.compile(this.render(), this.props);

        const newElement = fragment.firstElementChild as HTMLElement;

        if (this._element) this._element.replaceWith(newElement);

        this._element = newElement;

        this.mountComponent();
    }

    protected render(): string {
        return '';
    }

    private compile(template: string, context: any) {
        const contextAndStubs = {...context, __refs: this.refs};

        const html = Handlebars.compile(template)(contextAndStubs);

        const temp = document.createElement('template');

        temp.innerHTML = html;

        const fragment = temp.content;

        const refs = this.refs;
        this.refs = Array.from(fragment.querySelectorAll('[ref]')).reduce((list, element) => {
            const key = element.getAttribute('ref') as string;
            list[key] = element as HTMLElement;
            element.removeAttribute('ref');
            return list;
        }, refs);

        contextAndStubs.__children?.forEach(({embed}: any) => {
            embed(fragment);
        });

        return fragment;
    }

    private mountComponent() {
        this._addEvents();
        this._componentDidMount();
    }

    private _addEvents() {
         const {events = {}} = this.props as { events: Record<string, () => void> };

         Object.keys(events).forEach(eventName => {
             this._element?.addEventListener(eventName, events[eventName]);
         });
    }

    getContent() {
        return this.element;
    }

    get element() {
        return this._element;
    }

    private _makePropsProxy(props: any) {
        const self = this;

        props = new Proxy(props, {
            get(target, prop) {
                if (prop.toString().startsWith('_')) {
                    throw new Error('Нет доступа');
                }
                return target[prop] == 'function' ? target[prop].bind(target) : target[prop];
            },
            set(target, prop, value) {
                if (prop.toString().startsWith('_')) {
                    throw new Error('Нет доступа');
                }
                const oldValue = target[prop];
                target[prop] = value;
                if (oldValue !== value) {
                    self.eventBus().emit(Block.EVENTS.FLOW_CDU, {...target}, target);
                }
                return true;
            },
            deleteProperty() {
                throw new Error('Нет доступа');
            }
        });
        return props;
    }

    show() {
        this.getContent()!.style.display = 'block';
    }

    hide() {
        this.getContent()!.style.display = 'none';
    }
}