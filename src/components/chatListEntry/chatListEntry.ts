import Block from "../../core/block";

interface Props {
    onChatSelect: (arg0: string | undefined, arg1: string, arg2: string | undefined) => void,
    title: string,
    avatar?: string,
    content: string,
    time: string,
    unread?: string,
    chatID?: string,
    activeChat?: string
}

export class ChatListEntry extends Block<Props> {
    constructor(props: Props) {
        super({
            ...props,
            events: {
                click: () => {
                    this.props.onChatSelect(this.props.chatID, this.props.title, this.props.avatar);
                }
            }
        });
    }

    protected render(): string {
        //language=hbs
        return (`
        <div class="chat_list_entry__wrapper {{#ifEquals chatID activeChat}}active{{/ifEquals}}">
            <div class="chat_list_entry__img_wrapper">
                {{#if avatar}}<img src="{{avatar}}" alt="">{{/if}}
            </div>
            <div class="chat_list_entry__info">
                <div class="chat_list_entry__info_name">{{title}}</div>
                <div class="chat_list_entry__info_message">{{content}}</div>
            </div>
            <div class="chat_list_entry__data">
                <div class="chat_list_entry__data_time">{{time}}</div>
                {{#if unread}}
                    <div class="chat_list_entry__data_unread">{{unread}}</div>
                {{/if}}
            </div>
        </div>
        `);
    }
}
