import Block from "../../core/block";

interface Props {
    class: string,
    page: string,
    text: string
}

export class ActionButton extends Block {
    constructor(props: Props) {
        super({
            ...props
        });
    }

    protected render(): string {
        return (`<button class="action_button {{class}}" data-page="{{page}}">{{text}}</button>`)
    }
}
