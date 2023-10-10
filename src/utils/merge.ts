type Indexed<T = unknown> = {
    [key in string]: T;
};

export default function merge(lhs: Indexed, rhs: Indexed): Indexed {
    for (let index in rhs) {
        if (typeof lhs[index] == 'object' && typeof rhs[index] == 'object') {
            lhs[index] = merge(lhs[index] as Indexed, rhs[index] as Indexed);
        } else if ((typeof lhs[index] == 'object' && typeof rhs[index] != 'object') || !rhs[index]) {
            lhs[index] = lhs[index];
        } else if ((typeof lhs[index] != 'object' && typeof rhs[index] == 'object') || !lhs[index]) {
            lhs[index] = rhs[index];
        } else {
            lhs[index] = rhs[index];
        }
    }

    return lhs;
}
