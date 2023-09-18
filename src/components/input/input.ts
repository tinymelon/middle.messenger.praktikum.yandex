import Block from "../../core/block";

interface Props {
    onBlur: () => void,
    value: string,
    type: string,
    name?: string
}

export class Input extends Block {
    constructor(props: Props) {
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
