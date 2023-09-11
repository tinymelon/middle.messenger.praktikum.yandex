import Block from "../../core/Block";

export class LoginPage extends Block {
    constructor(props: any) {
        super({
            onLogin: (event: SubmitEvent) => {
                event.preventDefault();
                const formData = Object.fromEntries(new FormData(event.srcElement as HTMLFormElement).entries());
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
