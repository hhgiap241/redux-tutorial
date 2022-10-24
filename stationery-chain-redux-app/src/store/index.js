import {configureStore, createSlice} from "@reduxjs/toolkit";

const counterSlice = createSlice({
    name: 'counter',
    initialState: {
        counter: 0
    },
    reducers: {
        increment(state, action) {
            state.counter++;
        },
        decrement(state, action) {
            state.counter--;
        },
        addBy(state, action) {
            state.counter += action.payload;
        }
    }
});
const store = configureStore({
    reducer: counterSlice.reducer
})
export const counterActions = counterSlice.actions;
export default store;