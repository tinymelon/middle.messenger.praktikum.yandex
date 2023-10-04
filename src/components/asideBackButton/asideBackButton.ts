import Block from "../../core/block";

type Props = {};

export class AsideBackButton extends Block<Props> {
    constructor() {
        super({
            events: {
                click: () => {
                    window.location.href = `/chats`;
                }
            }
        });
    }

    protected render(): string {
        return (`<a href="#" class="aside_back_button"></a>`);
    }
}
