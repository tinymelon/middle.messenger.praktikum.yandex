import EventBus from "./eventBus";
import {nanoid} from 'nanoid';
import Handlebars from "handlebars";
import cloneDeep from "../utils/cloneDeep";

export default class Block<Props extends Record<string, any>> {
    static EVENTS = {
        INIT: "init",
        FLOW_CDM: "flow:component-did-mount",
        FLOW_CDU: "flow:component-did-update",
        FLOW_CWU: 'flow:component-will-unmount',
        FLOW_RENDER: "flow:render"
    } as const;

    public id = nanoid(6);
    public props = {} as Props;
    public refs = {} as Record<string, Block<Props> | HTMLElement>;
    public children: Record<string, Block<Props>>;
    private _element: HTMLElement | undefined = undefined;
    protected _meta: {props: any};
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

    private _getChildrenAndProps(childrenAndProperties: any) {
        const props: Record<string, any> = {};
        const children: Record<string, Block<Props>> = {};

        for (const [key, value] of Object.entries(childrenAndProperties)) {
            if (value instanceof Block) {
                children[key] = value;
            } else {
                props[key] = value;
            }
        }

        return {props, children};
    }

    private _registerEvents(eventBus: EventBus) {
        eventBus.on(Block.EVENTS.INIT, this._init.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CWU, this._componentWillUnmount.bind(this));
        eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    }

    private _init() {
        this.init();

        this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }

    protected init() {}

    private _componentDidMount() {
        this._checkInDom();
        this.componentDidMount();
    }

    protected componentDidMount() {}


    dispatchComponentDidMount() {
        this.eventBus().emit(Block.EVENTS.FLOW_CDM);

        for (const child of Object.values(this.children)) child.dispatchComponentDidMount();
    }

    private _componentDidUpdate(oldProperties: any, newProperties: any) {
        const response = this.componentDidUpdate(oldProperties, newProperties);
        if (response) {
            this._render();
        }
    }

    protected componentDidUpdate(oldProperties: any, newProperties: any) {
        return oldProperties && newProperties ? true : true;
    }

    public unmountComponent() {
        if (this._element) {
            this._componentWillUnmount();
            this._removeEvents();
            for (const child of Object.values(this.children).reverse()) child.unmountComponent();
        }
    }

    private _componentWillUnmount() {
        this.componentWillUnmount();
    }

    protected componentWillUnmount() {}

    _checkInDom() {
        const elementInDOM = document.body.contains(this._element as Node);

        if (elementInDOM) {
            setTimeout(() => this._checkInDom(), 1000);
            return;
        }

        this.eventBus().emit(Block.EVENTS.FLOW_CWU, this.props);
    }

    private _removeEvents() {
        const {events = {}} = this.props;

        for (const eventName of Object.keys(events)) {
            this._element?.removeEventListener(eventName, events[eventName]);
        }
    }

    public setProps(nextProperties: any): void {
        if (!nextProperties) {
            return;
        }

        Object.assign(this.props, nextProperties);
    }

    private _render() {
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

        const temporary = document.createElement('template');

        temporary.innerHTML = html;

        const fragment = temporary.content;

        const references = this.refs;
        // eslint-disable-next-line unicorn/no-array-reduce
        this.refs = [...fragment.querySelectorAll('[ref]')].reduce((list, element) => {
            const key = element.getAttribute('ref') as string;
            list[key] = element as HTMLElement;
            element.removeAttribute('ref');
            return list;
        }, references);

        if (contextAndStubs.__children) {
            for (const element of contextAndStubs.__children) {
                element.embed(fragment)
            }
        }

        return fragment;
    }

    private mountComponent() {
        this._addEvents();
        this._componentDidMount();
    }

    private _addEvents() {
         const {events = {}} = this.props;

         for (const eventName of Object.keys(events)) {
             this._element?.addEventListener(eventName, events[eventName]);
         }
    }

    getContent() {
        if (this.element?.parentNode?.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
            setTimeout(() => {
                if (this.element?.parentNode?.nodeType !== Node.DOCUMENT_FRAGMENT_NODE) {
                    this.dispatchComponentDidMount();
                }
            }, 100);
        }

        return this._element;
    }

    public get element(): HTMLElement | undefined {
        return this._element;
    }

    private _makePropsProxy(props: any) {
        // eslint-disable-next-line unicorn/no-this-assignment
        const self = this;

        props = new Proxy(props, {
            get(target, property) {
                if (property.toString().startsWith('_')) {
                    throw new Error('Нет доступа');
                }
                return target[property] == 'function' ? target[property].bind(target) : target[property];
            },
            set(target, property, value) {
                if (property.toString().startsWith('_')) {
                    throw new Error('Нет доступа');
                }
                const oldProps = cloneDeep(target);
                const oldValue = oldProps[property];
                target[property] = value;
                if (oldValue !== value) {
                    self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldProps, target);
                }
                return true;
            },
            deleteProperty() {
                throw new Error('Нет доступа');
            }
        });
        return props;
    }

    public validate(isSubmit?: boolean): boolean {
        if (isSubmit) return true;
        return true;
    }

    public value(): string {
        return '';
    }

    public show() {
        this.getContent()!.style.display = 'block';
    }

    public hide() {
        this.getContent()!.style.display = 'none';
    }
}
