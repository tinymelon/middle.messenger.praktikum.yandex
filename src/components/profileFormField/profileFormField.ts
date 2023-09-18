import Block from "../../core/block";

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
        const ref = this.refs.input as Block;
        const element = ref.element as HTMLInputElement;
        return element.value;
    }

    protected setValue() {
        const ref = this.refs.input as Block;
        const element = ref.element as HTMLInputElement;
        const value = element.value;
        this.setProps({
            value,
            submitted: false
        });
    }

    public validate() {
        if (!this.props.validate) return true;
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
