export function dispatchAction(type, item) {
    return {
        type, item,
    }
}

export function getIndexById(arr, id) {
    return arr.findIndex(x => x.id === id)
}