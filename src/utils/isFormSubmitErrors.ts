import Block from "../core/block";

interface Props {
    error: string,
    ref: string,
    refs: any
}

export default function isFormSubmitErrors(event: SubmitEvent, references: Record<string, Block<Props> | HTMLElement>): Boolean {
    event.preventDefault();
    const errors: Record<string, string> = {};
    let isErrors: boolean;
    for (let element in references) {
        let ref = references[element] as Block<Props>;
        if (typeof ref.validate == 'function' && !ref.validate()) {
            errors[ref.props.ref] = ref.props.error;
        }
    }
    isErrors = Object.keys(errors).length > 0;
    if (isErrors) event.stopImmediatePropagation();
    return isErrors;
}
