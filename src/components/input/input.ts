import Block from "../../core/Block";

export class Input extends Block {
    constructor(props: any) {
        super({
            events: {
                blur: props.onBlur
            },
            ...props
        });
    }

    protected render(): string {
        return (`<input type="{{type}}" name="{{name}}" value="{{value}}">`)
    }
}
