import Block from "../../core/block";
import Router from "../../core/router";

interface Props {
    class: string,
    page: string,
    text: string,
    onClick?: (event: unknown) => void,
    property?: string,
    value?: unknown
}

export class ActionButton extends Block<Props> {
    constructor(props: Props) {
        super({
            ...props,
            events: {
                click: (event: MouseEvent) => {
                    this.setData();
                    if (this.props.page) {
                        event.preventDefault();
                        event.stopImmediatePropagation();
                        const router = new Router('#app');
                        router.go(`/${this.props.page}`);
                    }
                    if (this.props.onClick) {
                        event.preventDefault();
                        event.stopImmediatePropagation();
                        this.props.onClick(event);
                    }
                }
            }
        });
    }

    protected setData() {
        if (this.props.onClick && this.props.property && typeof this.props.value != undefined) {
            const data: Record<string, any> = {};
            data[this.props.property] = this.props.value;
            data[this.props.property] = this.props.value;
            this.props.onClick(data);
        }
    }

    protected render(): string {
        return (`<button class="action_button {{class}}">{{text}}</button>`)
    }
}
