import Block from "../../core/block";
import Router from "../../core/router";

interface Props {
    class: string,
    page: string,
    text: string
}

export class ActionButton extends Block<Props> {
    constructor(props: Props) {
        super({
            ...props,
            events: {
                click: (event: MouseEvent) => {
                    if (this.props.page) {
                        event.preventDefault();
                        event.stopImmediatePropagation();
                        const router = new Router('#app');
                        router.go(`/${this.props.page}`);
                    }
                }
            }
        });
    }

    protected render(): string {
        return (`<button class="action_button {{class}}">{{text}}</button>`)
    }
}
