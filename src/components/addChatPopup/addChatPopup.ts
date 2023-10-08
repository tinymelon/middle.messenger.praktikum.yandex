import Block from "../../core/block";
import { connect } from "../../utils/connect";

interface Props {
    isOpenDialogChat: boolean,
    onClose: () => void,
    onSave: () => void,
    error: string
}

export class AddChatPopup extends Block<Props> {
    constructor(props: Props) {
        super({
            ...props,
        })
    }

    public getChatTitle() {
        return (this.refs.title as unknown as AddChatPopup).value();
    }

    public setError(error: string) {
        (this.refs.errorLine as Block<Props>).setProps({error})
    }

    protected render(): string {
        //language=hbs
        return `
            {{#Dialog open=isOpenDialogChat}}
                <form method="dialog">
                    <h3>Создать новую переписку</h3>
                    {{{FormField label='Название чата' ref='title' type='text'}}}
                    {{{ErrorLine error=error ref="errorLine"}}}
                    <div class="dialog_actions_line">
                        {{{ActionButton text="создать" class='create' onClick=onSave}}}
                        {{{ActionButton text="отменить" class="close" onClick=onClose}}}
                    </div>
                </form>
            {{/Dialog}}
        `
    }
}

export const withStoreAddChatPopup = connect((state) => ({isOpenDialogChat: state.isOpenDialogChat}))(AddChatPopup);
