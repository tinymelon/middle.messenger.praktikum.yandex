import Block from "../../core/block";

export class ChatBubble extends Block {
    constructor(props: any) {
        super({
            ...props
        });
    }

    protected render(): string {
        return (`
            <div class="chat_window__bubble {{class}}">
                {{{content}}}
                <div class="chat_window__bubble_time">{{time}}</div>
            </div>
        `);
    }
}
