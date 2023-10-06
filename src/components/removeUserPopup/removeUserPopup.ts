import Block from "../../core/block";
import { connect } from "../../utils/connect";

interface Props {
    isOpenDialogAddUser: boolean,
    onClose: () => void,
    onSave: () => void,
    error: string
}

export class RemoveUserPopup extends Block<Props> {
    constructor(props: Props) {
        super({
            ...props,
        })
    }

    public getUserId() {
        return (<any> this.refs.id).value();
    }

    public setError(error: string) {
        (this.refs.errorLine as Block<Props>).setProps({error})
    }

    protected render(): string {
        //language=hbs
        return `
            {{#Dialog open=isOpenDialogRemoveUser}}
                <form method="dialog">
                    <h3>Удалить пользователя из чата</h3>
                    {{{FormField label='ID пользователя' ref='id' type='text'}}}
                    {{{ErrorLine error=error ref="errorLine"}}}
                    <div class="dialog_actions_line">
                        {{{ActionButton text="удалить" class='remove' onClick=onSave}}}
                        {{{ActionButton text="отменить" class="close" onClick=onClose}}}
                    </div>
                </form>
            {{/Dialog}}
        `
    }
}

export const withStoreRemoveUserPopup = connect((state) => ({isOpenDialogRemoveUser: state.isOpenDialogRemoveUser}))(RemoveUserPopup);
