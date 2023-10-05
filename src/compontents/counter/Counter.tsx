import React, {useState} from "react";
import PropTypes from "prop-types";

export default function Counter() {
    const [count, setCount] = useState(0);

    function incrementCounterParentFunction(by: number) {
        setCount(count + by)
    }

    function resetCounter(){
        setCount(0)
    }
    return (
        <>
            <span className="totalCount text-8xl p-32">{count}</span>
            <CounterButton by={1} incrementMethod={incrementCounterParentFunction}/>
            <CounterButton by={2} incrementMethod={incrementCounterParentFunction}/>
            <CounterButton by={5} incrementMethod={incrementCounterParentFunction}/>
            <button className={"counterButton text-5xl bg-sky-700  m-3 text-white py-4 px-28 rounded-full border-4 border-black"}  onClick={resetCounter}>Reset</button>
        </>
    )
}

function CounterButton({by, incrementMethod}: { by: number, incrementMethod: Function }) {

    function incrementCounterFunction() {
        incrementMethod(by);
    }

    function decrementCounterFunction() {
        incrementMethod(-by);
    }

    return (
        <div className="Counter">
            <div>
                <button
                    className="counterButton text-5xl bg-cyan-500  m-3 text-white py-4 px-12 rounded-full border-4 border-black"
                    onClick={incrementCounterFunction}>+{by}</button>
                <button
                    className="counterButton text-5xl bg-cyan-500  m-3 text-white py-4 px-12 rounded-full border-4 border-black"
                    onClick={decrementCounterFunction}>-{by}</button>
            </div>
        </div>
    )
        ;
}

Counter.propTypes = {
    by: PropTypes.number
}
Counter.defaultProps = {
    by: 5
}