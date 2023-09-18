import Block from "../../core/block";

export class AsideBackButton extends Block {
    constructor() {
        super();
    }

    protected render(): string {
        return (`<a href="#" class="aside_back_button" data-page="chats"></a>`);
    }
}
