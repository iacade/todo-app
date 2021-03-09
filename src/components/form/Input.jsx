import { useState } from "react";
import { classes } from "../../helpers/classes";

function Input(props) {
    const [ focused, setFocused ] = useState(false);
    const [ value, setValue ] = useState(props.defaultValue || "");
    let realValue = null;
    let handleChange = null;

    if ("value" in props) {
        // controlled by parent
        realValue = props.value;
        handleChange = props.onChange;
    }
    else {
        // controlled by itself
        realValue = value;
        handleChange = ({ target: { value }}) => setValue(value);
    }

    const className = classes({
        "x-input": true,
        "x-input--focus": focused,
        "x-input--not-empty": realValue
    });

    return (
        <label className={ className }>
            <span className="x-input__placeholder">{ props.placeholder || props.name }</span>
            <span className="x-input__border"></span>
            <input type="text"
                name={ props.name }
                value={ realValue }
                onFocus={ () => setFocused(true) }
                onBlur={ () => setFocused(false) }
                onChange={ handleChange }
                onKeyDown={ props.onKeyDown } />
        </label>
    );
}

export default Input;
