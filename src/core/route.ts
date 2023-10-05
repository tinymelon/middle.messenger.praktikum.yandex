import Block from "./block";

export default class Route {
    private _pathname: string;
    private readonly _blockClass: {new(): Block<Indexed>};
    private _block: Nullable<Block<Indexed>>;
    private _props: Indexed;
    constructor(pathname: string, view: {new(): Block<Indexed>}, props: Indexed) {
        this._pathname = pathname;
        this._blockClass = view;
        this._block = null;
        this._props = props;
    }

    navigate(pathname: string) {
        if (this.match(pathname)) {
            this._pathname = pathname;
            this.render();
        }
    }

    leave() {
        if (this._block) {
            this._block.unmountComponent();
        }
    }

    match(pathname: string) {
        return pathname === this._pathname;
    }

    render() {
        const app = document.querySelector(this._props.rootQuery);
        if (!this._block) this._block = new this._blockClass();
        app.innerHTML = '';
        app.append(this._block.getContent()!);
        return;
    }
}
