import Block from "../../core/block";

interface Props {
    onClick: () => void
}

export class ProfileAvatarWrapper extends Block {
    constructor(props: Props) {
        super({
            events: {
                click: props.onClick
            },
            ...props
        });
    }

    protected render(): string {
        //language=hbs
        return (`
            <div class="profile__avatar_wrapper">
                <!-- <img src="" alt="" class="profile__avatar_image"> -->
            </div>
        `);
    }
}
