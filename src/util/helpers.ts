
export const makeTitleCase = (myString:string) : string => {
    const result = myString
    .trim()
    .split(/\s+/)
    .map(
        (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    )
    .join(" ")

    return result;
}