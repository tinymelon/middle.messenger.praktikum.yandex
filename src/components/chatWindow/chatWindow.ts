import Block from "../../core/Block";
import template from './chatWindow.hbs?raw';

export class ChatWindow extends Block {
    constructor(props: any) {
        super({
            ...props
        });
    }

    protected render(): string {
        return (template);
    }
}
