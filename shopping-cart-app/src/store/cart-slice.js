import {createSlice} from "@reduxjs/toolkit";
import {uiActions} from "./ui-slice";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        itemsList: [],
        totalQuantity: 0,
        showCart: false,
        changed: false
    },
    reducers: {
        addToCart(state, action) {
            state.changed = true;
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
            state.changed = true;
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
        },
        replaceData(state, action) {
            state.itemsList = action.payload.itemsList;
            state.totalQuantity = action.payload.totalQuantity;
        }
    }
});

export const cartActions = cartSlice.actions;
export default cartSlice;