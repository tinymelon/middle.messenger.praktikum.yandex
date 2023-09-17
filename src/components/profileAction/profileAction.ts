import Block from "../../core/Block";

export class ProfileAction extends Block {
    constructor(props: any) {
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
