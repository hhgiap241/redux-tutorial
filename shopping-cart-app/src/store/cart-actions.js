import {uiActions} from "./ui-slice";
import {cartActions} from "./cart-slice";

export const fetchData = () => {
    return async (dispatch) => {
        const fetchHandler = async () => {
            const res = await fetch("https://redux-http-example-34915-default-rtdb.asia-southeast1.firebasedatabase.app/cart.json");
            const data = await res.json();
            return data;
        }
        try {
            const cartData = await fetchHandler();
            dispatch(cartActions.replaceData(cartData));
        } catch (error) {
            dispatch(uiActions.showNotification({
                open: true,
                message: "Fetching data failed!",
                type: "error"
            }));
        }
    }
}


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