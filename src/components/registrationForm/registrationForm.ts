import Block from "../../core/block";
import * as validators from '../../utils/validators';

interface Props {
    onSubmit: (arg0: SubmitEvent) => void,
    errors: Record<string, string>
}

export class RegistrationForm extends Block<Props> {
    constructor(props: Props) {
        super({
            ...props,
            events: {
                submit: props.onSubmit
            },
            validators: {
                login: validators.login,
                password: validators.password,
                passwordAgain: validators.passwordAgain,
                phone: validators.phone,
                email: validators.email,
                name: validators.name
            },
            compare: () => {
                const ref = this.refs.password as Block<Props>;
                return ref.value();
            }
        });
    }

    protected componentDidUpdate(): boolean {
        const errors = this.props.errors;
        if (errors) {
            for (let key in errors) {
                const ref = this.refs[key] as Block<Props>;
                ref.setProps({
                    error: errors[key],
                    submitted: true
                });
            }
            return false;
        }
        const refNewPass = this.refs.password as Block<Props>;
        const refPassAgain = this.refs.passwordAgain as Block<Props>;
        if (refPassAgain.value() != refNewPass.value()) {
            refPassAgain.setProps({error: 'Пароли не совпадают'});
            return false;
        }
        return true;
    }

    protected render(): string {
        //language=hbs
        return (`
            <form action="messenger" class="auth_from_wrapper__form">
                <div class="auth_from_wrapper__form_inputs">
                    {{{FormField label='Почта' name='email' ref='email' type='email' validate=validators.email}}}
                    {{{FormField label='Логин' name='login' ref='login' type='text' validate=validators.login}}}
                    {{{FormField label='Имя' name='first_name' ref='first_name' type='text' validate=validators.name}}}
                    {{{FormField label='Фамилия' name='second_name' ref='second_name' type='text' validate=validators.name}}}
                    {{{FormField label='Телефон' name='phone' ref='phone' type='phone' validate=validators.phone}}}
                    {{{FormField label='Пароль' name='password' ref='password' type='password' validate=validators.password}}}
                    {{{FormField label='Пароль (ещё раз)' ref='passwordAgain' type='password' validate=validators.passwordAgain compare=compare}}}
                    {{{ ErrorLine ref="errorLine" error=error}}}
                </div>

                {{{ActionButton text='Зарегистрироваться'}}}
                {{{LoginBlockLink text='Войти?' href='#' page=''}}}
            </form>
        `)
    }
}
