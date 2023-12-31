import Block from "../../core/block";
import Router from "../../core/router";

interface Props {
    onClick?: (arg0: Record<string, string>) => void,
    page: string,
    class: string,
    text: string,
    property: string,
    value: string
}

export class ProfileAction extends Block<Props> {
    constructor(props: Props) {
        super({
            events: {
                click: (event: MouseEvent) => {
                    this.setData();
                    if (this.props.page) {
                        event.preventDefault();
                        event.stopImmediatePropagation();
                        const router = new Router('#app');
                        router.go(`${this.props.page}`);
                    }
                }
            },
            ...props
        });
    }

    protected setData() {
        if (this.props.onClick) {
            const data: Record<string, any> = {};
            data[this.props.property] = this.props.value;
            this.props.onClick(data);
        }
    }

    protected render(): string {
        //language=hbs
        return (`
            <a href="#" class="{{class}}">{{text}}</a>
        `);
    }
}
