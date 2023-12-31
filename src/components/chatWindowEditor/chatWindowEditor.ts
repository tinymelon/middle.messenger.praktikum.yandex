import Block from "../../core/block";
import './chatWindowEditor.less';
import {sendMessage} from "../../services/chat";

interface Props {
    messageAttachToggle: () => void,
    sendMessage: (arg0: SubmitEvent) => void,
    active: boolean,
    activeChat: number
}

export class ChatWindowEditor extends Block<Props> {
    constructor(props: Props) {
        super({
            ...props,
            messageAttachToggle: () => {
                const ref = this.refs.attachPopup as Block<Props>;
                ref.setProps({
                    active: !ref.props.active
                });
            },
            sendMessage: (event: SubmitEvent) => {
                event.preventDefault();
                event.stopImmediatePropagation();
                const form = this.refs.messageForm as Block<Props>;
                const errors = form.validate(true);
                if (errors) return;
                const formData = Object.fromEntries(new FormData(event.target as HTMLFormElement).entries());
                sendMessage(this.props.activeChat, (formData as Record<string, any>).message)
                    .catch((error) => alert(`Ошибка отправки. Причина: ${error.reason}`));
            },
        });
    }

    protected render(): string {
        //language=hbs
        return (`
            <div class="chat_window__editor_wrapper">
                {{{ChatWindowEditorAttach ref='attachButton' onClick=messageAttachToggle}}}
                {{{ChatEditorAttach ref='attachPopup'}}}
                {{{ChatEditorMessage ref='messageForm' onSubmit=sendMessage}}}
            </div>
        `);
    }
}
