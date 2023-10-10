import Block from "../../core/block";
import './chatEditorMessage.less';
import {message} from "../../utils/validators";

interface Props {
    onSubmit: (arg0: SubmitEvent) => boolean | void,
    active: boolean
}

export class ChatEditorMessage extends Block<Props> {
    constructor(props: Props) {
        super({
            ...props,
            events: {
                submit: props.onSubmit
            },
            active: false
        });
    }

    public validate(isSubmitted: boolean) {
        const input = this.refs.input as HTMLInputElement;
        const value = input.value;
        const error = message(value, isSubmitted);
        return !!error;
    }

    protected render(): string {
        return (`
            <form action="#" ref="message" class="chat_window__editor_form">
                <input ref="input" type="text" name="message" class="chat_window__editor_input" placeholder="Сообщение">
                <button class="chat_window__editor_send"></button>
            </form>
        `);
    }
}
