import Block from "../../core/block";

interface Props {
    page: string,
    text: string
}

export class LoginBlockLink extends Block {
    constructor(props: Props) {
        super({
            ...props
        });
    }

    protected render(): string {
        return (`<a class="login_block_link" href="#" data-page="{{page}}">{{text}}</a>`)
    }
}
