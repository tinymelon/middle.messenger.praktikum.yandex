import Block from "../../core/block";
import isFormSubmitErrors from "../../utils/isFormSubmitErrors";

interface Props {
    onRegister: (arg0: SubmitEvent) => void
}

export class RegistrationPage extends Block {
    constructor(props: Props) {
        super({
            ...props,
            onRegister: (event: SubmitEvent) => {
                const form = this.refs.registrationForm as Block;
                const errors = isFormSubmitErrors(event, form.refs);
                if (errors) return;
                const formData = Object.fromEntries(new FormData(event.target as HTMLFormElement).entries());
                console.log(formData);
            }
        });
    }

    protected render(): string {
        //language=hbs
        return (`
            {{#> AuthFormWrapper title='Регистрация'}}
                {{{ RegistrationForm onSubmit=onRegister ref='registrationForm' }}}
            {{/AuthFormWrapper}}
        `);
    }
}
