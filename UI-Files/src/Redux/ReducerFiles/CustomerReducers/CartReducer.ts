import { ADD_ITEM_TO_CART, REMOVE_ITEM_FROM_CART, REMOVE_ITEM_TYPE_FROM_CART, AddItemToCartAction, RemoveItemFromCartAction, RemoveItemTypeFromCartAction } from '../../ActionFiles/CustomerActions';
import { OrderItem, VendorInfo } from '../../InterfaceFiles/types'

export interface CartState {
    items?: OrderItem[] | null,
    price?: number,
}

let cartState: CartState = {
    items: null,
    price: 0,
}

type CartActions = AddItemToCartAction | RemoveItemFromCartAction | RemoveItemTypeFromCartAction
export const Checkout = (state = cartState, action:  CartActions): CartState => {
    switch(action.type) {

        // Add or update item in cart
        case ADD_ITEM_TO_CART:
            let itemIndex = -1;
            if (state.items) {
                itemIndex = state.items.findIndex(item => item.id == action.payload.id)
            }

            // update existing cart item with incremented quantity
            if (itemIndex != -1) {
                const newCart = state.items && [...state.items]
                newCart && (newCart[itemIndex].quantity += 1)

                return {
                    ...state,
                    items: newCart,
                    price: state.price + action.payload.price
                }
            } else {
                if (state.items) {
                    // add new item to existing cart
                    return {
                        ...state,
                        items: state.items && [
                            ...state.items,
                            {
                                ...action.payload,
                                quantity: 1
                            }
                        ],
                        price: state.price + action.payload.price
                    }
                // add new item to empty cart
                } else return {
                    ...state,
                    items: [{...action.payload, quantity: 1}],
                    price: action.payload.price
                }
            }

        // Removes one of item type from cart
        case REMOVE_ITEM_FROM_CART:
            return {
                ...state,
                items: state.items && state.items.map(item => {
                    if (item.id == action.payload.id) {
                        return {
                            ...item,
                            quantity: item.quantity - 1
                        }
                    }
                    return { ...item }
                }).filter(item => item.quantity > 0),
                price: state.price - action.payload.price
            };

        // removes all items with specified type from cart
        case REMOVE_ITEM_TYPE_FROM_CART:
            let removeIndex = -1;
            if (state.items) {
                removeIndex = state.items.findIndex(item => item.id == action.payload.id)
            }

            // update existing cart item with incremented quantity
            if (removeIndex != -1) {
                const removePrice = state.items[removeIndex].quantity * action.payload.price;
                return {
                    ...state,
                    items: state.items && state.items.filter(item => item.id != action.payload.id),
                    price: state.price - removePrice
                }
            } else return {
                ...state
            }

        default:
            return state
    }
};
