import Block from "../../core/Block";
import * as validators from '../../utils/validators';

export class RegistrationForm extends Block {
    constructor(props: any) {
        super({
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
            compare: () => { return this.refs.password.refs.input.element.value},
            ...props
        });
    }

    protected componentDidUpdate(): boolean {
        const errors = this.props.errors;
        if (errors) {
            for (let key in errors) {
                this.refs[key].setProps({
                    error: errors[key],
                    submitted: true
                });
            }
        }
        if (this.refs.passwordAgain.refs.input.element.value != this.refs.password.refs.input.element.value) {
            this.refs.passwordAgain.setProps({error: 'Пароли не совпадают'});
        }
        return false;
    }

    protected render(): string {
        //language=hbs
        return (`
            <form action="chats" class="auth_from_wrapper__form">
                <div class="auth_from_wrapper__form_inputs">
                    {{{FormField label='Почта' name='email' ref='email' type='email' validate=validators.email}}}
                    {{{FormField label='Логин' name='login' ref='login' type='text' validate=validators.login}}}
                    {{{FormField label='Имя' name='first_name' ref='first_name' type='text' validate=validators.name}}}
                    {{{FormField label='Фамилия' name='second_name' ref='second_name' type='text' validate=validators.name}}}
                    {{{FormField label='Телефон' name='phone' ref='phone' type='phone' validate=validators.phone}}}
                    {{{FormField label='Пароль' name='password' ref='password' type='password' validate=validators.password}}}
                    {{{FormField label='Пароль (ещё раз)' ref='passwordAgain' type='password' validate=validators.passwordAgain compare=compare}}}
                </div>

                {{{ActionButton text='Зарегистрироваться'}}}
                {{{LoginBlockLink text='Войти?' href='#' page='login'}}}
            </form>
        `)
    }
}
