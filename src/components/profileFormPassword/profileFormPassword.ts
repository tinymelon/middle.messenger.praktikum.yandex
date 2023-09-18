import Block from "../../core/block";
import * as validators from "../../utils/validators";

export class ProfileFormPassword extends Block {
    constructor(props: any) {
        super({
            events: {
                submit: props.onPasswordSave
            },
            validators: {
                password: validators.password,
                passwordAgain: validators.passwordAgain
            },
            compare: () => { return this.refs.newPassword.value()},
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
        if (this.refs.passwordAgain.value() != this.refs.newPassword.value()) {
            this.refs.passwordAgain.setProps({error: 'Пароли не совпадают'});
        }
        return false;
    }

    protected render(): string {
        //language=hbs
        return (`
            <form action="#put_user_password">
                <div class="profile__form_wrapper">
                    {{{ProfileFormField label='Старый пароль' ref='password' name='password' type='password' validate=false}}}
                    {{{ProfileFormField label='Новый пароль' ref='newPassword' name='newPassword' type='password' validate=validators.password}}}
                    {{{ProfileFormField label='Повторите новый пароль' ref='passwordAgain' type='password' compare=compare validate=validators.passwordAgain}}}
                </div>
                {{{ActionButton text='Сохранить' class='profile__save_button'}}}
            </form>        
        `);
    }
}
