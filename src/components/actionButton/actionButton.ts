import Block from "../../core/block";

export class ActionButton extends Block {
    constructor(props: any) {
        super({
            ...props
        });
    }

    protected render(): string {
        return (`<button class="action_button {{class}}" data-page="{{page}}">{{text}}</button>`)
    }
}
