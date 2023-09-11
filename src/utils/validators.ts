export function login (value: string) {
    return value.length < 3 && value.length !== 0 ? `Length of login should not be less 3 letters.` : ''
}
