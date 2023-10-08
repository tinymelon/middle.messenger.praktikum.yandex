import Block from "../../core/block";

interface Props {
    onClick?: (event: Event) => void,
}

export class ChatAddButton extends Block<Props> {
    constructor(props: Props) {
        super({
            ...props,
            events: {
                click: (event: MouseEvent) => {
                    event.preventDefault();
                    event.stopImmediatePropagation();
                    if (this.props.onClick) {
                        this.props.onClick(event);
                    }
                }
            }
        });
    }

    protected render(): string {
        //language=hbs
        return (`
            <a href="#" class="chats_add_button">Добавить чат</a>
        `);
    }
}
