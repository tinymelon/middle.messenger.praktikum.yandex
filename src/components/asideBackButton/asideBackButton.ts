import Block from "../../core/block";

type Props = {};

export class AsideBackButton extends Block<Props> {
    constructor() {
        super();
    }

    protected render(): string {
        return (`<a href="#" class="aside_back_button" data-page="chats"></a>`);
    }
}
