export const formDataToObject = (formData: FormData) => {
    let formObject: any = {}

    for (const [key, value] of Object.entries(formData)) {
        formObject[key] = value
    }

    return formObject
}

export function getEnumValueByIndex<T extends object>(enumObj: T, index: number): T[keyof T] | undefined {
    const enumValues = Object.values(enumObj) as Array<T[keyof T]>;
    const enumValue = enumValues[index];
    return enumValue;
}