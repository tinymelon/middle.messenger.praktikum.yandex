type CloneDeep<T> = T extends object? { [K in keyof T]: CloneDeep<T[K]> } : T;

function cloneDeep<T>(obj: T): CloneDeep<T> {
    if (typeof obj !== 'object' || obj === null) {
        return obj as CloneDeep<T>;
    }

    const copy: Record<string, any> = Array.isArray(obj) ? [] : {};

    for (const [key, value] of (<any>Object).entries(obj)) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            copy[key] = cloneDeep(value);
        }
    }

    return copy as CloneDeep<T>;
}


export default cloneDeep;
