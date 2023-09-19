import Block from "../../core/block";

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
                click: () => {
                    this.setData();
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
            <a href="#" {{#if page}}data-page="{{page}}"{{/if}} class="{{class}}">{{text}}</a>
        `);
    }
}
