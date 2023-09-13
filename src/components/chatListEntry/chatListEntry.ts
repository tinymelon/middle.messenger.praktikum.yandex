import Block from "../../core/Block";
import template from './chatListEntry.hbs?raw';

export class ChatListEntry extends Block {
    constructor(props: any) {
        super({
            ...props
        });
    }

    protected render(): string {
        return (template);
    }
}
