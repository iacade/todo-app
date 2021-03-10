import { useContext, useState } from "react";
import Checkbox from "../form/Checkbox";
import Input from "../form/Input";
import AppContext from "../../context/AppContext";

function Field() {
    const [ text, setText ] = useState("");
    const [ checked, setChecked ] = useState(false);
    const { dispatch } = useContext(AppContext);
    
    const handleKeyDown = ({ code, keyCode }) => {
        if ((code === "Enter" || keyCode === 13) && text) {
            dispatch({
                type: "push",
                text: text,
                done: checked
            });
            setText("");
            setChecked(false);
        }
    };

    return (
        <div className="todo-item field">
            <div className="todo-item__checkbox">
                <Checkbox checked={ checked } onChange={ ({ target: { checked }}) => setChecked(checked) } />
            </div>
            <div className="todo-item__value">
                <Input placeholder="Create a new todo..."
                    value={ text }
                    onChange={ ({ target: { value } }) => setText(value) }
                    onKeyDown={ handleKeyDown } />
            </div>
        </div>
    );
}

export default Field;
