import Block from "../../core/Block";

export class FormField extends Block {
    constructor(props: any) {
        super({
            onBlur: () => {
                const value = this.refs.input.element.value;
                //this.validate();
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
        return this.refs.input.element.value
    }

    private validate() {
        const value = this.refs.input.element.value;
        const error = this.props.validate?.(value, this.props.submitted, this.props.compare ? this.props.compare() : null);
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
        //language=Handlebars
        return (`
            <div class="form_group {{#if error}}error{{/if}}">
                <label for="{{name}}">{{label}}</label>
                {{{ Input type=type name=name ref='input' onBlur=onBlur value=value }}}
                {{{ ErrorLine ref="errorLine" error=error}}}
            </div>
        `)
    }
}
