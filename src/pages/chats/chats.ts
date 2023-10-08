import Block from "../../core/block";
import { connect } from "../../utils/connect";
import {initChatPage} from "../../services/initApp";
import {changeActiveChat} from '../../services/chat';
import {ChatsList} from "../../components/chatsList";
import {ChatWindow} from "../../components/chatWindow";

interface Props {
    setSearch: (arg0: SubmitEvent | Event) => void,
    setSelectedChat: (arg0: string, arg1: string) => void,
    title?: string
}

export class ChatsPage extends Block<Props> {
    constructor(props: Props) {
        super({
            ...props,
            setSearch: (event: SubmitEvent | Event) => {
                event.preventDefault();
                event.stopImmediatePropagation();
                let value;
                if ((event.target as HTMLElement).tagName == 'INPUT') {
                    value = (event.target as HTMLInputElement).value;
                } else {
                    const element = (event.target as HTMLElement).querySelector('.chats_list__search') as HTMLInputElement;
                    value = element.value;
                }
                const data = {search: value};
                const ref = this.refs.list as Block<Props>;
                ref.setProps(data);
                console.log(data);
            },
            setSelectedChat: (id: string, title: string) => {
                changeActiveChat(Number.parseInt(id));
                (this.refs.list as unknown as ChatsList).setProps({
                    activeChat: id
                });
                (this.refs.chatWindow as unknown as ChatWindow).setProps({
                    activeChat: id,
                    title
                });
            }
        });

        initChatPage();
    }

    protected render(): string {
        //language=hbs
        return (`
            <div class="chats_page__wrapper">
                {{{ChatsList ref='list' onSearch=setSearch onChatSelect=setSelectedChat}}}
                {{{ChatWindow ref='chatWindow' title=title}}}
            </div>
        `);
    }
}

export default connect(({chats, user}) => ({chats, user}))(ChatsPage)
