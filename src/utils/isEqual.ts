function isEqual(a: Record<string, any>, b: Record<string, any>): boolean {
    let result: boolean = true;
    let i: string;
    for (i in a) {
        result = compareHelper(a[i], b[i]);
        if (!result) return false;
    }
    for (i in b) {
        result = compareHelper(b[i], a[i]);
        if (!result) return false;
    }
    return result;
}

function compareHelper(a: unknown, b: unknown): boolean {
    let result: boolean = true;
    if (typeof a == 'object' && a !== null && typeof b == 'object' && b !== null) {
        result = isEqual(a as Record<string, any>, b as Record<string, any>);
    } else {
        result = a === b;
    }
    return result;
}
