import Block from "../../core/block";
import * as validators from '../../utils/validators';

export class LoginForm extends Block {
    constructor(props: any) {
        super({
            events: {
                submit: props.onSubmit
            },
            validators: {
                login: validators.login,
                password: validators.password
            },
            ...props
        });
    }

    protected componentDidUpdate(): boolean {
        const errors = this.props.errors;
        if (errors) {
            for (let key in errors) {
                const ref = this.refs[key] as Block;
                ref.setProps({
                    error: errors[key],
                    submitted: true
                });
            }
        }
        return false;
    }

    protected render(): string {
        //language=hbs
        return (`
            <form action="chats" class="auth_from_wrapper__form">
                <div class="auth_from_wrapper__form_inputs">
                    {{{FormField label='Логин' name='login' ref='login' type='text' validate=validators.login}}}
                    {{{FormField label='Пароль' name='password' ref='password' type='password' validate=validators.password}}}
                </div>
                
                {{{ActionButton text='Авторизоваться'}}}
                {{{LoginBlockLink text='Нет аккаунта?' page='registration'}}}
            </form>
        `)
    }
}
