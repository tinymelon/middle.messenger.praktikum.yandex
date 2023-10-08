import Block from "../../core/block";

interface Props {
    onClick: () => void,
    avatar?: string
}

export class ProfileAvatarWrapper extends Block<Props> {
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
                {{#if avatar}}
                    <img src="{{avatar}}" alt="" class="profile__avatar_image">
                {{/if}}
            </div>
        `);
    }
}
