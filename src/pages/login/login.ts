import Block from "../../core/Block";
import * as validators from '../../utils/validators';

export class LoginPage extends Block {
    constructor(props: any) {
        super({
            onLogin: (event: SubmitEvent) => {
                event.preventDefault();
                const formData = Object.fromEntries(new FormData(event.srcElement as HTMLFormElement).entries());
                const errors = {};
                for (let i in formData) {
                    const error = validators[i](formData[i], true);
                    if (error != '') {
                        errors[i] = error;
                    }
                }
                if (Object.keys(errors).length) {
                    event.stopImmediatePropagation();
                    this.refs.loginForm.setProps({errors});
                    return;
                }
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
