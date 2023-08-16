export const formDataToObject = (formData: FormData) => {
    let formObject: any = {}

    for (const [key, value] of Object.entries(formData)) {
        formObject[key] = value
    }

    return formObject
}