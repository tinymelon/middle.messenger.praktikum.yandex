export function login (value: string, submit: boolean): string {
    if (value.length === 0 && !submit) return '';
    if (value.length === 0 && submit) return 'Поле не должно быть пустым';
    if (value.length < 3 || value.length > 20) return 'Длина должна быть от 3 до 20 символов';
    if (!/\D/.test(value)) return 'Логин не может состоять только из цифр';
    if (!/^[\d_a-z-]+$/.test(value)) return 'Логин может содержать только латинские символы, цифры, дефис и нижнее подчеркивание';
    return '';
}

export function password (value: string, submit?: boolean): string {
    if (value.length === 0 && !submit) return '';
    if (value.length === 0 && submit) return 'Поле не должно быть пустым';
    if (value.length < 8 || value.length > 40) return 'Длина должна быть от 8 до 40 символов';
    if (!(/[A-Z\u0400-\u04FF]/.test(value) && /\d/.test(value))) return 'Пароль должен содержать хотя бы одну заглавную букву и цифру';
    return '';
}

export function passwordAgain (value: string, submit?: boolean, compare?: string): string {
    if (compare && compare != value) return 'Пароли не совпадают';
    return '';
}

export function phone (value: string, submit?: boolean): string {
    if (value.length === 0 && !submit) return '';
    if (value.length === 0 && submit) return 'Поле не должно быть пустым';
    if (value.length < 10 || value.length > 15) return 'Длина должна быть от 10 до 15 символов';
    if (!/^\+?\d+$/.test(value)) return 'Телефон должен состоять только из цифр и может начинаться с плюса';
    return '';
}

export function email (value: string, submit?: boolean): string {
    if (value.length === 0 && !submit) return '';
    if (value.length === 0 && submit) return 'Поле не должно быть пустым';
    if (!/^[\w-]+@[\w-]+\.[A-Za-z]{2,}/.test(value)) return 'E-mail заполнен неверно';
    return '';
}

export function name (value: string, submit?: boolean): string {
    if (value.length === 0 && !submit) return '';
    if (value.length === 0 && submit) return 'Поле не должно быть пустым';
    if (!/^[A-ZЁА-Я][a-zа-яё-]+$/.test(value)) return 'Начинать нужно с заглавной буквы, из спецсимволов допустим только дефис';
    return '';
}

export function message (value: string, submit?: boolean): string {
    if (value.length === 0 && !submit) return '';
    if (value.length === 0 && submit) return 'Поле не должно быть пустым';
    return '';
}

export function displayName (value: string, submit?: boolean): string {
    if (value.length === 0 && !submit) return '';
    if (value.length === 0 && submit) return 'Поле не должно быть пустым';
    return '';
}

export function first_name (value: string, submit?: boolean): string {
    return name(value, submit);
}

export function second_name (value: string, submit?: boolean): string {
    return name(value, submit);
}
