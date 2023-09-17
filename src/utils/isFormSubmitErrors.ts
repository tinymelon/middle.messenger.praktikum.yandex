import Block from "../core/Block";

export default function isFormSubmitErrors(event: SubmitEvent, refs: Record<string, Block>): Boolean {
    event.preventDefault();
    const errors: Record<string, string> = {};
    let isErrors = false;
    for (let e in refs) {
        let ref = refs[e];
        if (!ref.validate()) {
            errors[ref.props.ref] = ref.props.error;
        }
    }
    isErrors = !!Object.keys(errors).length;
    if (isErrors) event.stopImmediatePropagation();
    return isErrors;
}
