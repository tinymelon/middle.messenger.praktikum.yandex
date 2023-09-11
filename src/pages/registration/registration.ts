import Block from "../../core/Block";

export class RegistrationPage extends Block {
    constructor(props: any) {
        super({
            onRegister: (event: SubmitEvent) => {
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
            {{#> AuthFormWrapper title='Регистрация'}}
                {{{ RegistrationForm onSubmit=onRegister ref='registrationForm' }}}
            {{/AuthFormWrapper}}
        `);
    }
}
