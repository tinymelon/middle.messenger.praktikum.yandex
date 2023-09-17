import Block from "../../core/Block";
import './chatWindowEditor.less';
import isFormSubmitErrors from "../../utils/isFormSubmitErrors";

export class ChatWindowEditor extends Block {
    constructor(props: any) {
        super({
            messageAttachToggle: () => {
                const ref = this.refs.attachPopup;
                ref.setProps({
                    active: !ref.props.active
                });
            },
            sendMessage: (event: SubmitEvent) => {
                event.preventDefault();
                event.stopImmediatePropagation();
                const formData = Object.fromEntries(new FormData(event.target as HTMLFormElement).entries());
                const errors = isFormSubmitErrors(event, formData);
                if (errors) {
                    this.refs.messageForm.setProps({errors});
                    return;
                }
                console.log(formData);
            },
            ...props
        });
    }

    protected render(): string {
        //language=Handlebars
        return (`
            <div class="chat_window__editor_wrapper">
                {{{ChatWindowEditorAttach ref='attachButton' onClick=messageAttachToggle}}}
                {{{ChatEditorAttach ref='attachPopup'}}}
                {{{ChatEditorMessage ref='messageForm' onSubmit=sendMessage}}}
            </div>
        `);
    }
}
