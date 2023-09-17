import Block from "../../core/Block";
import './chatEditorMessage.less';
import * as validators from "../../utils/validators";

export class ChatEditorMessage extends Block {
    constructor(props: any) {
        super({
            events: {
                submit: props.onSubmit
            },
            active: false,
            ...props
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
