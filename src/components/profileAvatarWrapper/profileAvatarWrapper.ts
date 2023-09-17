import Block from "../../core/Block";

export class ProfileAvatarWrapper extends Block {
    constructor(props: any) {
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
