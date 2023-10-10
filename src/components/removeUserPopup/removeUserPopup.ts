import Block from "../../core/block";
import { connect } from "../../utils/connect";
import {FormField} from "../formField";

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

    public getUserLogin() {
        return (this.refs.login as unknown as FormField).value();
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
                    {{{FormField label='Логин пользователя' ref='login' type='text'}}}
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
