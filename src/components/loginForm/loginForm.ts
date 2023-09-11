import Block from "../../core/Block";
import * as validators from '../../utils/validators';

export class LoginForm extends Block {
    constructor(props: any) {
        super({
            events: {
                submit: props.onSubmit
            },
            validate: validators.login,
            ...props
        });
    }

    protected render(): string {
        // language=Handlebars
        return (`
            <form action="chats" class="auth_from_wrapper__form">
                <div class="auth_from_wrapper__form_inputs">
                    {{{FormField label='Логин' name='login' type='text' validate=validate }}}
                    {{{FormField label='Пароль' name='password' type='password'}}}
                </div>
                
                {{{ActionButton text='Авторизоваться'}}}
                {{{LoginBlockLink text='Нет аккаунта?' page='registration'}}}
            </form>
        `)
    }
}
