import Block from "../../core/Block";
import template from './chatListEntry.hbs?raw';

export class ChatListEntry extends Block {
    constructor(props: any) {
        super({
            events: {
                click: () => {
                    this.props.onChatSelect(this.props.chatID, this.props.title);
                }
            },
            ...props
        });
    }

    protected render(): string {
        return (template);
    }
}
