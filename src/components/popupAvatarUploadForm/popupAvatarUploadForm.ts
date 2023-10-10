import Block from "../../core/block";

interface Props {
    onSubmit: (arg0: SubmitEvent) => void
}

export class PopupAvatarUploadForm extends Block<Props> {
    constructor(props: Props) {
        super({
            events: {
                submit: (event: SubmitEvent) => {
                    event.preventDefault();
                    event.stopImmediatePropagation();
                    this.props.onSubmit(event);
                }
            },
            ...props
        });
    }

    protected render(): string {
        //language=hbs
        return (`
            <form action="/">
                <div class="popup__title">Загрузите файл</div>
                <input type="file" name="avatar" class="popup__avatar_upload_input">
                {{{ActionButton text='Поменять'}}}
            </form>
        `)
    }
}
