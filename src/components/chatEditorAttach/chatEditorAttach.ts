import Block from "../../core/block";
import './chatEditorAttach.less';

interface Props {
    active: boolean
}

export class ChatEditorAttach extends Block {
    constructor(props: Props) {
        super({
            ...props,
            active: false
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
