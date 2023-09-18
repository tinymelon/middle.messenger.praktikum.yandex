import './authFormWrapper.less';

export const AuthFormWrapper = `
    <div class="centered_content">
        <div class="auth_from_wrapper">
            <div class="auth_from_wrapper__title">{{title}}</div>
            {{> @partial-block}}
        </div>
    </div>
`;
