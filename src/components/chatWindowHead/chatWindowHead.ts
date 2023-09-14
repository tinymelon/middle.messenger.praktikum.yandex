import Block from "../../core/Block";
import './chatWindowHead.less';

export class ChatWindowHead extends Block {
    constructor(props: any) {
        super({
            ...props
        });
    }

    protected render(): string {
        return (`
            <div class="chat_window__head_info">
                <div class="chat_window__head_info_image">
                    <img src="" alt="">
                </div>
                <div class="chat_window__head_info_title">{{title}}</div>
                {{{ChatWindowHeadMenu onChatActionsClick=onChatActionsClick}}}
            </div>
        `);
    }
}
