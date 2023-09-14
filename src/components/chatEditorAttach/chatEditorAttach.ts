import Block from "../../core/Block";
import './chatEditorAttach.less';

export class ChatEditorAttach extends Block {
    constructor(props: any) {
        super({
            active: false,
            ...props
        });
    }

    protected render(): string {
        return (`
            <div class="message_attach__dropdown__wrapper {{#if active}}active{{/if}}">
                <div class="message_attach__media">Фото или видео</div>
                <div class="message_attach__file">Файл</div>
                <div class="message_attach__location">Локация</div>
            </div>
        `);
    }
}
