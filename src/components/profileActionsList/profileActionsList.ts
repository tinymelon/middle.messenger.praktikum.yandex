import Block from "../../core/block";

interface Props {
    onModeChange: (arg0: Record<string, any>) => void
}

export class ProfileActionsList extends Block<Props> {
    constructor(props: Props) {
        super({
            ...props
        });
    }

    protected render(): string {
        //language=hbs
        return (`
            <div class="profile_actions__wrapper">
                {{{ProfileAction class='profile_actions__action' text='Изменить данные' onClick=onModeChange property='editable' value=''}}}
                {{{ProfileAction class='profile_actions__action' text='Изменить пароль' onClick=onModeChange property='changePassword' value=true}}}
                {{{ProfileAction page='login' class='profile_actions__action red' text='Выйти'}}}
            </div>
        `);
    }
}
