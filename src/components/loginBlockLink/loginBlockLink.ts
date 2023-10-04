import Block from "../../core/block";

interface Props {
    page: string,
    text: string
}

export class LoginBlockLink extends Block<Props> {
    constructor(props: Props) {
        super({
            ...props,
            events: {
                click: (event: MouseEvent) => {
                    event.preventDefault();
                    event.stopImmediatePropagation();
                    window.location.href = `/${this.props.page}`;
                }
            }
        });
    }

    protected render(): string {
        return (`<a class="login_block_link" href="#" data-page="{{page}}">{{text}}</a>`)
    }
}
