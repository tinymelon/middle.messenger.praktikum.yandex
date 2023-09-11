import Block from "../../core/Block";
import * as validators from '../../utils/validators';

export class RegistrationForm extends Block {
    constructor(props: any) {
        super({
            events: {
                submit: props.onSubmit
            },
            validators: {
                login: validators.login
            },
            ...props
        });
    }

    protected render(): string {
        // language=Handlebars
        return (`
            <form action="chats" class="auth_from_wrapper__form">
                <div class="auth_from_wrapper__form_inputs">
                    {{{FormField label='Почта' name='email' type='email' validate=validators.login}}}
                    {{{FormField label='Логин' name='login' type='text' validate=validators.login}}}
                    {{{FormField label='Имя' name='first_name' type='text' validate=validators.login}}}
                    {{{FormField label='Фамилия' name='second_name' type='text' validate=validators.login}}}
                    {{{FormField label='Телефон' name='phone' type='phone' validate=validators.login}}}
                    {{{FormField label='Пароль' name='password' type='password' validate=validators.login}}}
                    {{{FormField label='Пароль (ещё раз)' type='password' validate=validators.login}}}
                </div>

                {{{ActionButton text='Зарегистрироваться'}}}
                {{{LoginBlockLink text='Войти?' href='#' page='login'}}}
            </form>
        `)
    }
}
