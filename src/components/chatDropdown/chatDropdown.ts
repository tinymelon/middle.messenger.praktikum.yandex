import Block from "../../core/Block";
import './chatDropdown.less';

export class ChatDropdown extends Block {
    constructor(props: any) {
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
