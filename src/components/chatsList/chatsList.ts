import Block from "../../core/Block";
import template from './chatsList.hbs?raw';

export class ChatsList extends Block {
    constructor(props: any) {
        super({
            ...props
        });
        this._setEventListenerToSearch();
    }

    protected componentDidUpdate(): boolean {
        this._setEventListenerToSearch();
        return false;
    }

    private _setEventListenerToSearch() {
        (this.refs.searchForm as HTMLElement).addEventListener('submit', this.props.onSearch);
        (this.refs.searchForm as HTMLElement).querySelector('.chats_list__search')?.addEventListener('blur', this.props.onSearch);
    }

    protected render(): string {
        return (template);
    }
}
