import Block from "../../core/block";
import Router from "../../core/router";

interface Props {}

export class ChatsProfileLink extends Block<Props> {
    constructor() {
        super({
            events: {
                click: (event: MouseEvent) => {
                    event.preventDefault();
                    event.stopImmediatePropagation();
                    const router = new Router('#app');
                    router.go(`/settings`);
                }
            }
        });
    }

    protected render(): string {
        //language=hbs
        return (`
            <a href="#" class="chats_list__profile">Профиль</a>
        `);
    }
}
