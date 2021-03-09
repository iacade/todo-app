import { useContext } from "react";
import AppContext from "../../context/AppContext";
import { classes } from "../../helpers/classes";
import Checkbox from "../form/Checkbox";
import Use from "../svg/Use";

function Item(props) {
    const { dispatch } = useContext(AppContext);
    const handleChange = () => dispatch({
        type: "toggle",
        identifier: props.identifier
    });
    const handleRemove = () => dispatch({
        type: "pop",
        identifier: props.identifier
    });

    const className = classes({
        "todo-item": true,
        "todo-item--done": props.done
    });

    return (
        <div className={ className }>
            <div className="todo-item__checkbox">
                <Checkbox checked={ props.done } onChange={ handleChange } />
            </div>
            <div className="todo-item__value flex align-between">
                <p className="flex valign-center">
                    <span className="todo-item__line-through"></span>
                    <span>{ props.text }</span>
                </p>
                <button className="btn btn-ico btn-close" onClick={ handleRemove }>
                    <Use icon="close" width="18" height="18" />
                </button>
            </div>
        </div>
    );
}

export default Item;
