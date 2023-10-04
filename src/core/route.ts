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
            this._block.hide();
        }
    }

    match(pathname: string) {
        return pathname === this._pathname;
    }

    render() {
        if (!this._block) {
            this._block = new this._blockClass();
            const app = document.querySelector(this._props.rootQuery);
            app.innerHTML = '';
            app.append(this._block.getContent()!);
            return;
        }

        this._block.show();
    }
}
