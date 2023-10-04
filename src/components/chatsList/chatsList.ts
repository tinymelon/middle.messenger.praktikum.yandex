import Block from "../../core/block";

interface Props {
    onChatSelect: (arg0: string, arg1: string) => void,
    onSearch: (arg0: SubmitEvent | Event) => void,
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
                {{{ChatsProfileLink}}}
                <form action="#" ref="searchForm">
                    <input type="text" class="chats_list__search" placeholder="Поиск" value="{{search}}" name="search">
                </form>
            </div>
            <div class="chats_list__list">
                <!-- id=id title=title avatar=avatar(??last.message.user.avatar) unread=unread_count content=content time=time  -->
                {{{ChatListEntry title='Макс' unread='4' content='Ты опять из-за курсов своих работу не делаешь?' time='12:25' activeChat=activeChat chatID='chatID1' onChatSelect=onChatSelect}}}
                {{{ChatListEntry title='Группа 22' unread='999+' content='Сумасшествие является официальной причиной...' time='11:21' activeChat=activeChat chatID='chatID2' onChatSelect=onChatSelect}}}
                {{{ChatListEntry title='Васька Тараканов клуб' content='Вы: такси вызывай давай' time='03:37' activeChat=activeChat chatID='chatID3' onChatSelect=onChatSelect}}}
                {{{ChatListEntry title='Магазин Хлебный' content='Вы: шапочка топ' time='19:07' activeChat=activeChat chatID='chatID' onChatSelect=onChatSelect}}}
        
                {{{ChatListEntry title='Илья' content='Ты опять из-за курсов своих работу не делаешь?' time='Пт' activeChat=activeChat chatID='chatID4' onChatSelect=onChatSelect}}}
                {{{ChatListEntry title='Вадим' content='Сумасшествие является официальной причиной...' time='Чт' activeChat=activeChat chatID='chatID5' onChatSelect=onChatSelect}}}
                {{{ChatListEntry title='1, 2, 3' content='Вы: такси вызывай давай' time='Чт' chatID='chatID6' activeChat=activeChat onChatSelect=onChatSelect}}}
                {{{ChatListEntry title='Магазин Важный' content='Вы: шапочка топ' time='Вт' chatID='chatID7' activeChat=activeChat onChatSelect=onChatSelect}}}
                {{{ChatListEntry title='Никодим' content='Ты опять из-за курсов своих работу не делаешь?' time='Пн' activeChat=activeChat chatID='chatID8' onChatSelect=onChatSelect}}}
            </div>
        </div>
        `);
    }
}
