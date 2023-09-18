import Block from "../../core/block";
import './chatWindowEditor.less';
import isFormSubmitErrors from "../../utils/isFormSubmitErrors";

interface Props {
    messageAttachToggle: () => void,
    sendMessage: (arg0: SubmitEvent) => void
}

export class ChatWindowEditor extends Block {
    constructor(props: Props) {
        super({
            ...props,
            messageAttachToggle: () => {
                const ref = this.refs.attachPopup as Block;
                ref.setProps({
                    active: !ref.props.active
                });
            },
            sendMessage: (event: SubmitEvent) => {
                event.preventDefault();
                event.stopImmediatePropagation();
                const form = this.refs.messageForm as Block;
                const errors = isFormSubmitErrors(event, form.refs);
                if (errors) return;
                const formData = Object.fromEntries(new FormData(event.target as HTMLFormElement).entries());
                console.log(formData);
            }
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
