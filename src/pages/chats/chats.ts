import Block from "../../core/Block";

export class ChatsPage extends Block {
    constructor(props: any) {
        super({
            setSearch: (event: SubmitEvent | Event) => {
                event.preventDefault();
                event.stopImmediatePropagation();
                const value = (event.target as HTMLElement).value || (event.target as HTMLElement).querySelector('.chats_list__search')?.value;
                const data = {search: value};
                this.refs.list.setProps(data);
                console.log(data);
            },
            setSelectedChat: (id: string, title: string) => {
                this.setProps({
                    activeChat: id,
                    title
                });
            },
            activeChat: 'chatID', //TODO change to null
            title: 'ышщаодылва', //TODO remove
            ...props
        });
    }

    protected render(): string {
        // language=Handlebars
        return (`
            <div class="chats_page__wrapper">
                {{{ChatsList ref='list' onSearch=setSearch onChatSelect=setSelectedChat activeChat=activeChat}}}
                {{{ChatWindow ref='chatWindow' activeChat=activeChat title=title}}}
            </div>
        `);
    }
}
