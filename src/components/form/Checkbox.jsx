import { useState } from "react";
import { classes } from "../../helpers/classes";
import Use from "../svg/Use";

function Checkbox(props) {
    const [ focused, setFocused ] = useState(false);
    const [ checked, setChecked ] = useState(props.defaultChecked || false);
    let realChecked = null;
    let handleChange = null;

    if ("checked" in props) {
        // controlled by parent
        realChecked = props.checked;
        handleChange = props.onChange;
    }
    else {
        // controlled by itself
        realChecked = checked;
        handleChange = ({ target: { checked }}) => setChecked(checked);
    }

    const className = classes({
        "x-checkbox": true,
        "x-checkbox--focus": focused,
        "x-checkbox--checked": realChecked
    });

    return (
        <label className={ className }>
            <span className="x-checkbox__mask"></span>
            <span className="x-checkbox__mark">
                <Use icon="check" width="11" height="9" />
            </span>
            <input type="checkbox"
                className="visually-hidden"
                name={ props.name }
                checked={ realChecked }
                onChange={ handleChange }
                onFocus={ () => setFocused(true) }
                onBlur={ () => setFocused(false) } />
        </label>
    );
}

export default Checkbox;
