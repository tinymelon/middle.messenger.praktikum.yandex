import Block from "../../core/block";
import * as validators from "../../utils/validators";

interface Props {
    onProfileSave: (arg0: SubmitEvent) => void,
    onModeChange: (arg0: Record<string, any>) => void,
    editable: string
}

export class ProfileForm extends Block {
    constructor(props: Props) {
        super({
            ...props,
            events: {
                submit: props.onProfileSave
            },
            validators: {
                login: validators.login,
                password: validators.password,
                passwordAgain: validators.passwordAgain,
                phone: validators.phone,
                email: validators.email,
                name: validators.name,
                displayName: validators.displayName
            }
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
        <form action="#put_user_profile">
            <div class="profile__form_wrapper">
                {{{ProfileFormField label='Почта' ref='email' name='email' type='email' value='pochta@yandex.ru' editable=editable validate=validators.email}}}
                {{{ProfileFormField label='Логин' ref='login' name='login' type='text' value='ivanivanov' editable=editable validate=validators.login}}}
                {{{ProfileFormField label='Имя' ref='first_name' name='first_name' type='text' value='Иван' editable=editable validate=validators.name}}}
                {{{ProfileFormField label='Фамилия' ref='second_name' name='second_name' type='text' value='Иванов' editable=editable validate=validators.name}}}
                {{{ProfileFormField label='Имя в чате' ref='display_name' name='display_name' type='text' value='Иван' editable=editable validate=validators.displayName}}}
                {{{ProfileFormField label='Телефон' ref='phone' name='phone' type='phone' value='+79099673030' editable=editable validate=validators.phone}}}
            </div>
            {{#if editable}}
                {{{ProfileActionsList editable=editable onModeChange=onModeChange}}}
            {{^}}
                {{{ActionButton text='Сохранить' class='profile__save_button'}}}
            {{/if}}
        </form>
        `);
    }
}
