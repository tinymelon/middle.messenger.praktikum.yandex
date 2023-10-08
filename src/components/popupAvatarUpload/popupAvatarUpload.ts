import Block from "../../core/block";

interface Props {
    onClick: (arg0: MouseEvent) => void,
    onSubmit: (arg0: SubmitEvent) => void,
    visible: boolean
}

export class PopupAvatarUpload extends Block<Props> {
    constructor(props: Props) {
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
                    {{{PopupAvatarUploadForm onSubmit=onSubmit}}}
                </div>
            {{/PopupWrapper}}
        `)
    }
}
