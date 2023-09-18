import Block from "../../core/block";

export class ChatWindow extends Block {
    constructor(props: any) {
        super({
            chatActionsToggle: () => {
                const ref = this.refs.chatDropdown as Block;
                ref.setProps({
                    active: !ref.props.active
                });
            },
            ...props
        });
    }

    protected render(): string {
        //language=hbs
        return (`
        {{#if activeChat}}
            <div class="chat_window__wrapper">
                <div class="chat_window__head">
                    {{{ChatWindowHead ref='chatWindowHead' title=title onChatActionsClick=chatActionsToggle}}}
                    {{{ChatDropdown ref='chatDropdown' active=active}}}
                </div>
                <div class="chat_window__messages">
                    {{{ChatBubble content='Привет! Есть что?' class='sent short' time='23:47'}}}
                    {{{ChatDate date='19 июня'}}}
                    {{{ChatBubble content='Привет! Смотри, тут всплыл интересный кусок крутой шапочки — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих шапочек все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой.<br><br>Хассельблад в итоге адаптировал SWC для ношения на голове, но что-то пошло не так и на ракету они так никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.' class='received' time='04:21'}}}
                    {{{ChatBubble content='<img src="/assets/images/camera.png" alt="">' class='received image' time='04:27'}}}
                    {{{ChatBubble content='Круто!' class='sent short' time='08:21'}}}
                    {{{ChatBubble content='шапочка топ' class='sent short' time='08:21'}}}
                </div>
                <div class="chat_window__editor">
                    {{{ChatWindowEditor}}}
                </div>
            </div>
        {{^}}
            <div class="centered_content chat_window__empty">Выберите чат, чтобы отправить сообщение</div>
        {{/if}}
        `);
    }
}
