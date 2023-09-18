import Block from "../../core/block";

interface Props {
    onChatSelect: (arg0: string, arg1: string) => void,
    title: string,
    content: string,
    time: string,
    unread?: string,
    chatID?: string,
    activeChat?: string
}

export class ChatListEntry extends Block {
    constructor(props: Props) {
        super({
            ...props,
            events: {
                click: () => {
                    this.props.onChatSelect(this.props.chatID, this.props.title);
                }
            }
        });
    }

    protected render(): string {
        return (`
        <div class="chat_list_entry__wrapper {{#ifEquals chatID activeChat}}active{{/ifEquals}}">
            <div class="chat_list_entry__img_wrapper">
                <img src="" alt="">
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
