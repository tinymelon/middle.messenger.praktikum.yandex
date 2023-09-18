import Block from "../../core/block";
import './chatEditorMessage.less';

interface Props {
    onSubmit: (arg0: SubmitEvent) => boolean | void,
    active: boolean
}

export class ChatEditorMessage extends Block {
    constructor(props: Props) {
        super({
            ...props,
            events: {
                submit: props.onSubmit
            },
            active: false
        });
    }

    protected render(): string {
        return (`
            <form action="#" ref="message" class="chat_window__editor_form">
                <input type="text" name="message" class="chat_window__editor_input" placeholder="Сообщение">
                <button class="chat_window__editor_send"></button>
            </form>
        `);
    }
}
