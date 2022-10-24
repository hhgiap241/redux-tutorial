import {useSelector, useDispatch} from "react-redux";
import {counterActions} from "./store";
import './App.css';

function App() {
    const counter = useSelector((state) => state.counter);
    const dispatch = useDispatch();
    const increment = () => {
        dispatch(counterActions.increment());
    }
    const decrement = () => {
        dispatch(counterActions.decrement());
    }
    const addBy = () => {
        dispatch(counterActions.addBy(10));
    }
    return (
        <div>
            <h1>Counter</h1>
            <button onClick={decrement}>-</button>
            <h2>{counter}</h2>
            <button onClick={increment}>+</button>
            <button onClick={addBy}>Add</button>
        </div>
    );
}

export default App;
