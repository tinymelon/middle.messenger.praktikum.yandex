import Block from "../../core/block";

interface Props {
    error: string
}

export class ErrorLine extends Block<Props> {
    constructor(props: Props) {
        super({
            ...props
        });
    }

    protected render(): string {
        return (`<div class="error_text">{{error}}</div>`);
    }
}
