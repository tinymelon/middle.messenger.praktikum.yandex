import Block from "../core/block";

export default function isFormSubmitErrors(event: SubmitEvent, references: Record<string, Block>): Boolean {
    event.preventDefault();
    const errors: Record<string, string> = {};
    let isErrors = false;
    for (let element in references) {
        let ref = references[element];
        if (!ref.validate()) {
            errors[ref.props.ref] = ref.props.error;
        }
    }
    isErrors = Object.keys(errors).length > 0;
    if (isErrors) event.stopImmediatePropagation();
    return isErrors;
}
