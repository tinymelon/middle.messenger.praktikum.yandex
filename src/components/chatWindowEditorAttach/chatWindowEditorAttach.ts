import Block from "../../core/Block";
import './chatWindowEditorAttach.less';

export class ChatWindowEditorAttach extends Block {
    constructor(props: any) {
        super({
            events: {
                click: props.onClick
            },
            ...props
        });
    }

    protected render(): string {
        return (`
            <div class="chat_window__editor_add"></div>
        `);
    }
}
