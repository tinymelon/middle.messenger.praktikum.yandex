import Block from "../../core/block";
import './chatWindowHead.less';

interface Props {
    title: string,
    onChatActionsClick: () => void
}

export class ChatWindowHead extends Block {
    constructor(props: Props) {
        super({
            ...props
        });
    }

    protected render(): string {
        //language=hbs
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
