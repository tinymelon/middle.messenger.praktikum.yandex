import Block from "../../core/block";

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
