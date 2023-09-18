import Block from "../../core/block";
import './chatWindowHeadMenu.less';

export class ChatWindowHeadMenu extends Block {
    constructor(props: any) {
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
