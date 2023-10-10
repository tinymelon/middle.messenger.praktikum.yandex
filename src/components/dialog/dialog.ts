import Block from "../../core/block";

interface Props {
    open: boolean
}

export class Dialog extends Block<Props> {
    protected render(): string {
        return `<dialog class="dialog" {{#if open}}open{{/if}} ></dialog>`
    }
}
