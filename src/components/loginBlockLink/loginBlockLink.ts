import Block from "../../core/block";

export class LoginBlockLink extends Block {
    constructor(props: any) {
        super({
            ...props
        });
    }

    protected render(): string {
        return (`<a class="login_block_link" href="#" data-page="{{page}}">{{text}}</a>`)
    }
}
