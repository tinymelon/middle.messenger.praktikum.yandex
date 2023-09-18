import Block from "../../core/block";

export class ChatsPage extends Block {
    constructor(props: any) {
        super({
            setSearch: (event: SubmitEvent | Event) => {
                event.preventDefault();
                event.stopImmediatePropagation();
                let value;
                if ((event.target as HTMLElement).tagName == 'input') {
                    value = (event.target as HTMLInputElement).value;
                } else {
                    const element = (event.target as HTMLElement).querySelector('.chats_list__search') as HTMLInputElement;
                    value = element.value;
                }
                const data = {search: value};
                const ref = this.refs.list as Block;
                ref.setProps(data);
                console.log(data);
            },
            setSelectedChat: (id: string, title: string) => {
                this.setProps({
                    activeChat: id,
                    title
                });
            },
            activeChat: undefined,
            ...props
        });
    }

    protected render(): string {
        //language=hbs
        return (`
            <div class="chats_page__wrapper">
                {{{ChatsList ref='list' onSearch=setSearch onChatSelect=setSelectedChat activeChat=activeChat}}}
                {{{ChatWindow ref='chatWindow' activeChat=activeChat title=title}}}
            </div>
        `);
    }
}
