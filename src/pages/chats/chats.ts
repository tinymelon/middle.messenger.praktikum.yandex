import Block from "../../core/Block";

export class ChatsPage extends Block {
    constructor(props: any) {
        super({
            onSearch: (event: SubmitEvent | Event) => {
                event.preventDefault();
                event.stopImmediatePropagation();
                const value = (event.target as HTMLElement).value || (event.target as HTMLElement).querySelector('.chats_list__search')?.value;
                this.search(value);
            },
            ...props
        });
    }

    protected search(search: string) {
        this.refs.list.setProps({search});
        console.log({search});
    }

    protected render(): string {
        // language=Handlebars
        return (`
            <div class="chats_page__wrapper">
                {{{ChatsList ref='list' onSearch=onSearch}}}
                {{{ChatWindow}}}
            </div>
        `);
    }
}
