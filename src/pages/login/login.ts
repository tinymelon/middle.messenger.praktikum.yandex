import Block from "../../core/Block";
import isFormSubmitErrors from "../../utils/isFormSubmitErrors";

export class LoginPage extends Block {
    constructor(props: any) {
        super({
            onLogin: (event: SubmitEvent) => {
                const errors = isFormSubmitErrors(event, this.refs.loginForm.refs);
                if (errors) return;
                const formData = Object.fromEntries(new FormData(event.target as HTMLFormElement).entries());
                console.log(formData);
            },
            ...props
        });
    }

    protected render(): string {
        // language=Handlebars
        return (`
            {{#> AuthFormWrapper title='Авторизация'}}
                {{{ LoginForm onSubmit=onLogin ref='loginForm' }}}
            {{/AuthFormWrapper}}
        `);
    }
}
