import Block from "../../core/block";
import {connect} from "../../utils/connect";
import {addChatUser, removeChatUser, deleteChat} from "../../services/chat";

interface Props {
    chatActionsToggle: () => void,
    openAddUserPopup: () => void,
    closeAddUserPopup: () => void,
    openRemoveUserPopup: () => void,
    closeRemoveUserPopup: () => void,
    saveAddUserPopup: () => void,
    saveRemoveUserPopup: () => void,
    title: string,
    active?: boolean,
    activeChat?: number
}

export class ChatWindow extends Block<Props> {
    constructor(props: Props) {
        super({
            ...props,
            chatActionsToggle: () => {
                const ref = this.refs.chatDropdown as Block<Props>;
                ref.setProps({
                    active: !ref.props.active
                });
            },
            openAddUserPopup: () => {
                window.store.set({
                    isOpenDialogAddUser: true,
                    isOpenDialogRemoveUser: false
                });
                const ref = this.refs.chatDropdown as Block<Props>;
                ref.setProps({
                    active: !ref.props.active
                });
            },
            closeAddUserPopup: () => window.store.set({isOpenDialogAddUser: false}),
            openRemoveUserPopup: () => {
                window.store.set({
                    isOpenDialogAddUser: false,
                    isOpenDialogRemoveUser: true
                });
                const ref = this.refs.chatDropdown as Block<Props>;
                ref.setProps({
                    active: !ref.props.active
                });
            },
            closeRemoveUserPopup: () => window.store.set({isOpenDialogRemoveUser: false}),
            saveAddUserPopup: () => {
                if (!this.props.activeChat) return;
                const userLogin = (<any> this.refs.addUser).getUserLogin();
                if(!userLogin) {
                    (<any> this.refs.addUser).setError('Введите логин пользователя');
                    return;
                }
                addChatUser(userLogin, this.props.activeChat)
                    .then(() => console.log(`User ${userLogin} added`))
                    .catch(error => (<any> this.refs.addUser).setError(error))
            },
            saveRemoveUserPopup: () => {
                if (!this.props.activeChat) return;
                const userLogin = (<any> this.refs.removeUser).getUserLogin();
                if(!userLogin) {
                    (<any> this.refs.removeUser).setError('Введите логин пользователя');
                    return;
                }
                removeChatUser(userLogin, this.props.activeChat)
                    .catch(error => (<any> this.refs.removeUser).setError(error));
            },
            onDeleteChat: () => {
                if (this.props.activeChat)
                    deleteChat(this.props.activeChat)
                        .catch(error => alert(`Ошибка запроса. Причина: ${error.reason}`));
            }
        });
    }

    protected render(): string {
        //language=hbs
        return (`
        {{#if activeChat}}
            <div class="chat_window__wrapper">
                <div class="chat_window__head">
                    {{{ChatWindowHead ref='chatWindowHead' title=title onChatActionsClick=chatActionsToggle}}}
                    {{{ChatDropdown ref='chatDropdown' active=active openAddUserPopup=openAddUserPopup openRemoveUserPopup=openRemoveUserPopup onDeleteChat=onDeleteChat}}}
                    {{{AddUserPopup ref='addUser' onClose=closeAddUserPopup onSave=saveAddUserPopup}}}
                    {{{RemoveUserPopup ref='removeUser' onClose=closeRemoveUserPopup onSave=saveRemoveUserPopup}}}
                </div>
                {{{ChatWindowMessages activeMessages=activeMessages}}}
                <div class="chat_window__editor">
                    {{{ChatWindowEditor activeChat=activeChat}}}
                </div>
            </div>
        {{^}}
            <div class="centered_content chat_window__empty">Выберите чат, чтобы отправить сообщение</div>
        {{/if}}
        `);
    }
}

export const withStoreChatWindow = connect(({chats, user, messages, activeChat, activeMessages}) =>
    ({chats, user, messages, activeChat, activeMessages}))(ChatWindow)
