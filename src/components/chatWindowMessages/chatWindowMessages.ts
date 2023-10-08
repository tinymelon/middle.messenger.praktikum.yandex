import Block from "../../core/block";
import {getOlderMessages} from "../../services/chat";
import {connect} from "../../utils/connect";

interface Props {
    chatScroll?: number
}

export class ChatWindowMessages extends Block<Props> {
    constructor(props: Props) {
        super({
            ...props,
            events: {
                scroll: (event: Event) => {
                    const element = event.target as HTMLElement;
                    const top = element.lastElementChild?.getBoundingClientRect().top;
                    if (top && top > 0) {
                        getOlderMessages(element.scrollTop);
                    }
                }
            }
        });
    }

    protected componentDidMount(): void {
        if (!this.element) return;
        if (this.props.chatScroll) {
            this.element.scrollTop = this.props.chatScroll;
        }
    }

    protected render(): string {
        //language=hbs
        return (`
            <div class="chat_window__messages">
                {{#each activeMessages}}
                    {{{ChatBubble
                        content=this.content
                        class=this.class
                        time=this.time
                    }}}
                {{/each}}
            </div>
        `);
    }
}

export const withStoreChatWindowMessages = connect((state) => ({chatScroll: state.chatScroll}))(ChatWindowMessages);
