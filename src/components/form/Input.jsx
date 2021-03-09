import { useState } from "react";
import { classes } from "../../helpers/classes";

function Input(props) {
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
        "x-input--not-empty": realValue
    });

    return (
        <label className={ className }>
            <span className="x-input__placeholder">{ props.placeholder || props.name }</span>
            <input type="text"
                name={ props.name }
                value={ realValue }
                onChange={ handleChange }
                onKeyDown={ props.onKeyDown } />
        </label>
    );
}

export default Input;
