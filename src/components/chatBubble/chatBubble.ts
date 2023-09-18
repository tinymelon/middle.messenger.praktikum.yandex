import Block from "../../core/block";

interface Props {
    class: string,
    content: string,
    time: string
}

export class ChatBubble extends Block {
    constructor(props: Props) {
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
