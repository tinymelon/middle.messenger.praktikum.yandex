import Block from "../../core/Block";
import './chatWindowEditor.less';

export class ChatWindowEditor extends Block {
    constructor(props: any) {
        super({
            messageAttachToggle: () => {
                const ref = this.refs.attachPopup;
                ref.setProps({
                    active: !ref.props.active
                });
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
                <form action="#" ref="message">
                    <input type="text" class="chat_window__editor_input" placeholder="Сообщение">
                    <button class="chat_window__editor_send"></button>
                </form>
            </div>
        `);
    }
}
