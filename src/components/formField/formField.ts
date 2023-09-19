import Block from "../../core/block";

interface Props {
    onBlur: () => void,
    validate: (arg0: string, arg1?: boolean, arg2?: string) => string,
    compare: () => string,
    value: string,
    label: string,
    type: string,
    name?: string,
    submitted?: boolean,
    error?: string,
}

export class FormField extends Block<Props> {
    constructor(props: Props) {
        super({
            ...props,
            onBlur: () => {
                const ref = this.refs.input as Block<Props>;
                const element = ref.element as HTMLInputElement;
                const value = element.value;
                this.setProps({
                    value,
                    submitted: false
                });
            },
            value: ''
        });
    }

    public value() {
        if (!this.validate()) {
            return false;
        }
        const ref = this.refs.input as Block<Props>;
        const element = ref.element as HTMLInputElement;
        return element.value;
    }

    public validate() {
        const ref = this.refs.input as Block<Props>;
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
