import Block from "../../core/block";
import isFormSubmitErrors from "../../utils/isFormSubmitErrors";
import {signup} from "../../services/auth";

interface Props {
    onRegister: (arg0: SubmitEvent) => void
}

export class RegistrationPage extends Block<Props> {
    constructor(props: Props) {
        super({
            ...props,
            onRegister: (event: SubmitEvent) => {
                const form = this.refs.registrationForm as Block<Props>;
                const errors = isFormSubmitErrors(event, form.refs as Record<string, Block<any>>);
                if (errors) return;
                const formData: Record<string, any> = Object.fromEntries(new FormData(event.target as HTMLFormElement).entries());
                console.log(formData);
                signup({
                    login: formData.login,
                    password: formData.password,
                    first_name: formData.first_name,
                    second_name: formData.second_name,
                    phone: formData.phone,
                    email: formData.email
                }).catch(error => {
                    form.setProps({
                        error: error.reason || error.error || error
                    });
                });
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
