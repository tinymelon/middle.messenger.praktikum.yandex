import './popupWrapper.less';

export const PopupWrapper = `
    <div class="popup_wrapper close {{#if visible}}active{{/if}}">
        {{> @partial-block }}
    </div>
`;
