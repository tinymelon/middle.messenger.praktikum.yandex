import Block from "../../core/Block";

export class AsideBackButton extends Block {
    constructor(props: any) {
        super({
            ...props
        });
    }

    protected render(): string {
        return (`<a href="#" class="aside_back_button" data-page="chats"></a>`);
    }
}
