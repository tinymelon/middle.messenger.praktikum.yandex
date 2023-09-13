import Block from "../../core/Block";
import * as validators from "../../utils/validators";

export class RegistrationPage extends Block {
    constructor(props: any) {
        super({
            onRegister: (event: SubmitEvent) => {
                event.preventDefault();
                const formData = Object.fromEntries(new FormData(event.target as HTMLFormElement).entries());
                const errors:Record<string, string> = {};
                for (let i in formData) {
                    if (typeof validators[i] == 'function') {
                        const error = validators[i](formData[i], true);
                        if (error != '') errors[i] = error;
                    }
                }
                if (Object.keys(errors).length) {
                    event.stopImmediatePropagation();
                    this.refs.registrationForm.setProps({errors});
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
            {{#> AuthFormWrapper title='Регистрация'}}
                {{{ RegistrationForm onSubmit=onRegister ref='registrationForm' }}}
            {{/AuthFormWrapper}}
        `);
    }
}
