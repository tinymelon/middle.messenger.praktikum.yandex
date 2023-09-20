import Block from "../../core/block";
import * as validators from "../../utils/validators";

interface Props {
    onPasswordSave: (arg0: SubmitEvent) => void,
    errors: Record<string, string>
}

export class ProfileFormPassword extends Block<Props> {
    constructor(props: Props) {
        super({
            events: {
                submit: props.onPasswordSave
            },
            validators: {
                password: validators.password,
                passwordAgain: validators.passwordAgain
            },
            compare: () => {
                const ref = this.refs.newPassword as Block<Props>;
                return ref.value();
            },
            ...props
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
        }
        const refNewPass = this.refs.newPassword as Block<Props>;
        const refPassAgain = this.refs.passwordAgain as Block<Props>;
        if (refPassAgain.value() != refNewPass.value()) {
            refPassAgain.setProps({error: 'Пароли не совпадают'});
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
