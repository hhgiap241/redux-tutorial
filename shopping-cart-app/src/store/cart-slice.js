import {createSlice} from "@reduxjs/toolkit";
import {uiActions} from "./ui-slice";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        itemsList: [],
        totalQuantity: 0,
        showCart: false
    },
    reducers: {
        addToCart(state, action) {
            const newItem = action.payload;
            const existingItem = state.itemsList.find(item => item.id === newItem.id);
            if (!existingItem) {
                state.itemsList.push({
                    id: newItem.id,
                    name: newItem.name,
                    price: newItem.price,
                    quantity: 1,
                    totalPrice: newItem.price
                });
                state.totalQuantity++;
            } else {
                existingItem.quantity++;
                existingItem.totalPrice += newItem.price;
            }
        },
        removeFromCart(state, action) {
            const id = action.payload.id;
            console.log(id);
            const existingItem = state.itemsList.find(item => item.id === id);
            console.log(state.itemsList);
            if (existingItem.quantity === 1) {
                state.itemsList = state.itemsList.filter(item => item.id !== id);
                state.totalQuantity--;
            } else {
                existingItem.quantity--;
                existingItem.totalPrice -= existingItem.price;
            }
        },
        setShowCart(state) {
            state.showCart = !state.showCart;
        }
    }
});
export const sendCartData = (cart) => {
    return async (dispatch) => {
        // send state as sending request
        dispatch(uiActions.showNotification({
            open: true,
            message: "Sending request...",
            type: "warning"
        }));
        const sendRequest = async () => {
            const res = await fetch("https://redux-http-example-34915-default-rtdb.asia-southeast1.firebasedatabase.app/cart.json", {
                method: "PUT",
                body: JSON.stringify(cart),
            });
            const data = await res.json();
            console.log(data);
            // send state as request is sent
            dispatch(uiActions.showNotification({
                open: true,
                message: "Sent request to database successfully!",
                type: "success"
            }));
        };
        try {
            await sendRequest();
        } catch (error) {
            dispatch(uiActions.showNotification({
                open: true,
                message: "Sent request to database failed!",
                type: "error"
            }));
        }
    }
}
export const cartActions = cartSlice.actions;
export default cartSlice;