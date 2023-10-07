import Block from "../../core/block";
import Router from "../../core/router";

interface Props {
    class: string,
    page: string,
    text: string,
    onClick?: (e: Event) => void
}

export class ActionButton extends Block<Props> {
    constructor(props: Props) {
        super({
            ...props,
            events: {
                click: (event: MouseEvent) => {
                    event.preventDefault();
                    event.stopImmediatePropagation();
                    if (this.props.page) {
                        const router = new Router('#app');
                        router.go(`/${this.props.page}`);
                    }
                    if (this.props.onClick) {
                        this.props.onClick(event);
                    }
                }
            }
        });
    }

    protected render(): string {
        return (`<button class="action_button {{class}}">{{text}}</button>`)
    }
}
