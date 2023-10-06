import Block from "../../core/block";
import {connect} from "../../utils/connect";
import {createChat} from "../../services/chat";

interface Props {
    onChatSelect: (arg0: string, arg1: string) => void,
    onSearch: (arg0: SubmitEvent | Event) => void,
    openDialog: () => void,
    closeDialog: () => void,
    saveDialogData: () => void,
    search?: string,
    chatID?: string,
    activeChat?: string
}

export class ChatsList extends Block<Props> {
    constructor(props: Props) {
        super({
            ...props,
            openDialog: () => window.store.set({isOpenDialogChat: true}),
            closeDialog: () => window.store.set({isOpenDialogChat: false}),
            saveDialogData: () => {
                const chatTitle = (<any> this.refs.createChat).getChatTitle();
                if(!chatTitle) {
                    (<any> this.refs.createChat).setError('Название переписки не может быть пустым');
                    return;
                }
                createChat(chatTitle)
                    .then(() => window.store.set({isOpenDialogChat: false}))
                    .catch(error => (<any> this.refs.createChat).setError(error))
            }
        });
        this._setEventListenerToSearch();
    }

    protected componentDidUpdate(): boolean {
        this._setEventListenerToSearch();
        return true;
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
                {{{AddChatPopup onClose=closeDialog onSave=saveDialogData ref="createChat"}}}
                {{{ChatAddButton onClick=openDialog}}}
                {{{ChatsProfileLink}}}
                <form action="#" ref="searchForm">
                    <input type="text" class="chats_list__search" placeholder="Поиск" value="{{search}}" name="search">
                </form>
            </div>
            <div class="chats_list__list">
                {{#each chats}}
                    {{{ChatListEntry
                            title=this.title
                            avatar=this.avatar
                            content=this.lastMessage.content
                            time=this.lastMessage.time
                            unread=this.unreadCount
                            chatID=this.id
                            activeChat=../activeChat
                            onChatSelect=../onChatSelect
                    }}}
                {{/each}}
            </div>
        </div>
        `);
    }
}

export const withStoreChatsList = connect(({chats, user}) => ({chats, user}))(ChatsList)
