import { useContext, useEffect, useState } from "react";
import Checkbox from "../form/Checkbox";
import Use from "../svg/Use";
import AppContext from "../../context/AppContext";
import { classes } from "../../helpers/classes";

const DRAG_START_DELAY = 200;

function Item(props) {
    const [ dragDelayId, setDragDelayId ] = useState(0);
    const { dispatch } = useContext(AppContext);
    const handleChange = () => dispatch({ type: "toggle", identifier: props.identifier });
    const handleRemove = () => dispatch({ type: "pop", identifier: props.identifier });
    const handleMouseDown = () => {
        setDragDelayId(setTimeout(() => props.onStartDrag?.(props.identifier), DRAG_START_DELAY));
    };
    useEffect(() => {
        const handleMouseUp = () => {
            clearTimeout(dragDelayId);
            setDragDelayId(0);
        };

        document.body.style.cursor = dragDelayId ? "move" : "default";
        document.addEventListener("mouseup", handleMouseUp);

        return () => document.removeEventListener("mouseup", handleMouseUp);
    }, [ dragDelayId ]);

    const className = classes({
        "todo-item": true,
        "todo-item--done": props.done,
        "todo-item--stub": props.isStub
    });

    return (
        <div data-id={ props.identifier }
            className={ className }
            onMouseDown={ handleMouseDown }>
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
