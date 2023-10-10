import Block from "../../core/block";
import isFormSubmitErrors from "../../utils/isFormSubmitErrors";
import {connect} from "../../utils/connect";
import {changeProfileAvatar, changeProfileData, changeProfilePassword} from "../../services/profile";
import {PasswordRequestData, UserRequestData} from "../../api/type";
import {logout} from "../../services/auth";

interface Props {
    onChangeProfilePassword: (arg0: SubmitEvent) => void,
    onChangeProfileData: (arg0: SubmitEvent) => void,
    onAvatarChange: (arg0: SubmitEvent) => void,
    changeFormMode: (arg0: Record<string, any>) => void,
    showAvatarPopup: () => void,
    checkPopupClose: (arg0: MouseEvent) => void,
    onLogout: () => void,
    editable: string,
    changePassword: boolean,
    showPopup: boolean
}

export class ProfilePage extends Block<Props> {
    constructor(props: Props) {
        super({
            ...props,
            onChangeProfilePassword: (event: SubmitEvent) => {
                const form = this.refs.passwordForm as Block<Props>;
                const errors = isFormSubmitErrors(event, form.refs as Record<string, Block<any>>);
                if (errors) return;
                const _this = this;
                const formData = Object.fromEntries(new FormData(event.target as HTMLFormElement).entries()) as PasswordRequestData;
                changeProfilePassword(formData)
                    .then(() => {
                        _this.setProps({
                            editable: 'disabled',
                            changePassword: false,
                        });
                    })
                    .catch((error) => alert(`Ошибка запроса. Причина: ${error.reason}`));
            },
            onChangeProfileData: (event: SubmitEvent) => {
                const form = this.refs.profileForm as Block<Props>;
                const errors = isFormSubmitErrors(event, form.refs as Record<string, Block<any>>);
                if (errors) return;
                const _this = this;
                const formData = Object.fromEntries(new FormData(event.target as HTMLFormElement).entries()) as UserRequestData;
                changeProfileData(formData)
                    .then(() => {
                        _this.setProps({
                            editable: 'disabled',
                            changePassword: false,
                        });
                    })
                    .catch((error) => alert(`Ошибка запроса. Причина: ${error.reason}`));
            },
            onAvatarChange: (event: SubmitEvent) => {
                const _this = this;
                const formData = new FormData(event.target as HTMLFormElement);
                changeProfileAvatar(formData)
                    .then(() => {
                        _this.setProps({showPopup: false});
                    })
                    .catch((error) => alert(`Ошибка загрузки. Причина: ${error.reason}`));
            },
            onLogout: () => {
                logout().catch((error) => alert(`Ошибка запроса. Причина: ${error.reason}`));
            },
            changeFormMode: (data: Record<string, any>) => {
                this.setProps(data);
            },
            showAvatarPopup: () => {
                this.setProps({showPopup: true});
            },
            checkPopupClose: (event: MouseEvent) => {
                if ((event.target as HTMLElement).classList.contains('close'))
                    this.setProps({showPopup: false});
            },
            editable: 'disabled',
            changePassword: false,
            showPopup: false
        });
    }

    protected render(): string {
        //language=hbs
        return (`
            <div class="profile_page__wrapper">
                <aside>
                    {{{AsideBackButton}}}
                </aside>
                <main class="centered_content">
                    <div class="profile__content_wrapper">
                        {{{ProfileAvatarWrapper onClick=showAvatarPopup avatar=user.avatar}}}
                        <div class="profile__name">{{user.firstName}}</div>
                        {{#if changePassword}}
                            {{{ProfileFormPassword ref='passwordForm' editable=editable onPasswordSave=onChangeProfilePassword onModeChange=changeFormMode}}}
                        {{^}}
                            {{{ProfileForm ref='profileForm' editable=editable onProfileSave=onChangeProfileData onModeChange=changeFormMode onLogout=onLogout user=user}}}
                        {{/if}}
                    </div>
                </main>
                {{{ PopupAvatarUpload visible=showPopup onClick=checkPopupClose onSubmit=onAvatarChange }}}
            </div>
        `);
    }
}

export default connect(({ user}) => ({user}))(ProfilePage)
