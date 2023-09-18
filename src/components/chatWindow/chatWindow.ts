import Block from "../../core/block";
import template from './chatWindow.hbs?raw';

export class ChatWindow extends Block {
    constructor(props: any) {
        super({
            chatActionsToggle: () => {
                const ref = this.refs.chatDropdown;
                ref.setProps({
                    active: !ref.props.active
                });
            },
            ...props
        });
    }

    protected render(): string {
        return (template);
    }
}
