import Block from "../../core/block";

export class ErrorLine extends Block {
    constructor(props: any) {
        super({
            ...props
        });
    }

    protected render(): string {
        return (`<div class="error_text">{{error}}</div>`);
    }
}
