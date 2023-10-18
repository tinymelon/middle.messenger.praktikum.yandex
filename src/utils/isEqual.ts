export default function isEqual(a: Record<string, any>, b: Record<string, any>): boolean {
    let result: boolean = true;
    let index: string;
    for (index in a) {
        result = compareHelper(a[index], b[index]);
        if (!result) return false;
    }
    for (index in b) {
        result = compareHelper(b[index], a[index]);
        if (!result) return false;
    }
    return result;
}

function compareHelper(a: unknown, b: unknown): boolean {
    let result: boolean;
    if (typeof a === 'function') a = a.toString();
    if (typeof b === 'function') b = b.toString();
    result = typeof a == 'object' && a !== null && typeof b == 'object' && b !== null ? isEqual(a as Record<string, any>, b as Record<string, any>) : a === b;
    return result;
}
