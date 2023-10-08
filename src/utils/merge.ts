type Indexed<T = unknown> = {
    [key in string]: T;
};

export default function merge(lhs: Indexed, rhs: Indexed): Indexed {
    for (let i in rhs) {
        if (typeof lhs[i] == 'object' && typeof rhs[i] == 'object') {
            lhs[i] = merge(lhs[i] as Indexed, rhs[i] as Indexed);
        } else if ((typeof lhs[i] == 'object' && typeof rhs[i] != 'object') || !rhs[i]) {
            lhs[i] = lhs[i];
        } else if ((typeof lhs[i] != 'object' && typeof rhs[i] == 'object') || !lhs[i]) {
            lhs[i] = rhs[i];
        } else {
            lhs[i] = rhs[i];
        }
    }

    return lhs;
}
