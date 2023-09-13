import Block from "../../core/Block";

export class ChatDate extends Block {
    constructor(props: any) {
        super({
            ...props
        });
    }

    protected render(): string {
        return (`
            <div class="chat_window__date">{{date}}</div>
        `);
    }
}
