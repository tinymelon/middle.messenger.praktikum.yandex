import Block from "../../core/block";
import Router from "../../core/router";

type Props = {};

export class AsideBackButton extends Block<Props> {
    constructor() {
        super({
            events: {
                click: (event: MouseEvent) => {
                    event.preventDefault();
                    event.stopImmediatePropagation();
                    const router = new Router('#app');
                    router.go(`/messenger`);
                }
            }
        });
    }

    protected render(): string {
        return (`<a href="#" class="aside_back_button"></a>`);
    }
}
