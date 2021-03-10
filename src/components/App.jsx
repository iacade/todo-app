import { useEffect, useReducer, useState } from "react";
import Widget from "./widget/Widget";
import AppContext from "../context/AppContext";
import Source from "./svg/Source";
import { classes } from "../helpers/classes";
import { initial, reducer } from "../reducers/state";

function App() {
    const [ state, dispatch ] = useReducer(reducer, initial);
    const [ theme, setTheme ] = useState("dark");
    const contextProvider = {
        state: state,
        dispatch: dispatch,
        theme: theme,
        toggle: () => setTheme(theme === "dark" ? "light" : "dark")
    };
    const handleKeyDown = ({ code, ctrlKey }) => {
        if (code === "KeyZ" && ctrlKey) {
            dispatch({ type: "undo" });
        }
    };

    useEffect(() => {
        document.addEventListener("keydown", handleKeyDown);

        return () => document.removeEventListener("keydown", handleKeyDown);
    });

    const className = classes({
        "app": true,
        [`app--${ theme }`]: true
    });

    return (
        <AppContext.Provider value={ contextProvider }>
            <Source />
            <main className={ className }>
                <Widget />
                <div className="app__tooltip">
                    Drag and drop to reorder list
                </div>
            </main>
        </AppContext.Provider>
    );
}

export default App;
