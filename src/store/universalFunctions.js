export function dispatchAction(type, item) {
    return {
        type, item,
    }
}

export function getIndexById(arr, id) {
    return arr.findIndex(x => x.id === id)
}

export function getDate(date) {
    const convertedDate = new Date(date)
    return ('0' + convertedDate.getDate()).slice(-2) + '.' + ('0' + (convertedDate.getMonth() + 1)).slice(-2)
        + '.' + convertedDate.getFullYear()
}

export function getFullDate(date) {
    const startDate = new Date(date)
    const hours = new Date(startDate).getHours()
    startDate.setHours(hours + 12 - hours)
    return new Date(startDate).getTime()
}

export function getSum(sum) {
    return Math.round((sum)).toLocaleString('ru')
}