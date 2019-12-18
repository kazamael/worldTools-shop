export const product = (state = [], action) => { // (1)
    switch (action.type) { // (2)
        case 'FETCH_PRODUCT_SUCCESS':
            return [
                ...action.product
            ]
        default:
            return state
    }
}