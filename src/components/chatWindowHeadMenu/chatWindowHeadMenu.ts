import Block from "../../core/block";
import './chatWindowHeadMenu.less';

interface Props {
    onChatActionsClick: () => void
}

export class ChatWindowHeadMenu extends Block<Props> {
    constructor(props: Props) {
        super({
            events: {
                click: props.onChatActionsClick
            },
            ...props
        });
    }

    protected render(): string {
        return (`
            <div class="chat_window__head_menu"></div>
        `);
    }
}
