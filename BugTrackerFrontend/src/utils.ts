export const search = <T extends object, K extends keyof T>(items: T[], searchParams: string[], query: string) => {
    return items.filter((item) => {
        return searchParams.some((newItem) => {
            return (
                (item[newItem as K] as string)
                    .toString()
                    .toLowerCase()
                    .indexOf(query.toLocaleLowerCase()) > -1
            )
        })
    })
}