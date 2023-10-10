import Block from "../../core/block";

interface Props {
    class: string,
    text: string,
    onClick?: (arg0: Event) => void
}

export class ChatDropdownAction extends Block<Props> {
    constructor(props: Props) {
        super({
            ...props,
            events: {
                click: (event: MouseEvent) => {
                    if (this.props.onClick) this.props.onClick(event);
                }
            }
        });
    }

    protected render(): string {
        //language=hbs
        return (`
            <div class="{{class}}">{{text}}</div>
        `);
    }
}
