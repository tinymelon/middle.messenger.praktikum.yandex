import Block from "../../core/block";
import isFormSubmitErrors from "../../utils/isFormSubmitErrors";

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
                const formData = Object.fromEntries(new FormData(event.target as HTMLFormElement).entries());
                console.log(formData);
                window.location.href = '/messenger';
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
