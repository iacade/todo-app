import { useReducer, useState } from "react";
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

    const className = classes({
        "app": true,
        [`app--${ theme }`]: true
    });

    return (
        <AppContext.Provider value={ contextProvider }>
            <Source />
            <main className={ className }>
                <Widget />
            </main>
        </AppContext.Provider>
    );
}

export default App;
