import Block from "../../core/block";
import isFormSubmitErrors from "../../utils/isFormSubmitErrors";
import { signin } from "../../services/auth";

interface Props {
    onLogin: (arg0: SubmitEvent) => void
}

export class LoginPage extends Block<Props> {
    constructor(props: Props) {
        super({
            ...props,
            onLogin: (event: SubmitEvent) => {
                const form = this.refs.loginForm as Block<Props>;
                const errors = isFormSubmitErrors(event, form.refs as Record<string, Block<any>>);
                if (errors) return;
                const formData: Record<string, any> = Object.fromEntries(new FormData(event.target as HTMLFormElement).entries());
                console.log(formData);
                signin({
                    login: formData.login,
                    password: formData.password
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
            {{#> AuthFormWrapper title='Авторизация'}}
                {{{ LoginForm onSubmit=onLogin ref='loginForm' }}}
            {{/AuthFormWrapper}}
        `);
    }
}
