type CloneDeep<T> = T extends object? { [K in keyof T]: CloneDeep<T[K]> } : T;

function cloneDeep<T>(object: T): CloneDeep<T> {
    if (typeof object !== 'object' || object === null) {
        return object as CloneDeep<T>;
    }

    const copy: Record<string, any> = Array.isArray(object) ? [] : {};

    for (const [key, value] of (<any>Object).entries(object)) {
        if (Object.prototype.hasOwnProperty.call(object, key)) {
            copy[key] = cloneDeep(value);
        }
    }

    return copy as CloneDeep<T>;
}


export default cloneDeep;
