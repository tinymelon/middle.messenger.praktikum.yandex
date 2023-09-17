import Block from "../../core/Block";

export class ProfileFormField extends Block {
    constructor(props: any) {
        super({
            events: {
                change: () => {
                    this.setValue();
                }
            },
            ...props
        });
    }

    public value() {
        return this.refs.input.value;
    }

    protected setValue() {
        const value = this.refs.input.value;
        this.setProps({
            value,
            submitted: false
        });
    }

    private validate() {
        if (!this.props.validate) return true;
        const value = this.refs.input.value;
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
        //language=hbs
        return (`
            <div class="profile_form_group {{#if error}}error{{/if}}">
                <label for="{{name}}">
                    {{label}}
                    <span class="error_text"></span>
                </label>
                <input type="{{type}}" ref="input" name="{{name}}" value="{{value}}" {{editable}}>
            </div>
        `);
    }
}
