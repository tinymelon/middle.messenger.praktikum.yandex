import Block from "../../core/Block";
import template from './profileForm.hbs?raw';
import * as validators from "../../utils/validators";

export class ProfileForm extends Block {
    constructor(props: any) {
        super({
            events: {
                submit: props.onProfileSave
            },
            validators: {
                login: validators.login,
                password: validators.password,
                passwordAgain: validators.passwordAgain,
                phone: validators.phone,
                email: validators.email,
                name: validators.name,
                displayName: validators.displayName
            },
            ...props
        });
    }

    protected componentDidUpdate(): boolean {
        const errors = this.props.errors;
        if (errors) {
            for (let key in errors) {
                this.refs[key].setProps({
                    error: errors[key],
                    submitted: true
                });
            }
        }
        return false;
    }

    protected render(): string {
        return (template);
    }
}
