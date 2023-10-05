import Block from "../../core/block";

interface Props {
    onChatSelect: (arg0: string, arg1: string) => void,
    onSearch: (arg0: SubmitEvent | Event) => void,
    onDialogOpen: () => void,
    onDialogClose: () => void,
    onChatCreate: () => void,
    search?: string,
    chatID?: string,
    activeChat?: string
}

export class ChatsList extends Block<Props> {
    constructor(props: Props) {
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
        //language=hbs
        return (`
        <div class="chats_list__wrapper">
            <div class="chats_list__head">
                {{{AddChatPopup onSave=onChatCreate onClose=onDialogClose ref="createChat"}}}
                {{{ChatAddButton onClick=onDialogOpen}}}
                {{{ChatsProfileLink}}}
                <form action="#" ref="searchForm">
                    <input type="text" class="chats_list__search" placeholder="Поиск" value="{{search}}" name="search">
                </form>
            </div>
            <div class="chats_list__list">
                {{#each chats}}
                    {{{ ChatListEntry
                            title=this.title
                            avatar=this.avatar
                            content=this.lastMessage
                            time=this.time
                            unread=this.unread
                            chatID=this.id
                            activeChat=activeChat
                            onChatSelect=onChatSelect
                    }}}
                {{/each}}
                <!-- id=id title=title avatar=avatar(??last.message.user.avatar) unread=unread_count content=content time=time  -->
            </div>
        </div>
        `);
    }
}
