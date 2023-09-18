import Block from "../../core/block";
import isFormSubmitErrors from "../../utils/isFormSubmitErrors";

export class RegistrationPage extends Block {
    constructor(props: any) {
        super({
            onRegister: (event: SubmitEvent) => {
                const form = this.refs.registrationForm as Block;
                const errors = isFormSubmitErrors(event, form.refs);
                if (errors) return;
                const formData = Object.fromEntries(new FormData(event.target as HTMLFormElement).entries());
                console.log(formData);
            },
            ...props
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
