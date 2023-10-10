import Block from "../../core/block";
import Router from "../../core/router";

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
                    const router = new Router('#app');
                    router.go(`/${this.props.page}`);
                }
            }
        });
    }

    protected render(): string {
        return (`<a class="login_block_link" href="#" data-page="{{page}}">{{text}}</a>`)
    }
}
