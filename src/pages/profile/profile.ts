import Block from "../../core/Block";
import isFormSubmitErrors from "../../utils/isFormSubmitErrors";

export class ProfilePage extends Block {
    constructor(props: any) {
        super({
            changeProfilePassword: (event: SubmitEvent) => {
                const errors = isFormSubmitErrors(event, this.refs.passwordForm.refs);
                if (errors) return;
                this.setProps({
                    editable: 'disabled',
                    changePassword: false,
                });
                const formData = Object.fromEntries(new FormData(event.target as HTMLFormElement).entries());
                console.log(formData);
            },
            changeProfileData: (event: SubmitEvent) => {
                const errors = isFormSubmitErrors(event, this.refs.profileForm.refs);
                if (errors) return;
                this.setProps({
                    editable: 'disabled',
                    changePassword: false,
                });
                const formData = Object.fromEntries(new FormData(event.target as HTMLFormElement).entries());
                console.log(formData);
            },
            changeFormMode: (data: Record<string, any>) => {
                this.setProps(data);
            },
            showAvatarPopup: () => {
                this.setProps({showPopup: true});
            },
            checkPopupClose: (event: MouseEvent) => {
                if (event.target.classList.contains('close'))
                    this.setProps({showPopup: false});
            },
            editable: 'disabled',
            changePassword: false,
            showPopup: false,
            ...props
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
                        {{{ProfileAvatarWrapper onClick=showAvatarPopup}}}
                        <div class="profile__name">Иван</div>
                        {{#if changePassword}}
                            {{{ProfileFormPassword ref='passwordForm' editable=editable onPasswordSave=changeProfilePassword}}}
                        {{^}}
                            {{{ProfileForm ref='profileForm' editable=editable onProfileSave=changeProfileData onModeChange=changeFormMode}}}
                        {{/if}}
                    </div>
                </main>
                {{{ PopupAvatarUpload visible=showPopup onClick=checkPopupClose }}}
            </div>
        `);
    }
}
