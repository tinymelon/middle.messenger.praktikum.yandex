import Block from "../../core/block";

export class FormField extends Block {
    constructor(props: any) {
        super({
            onBlur: () => {
                const ref = this.refs.input as Block;
                const element = ref.element as HTMLInputElement;
                const value = element.value;
                this.setProps({
                    value,
                    submitted: false
                });
            },
            value: '',
            ...props
        });
    }

    public value() {
        if (!this.validate()) {
            return false;
        }
        const ref = this.refs.input as Block;
        const element = ref.element as HTMLInputElement;
        return element.value;
    }

    public validate() {
        const ref = this.refs.input as Block;
        const element = ref.element as HTMLInputElement;
        const value = element.value;
        const error = this.props.validate?.(value, this.props.submitted, this.props.compare ? this.props.compare() : undefined);
        if (error) {
            this.setProps({ error });
            return false;
        }
        this.setProps({ error: undefined });
        return true;
    }

    protected componentDidUpdate(): boolean {
        this.validate();
        return true;
    }

    protected render(): string {
        //language=hbs
        return (`
            <div class="form_group {{#if error}}error{{/if}}">
                <label for="{{name}}">{{label}}</label>
                {{{ Input type=type name=name ref='input' onBlur=onBlur value=value }}}
                {{{ ErrorLine ref="errorLine" error=error}}}
            </div>
        `)
    }
}
