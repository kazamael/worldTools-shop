export const cart = (state = [], action) => { // (1)
    switch (action.type) { // (2)
        case 'FETCH_CART_SUCCESS':
            return [
                ...action.cart
            ]
        default:
            return state
    }
}