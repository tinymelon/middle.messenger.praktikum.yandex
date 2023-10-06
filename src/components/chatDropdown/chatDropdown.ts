import Block from "../../core/block";
import './chatDropdown.less';

interface Props {
    active: boolean,
    openAddUserPopup: () => void
}

export class ChatDropdown extends Block<Props> {
    constructor(props: Props) {
        super({
            ...props
        });
    }

    protected render(): string {
        //language=hbs
        return (`
            <div class="chat_dropdown__wrapper {{#if active}}active{{/if}}">
                {{{ChatDropdownAction class='chat_dropdown__add_user' text='Добавить пользователя' onClick=openAddUserPopup}}}
                {{{ChatDropdownAction class='chat_dropdown__remove_user' text='Удалить пользователя' onClick=openRemoveUserPopup}}}
                {{{ChatDropdownAction class='chat_dropdown__delete' text='Удалить чат'}}}
            </div>
        `);
    }
}
