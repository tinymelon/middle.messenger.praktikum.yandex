import Block from "../../core/block";
import {connect} from "../../utils/connect";
import {addChatUser, removeChatUser} from "../../services/chat";

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
                const userId = (<any> this.refs.addUser).getUserId();
                if(!userId) {
                    (<any> this.refs.addUser).setError('Введите ID пользователя');
                    return;
                }
                addChatUser(userId, this.props.activeChat)
                    .then(() => console.log(`User ${userId} added`))
                    .catch(error => (<any> this.refs.addUser).setError(error))
            },
            saveRemoveUserPopup: () => {
                if (!this.props.activeChat) return;
                const userId = (<any> this.refs.removeUser).getUserId();
                if(!userId) {
                    (<any> this.refs.removeUser).setError('Введите ID пользователя');
                    return;
                }
                removeChatUser(userId, this.props.activeChat)
                    .then(() => console.log(`User ${userId} removed`))
                    .catch(error => (<any> this.refs.removeUser).setError(error))
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
                    {{{ChatDropdown ref='chatDropdown' active=active openAddUserPopup=openAddUserPopup openRemoveUserPopup=openRemoveUserPopup}}}
                    {{{AddUserPopup ref='addUser' onClose=closeAddUserPopup onSave=saveAddUserPopup}}}
                    {{{RemoveUserPopup ref='removeUser' onClose=closeRemoveUserPopup onSave=saveRemoveUserPopup}}}
                </div>
                <div class="chat_window__messages">
<!--                    {{{ChatBubble content='Привет! Есть что?' class='sent short' time='23:47'}}}-->
<!--                    {{{ChatDate date='19 июня'}}}-->
<!--                    {{{ChatBubble content='Привет! Смотри, тут всплыл интересный кусок крутой шапочки — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих шапочек все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой.<br><br>Хассельблад в итоге адаптировал SWC для ношения на голове, но что-то пошло не так и на ракету они так никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.' class='received' time='04:21'}}}-->
<!--                    {{{ChatBubble content='<img src="/assets/images/camera.png" alt="">' class='received image' time='04:27'}}}-->
<!--                    {{{ChatBubble content='Круто!' class='sent short' time='08:21'}}}-->
<!--                    {{{ChatBubble content='шапочка топ' class='sent short' time='08:21'}}}-->
                </div>
                <div class="chat_window__editor">
                    {{{ChatWindowEditor onAddUser=showAddUserPopup onRemoveUser=showRemoveUserPopup}}}
                </div>
            </div>
        {{^}}
            <div class="centered_content chat_window__empty">Выберите чат, чтобы отправить сообщение</div>
        {{/if}}
        `);
    }
}

export const withStoreChatWindow = connect(({chats, user}) => ({chats, user}))(ChatWindow)
