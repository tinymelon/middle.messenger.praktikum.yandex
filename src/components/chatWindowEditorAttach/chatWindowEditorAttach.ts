import Block from "../../core/block";
import './chatWindowEditorAttach.less';

interface Props {
    onClick: () => void
}

export class ChatWindowEditorAttach extends Block {
    constructor(props: Props) {
        super({
            ...props,
            events: {
                click: props.onClick
            }
        });
    }

    protected render(): string {
        return (`
            <div class="chat_window__editor_add"></div>
        `);
    }
}
