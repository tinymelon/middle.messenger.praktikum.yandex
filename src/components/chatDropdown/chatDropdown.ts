import Block from "../../core/block";
import './chatDropdown.less';

interface Props {
    active: boolean
}

export class ChatDropdown extends Block<Props> {
    constructor(props: Props) {
        super({
            ...props
        });
    }

    protected render(): string {
        return (`
            <div class="chat_dropdown__wrapper {{#if active}}active{{/if}}">
                <div class="chat_dropdown__add_user">Добавить пользователя</div>
                <div class="chat_dropdown__remove_user">Удалить пользователя</div>
                <div class="chat_dropdown__delete">Удалить чат</div>
            </div>
        `);
    }
}
