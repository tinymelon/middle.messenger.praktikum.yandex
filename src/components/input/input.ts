import Block from "../../core/block";

interface Props {
    onBlur: () => void,
    value: string,
    type: string,
    name?: string
}

export class Input extends Block<Props> {
    constructor(props: Props) {
        super({
            events: {
                blur: props.onBlur,
                keypress: (event: KeyboardEvent) => {
                    if (event.key == 'Enter') {
                        event.preventDefault();
                        event.stopImmediatePropagation();
                    }
                }
            },
            ...props
        });
    }

    protected render(): string {
        return (`<input type="{{type}}" name="{{name}}" value="{{value}}">`)
    }
}
