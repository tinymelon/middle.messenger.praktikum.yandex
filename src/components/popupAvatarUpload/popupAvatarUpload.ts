import Block from "../../core/block";

export class PopupAvatarUpload extends Block {
    constructor(props: any) {
        super({
            events: {
                click: (event: MouseEvent) => {
                    this.props.onClick(event);
                }
            },
            ...props
        });
    }

    protected render(): string {
        //language=hbs
        return (`
            {{#> PopupWrapper visible=visible onClick=onClick}}
                <div class="popup_box popup__avatar_upload {{#if visible}}active{{/if}}">
                    <div class="close_popup close"></div>
                    <form action="/">
                        <div class="popup__title">Загрузите файл</div>
                        <input type="file" class="popup__avatar_upload_input">
                        {{{ActionButton text='Поменять'}}}
                    </form>
                </div>
            {{/PopupWrapper}}
        `)
    }
}
