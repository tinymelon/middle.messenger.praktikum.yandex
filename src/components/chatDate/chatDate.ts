import Block from "../../core/block";

interface Props {
    date: string
}

export class ChatDate extends Block<Props> {
    constructor(props: Props) {
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
