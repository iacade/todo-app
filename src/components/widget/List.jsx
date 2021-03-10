import { useContext, useEffect, useRef, useState } from "react";
import InlineButton from "../form/InlineButton";
import Item from "./Item";
import AppContext from "../../context/AppContext";
import { swap } from "../../helpers/array";

const filters = {
    all: {
        name: "all",
        text: "All",
        filter: items => items
    },
    active: {
        name: "active",
        text: "Active",
        filter: items => items.filter(item => !item.done)
    },
    completed: {
        name: "completed",
        text: "Completed",
        filter: items => items.filter(item => item.done)
    }
};

function formatMessage(filter, items) {
    if (filter === filters.completed.name) {
        const completedCount = filters.completed.filter(items).length;

        if (completedCount === 1) {
            return "1 item done";
        }
        else if (completedCount > 1) {
            return `${ completedCount } items done`;
        }
    }
    else {
        const uncompletedCount = filters.active.filter(items).length;
        
        if (uncompletedCount === 1) {
            return "1 item left";
        }
        else if (uncompletedCount > 1) {
            return `${ uncompletedCount } items left`;
        }
    }

    return "No items";
}

function List(props) {
    const listRef = useRef(null);
    const [ filter, setFilter ] = useState(props.filter || filters.all.name);
    const [ dragItem, setDragItem ] = useState(null);
    const { state, dispatch } = useContext(AppContext);
    
    const filteredItems = filters[filter].filter(state.items);
    const leftItemsText = formatMessage(filter, state.items);
    
    const removeCompleted = () => dispatch({ type: "remove", filter: item => !item.done });
    const handleStartDrag = identifier => setDragItem(identifier);
    
    useEffect(() => {
        const insertStubBefore = (key) => {
            const items = state.items.slice();
            const stubIndex = items.findIndex(item => item.identifier === dragItem);
            const newIndex = items.findIndex(item => item.identifier === key);

            swap(items, stubIndex, newIndex);
            dispatch({
                type: "sort",
                items: items
            })
        };
        const handleStopDrag = () => setDragItem(null);
        const handleMove = (clientY) => {
            const items = listRef.current
                .querySelectorAll(".todo-item:not(.todo-item--stub)");

            for (const item of items) {
                const { top, bottom } = item.getBoundingClientRect();

                if (clientY >= top && clientY <= bottom) {
                    insertStubBefore(item.dataset.id);
                    break;
                }
            }
        };
        const handleMouseMove = (event) => {
            if (dragItem) {
                event.preventDefault();
                handleMove(event.clientY);
            }
        };
        const handleTouchMove = (event) => {
            if (dragItem) {
                event.preventDefault();
                handleMove(event.touches[0].clientY);
            }
        };

        document.body.style.userSelect = dragItem ? "none" : "auto";
        document.addEventListener("mouseup", handleStopDrag);
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("touchmove", handleTouchMove, { passive: false });
        document.addEventListener("touchend", handleStopDrag);
        document.addEventListener("touchcancel", handleStopDrag);
        
        return () => {
            document.removeEventListener("mouseup", handleStopDrag);
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("touchmove", handleTouchMove);
            document.removeEventListener("touchend", handleStopDrag);
            document.removeEventListener("touchcancel", handleStopDrag);
        };
    }, [ dragItem, state.items, dispatch ]);

    return (
        <>
            <div className="list">
                <ol ref={ listRef }>
                    { filteredItems.map(item => (
                        <Item isStub={ dragItem === item.identifier }
                            onStartDrag={ handleStartDrag }
                            key={ item.identifier } { ...item } />
                    )) }
                </ol>
                <div className="list__footer flex align-between valign-center">
                    <span>{ leftItemsText }</span>
                    <div className="flex hide-mobile">
                        { Object.values(filters).map(({ text, name }, idx, arr) => (
                            <InlineButton key={ name }
                                className={ idx !== arr.length - 1 ? "mr-4" : "" }
                                active={ filter === name }
                                text={ text }
                                onClick={ () => setFilter(name) } />
                        )) }
                    </div>
                    <InlineButton text="Clear Completed" onClick={ removeCompleted } />
                </div>
            </div>
            <div className="flex-mobile align-center list-mobile-footer">
                { Object.values(filters).map(({ text, name }, idx, arr) => (
                    <InlineButton key={ name }
                        className={ idx !== arr.length - 1 ? "mr-4" : "" }
                        active={ filter === name }
                        text={ text }
                        onClick={ () => setFilter(name) } />
                )) }
            </div>
        </>
    );
}

export default List;
