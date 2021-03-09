import { useContext, useState } from "react";
import AppContext from "../../context/AppContext";
import InlineButton from "../form/InlineButton";
import Item from "./Item";

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

function List(props) {
    const [ filter, setFilter ] = useState(props.filter || filters.all.name);
    const {
        state,
        dispatch
    } = useContext(AppContext);
    const removeCompleted = () => dispatch({
        type: "remove",
        filter: item => !item.done
    });
    const filteredItems = filters[filter].filter(state.items);
    let leftItemsText = "No items";

    if (filteredItems.length === 1) {
        leftItemsText = "1 item left";
    }
    else if (filteredItems.length > 1) {
        leftItemsText = `${ filteredItems.length } items left`;
    }

    return (
        <div className="list">
            <ol>
                { filteredItems.map(item => (
                    <Item key={ item.identifier } { ...item } />
                )) }
            </ol>
            <div className="list__footer flex align-between valign-center">
                <span>{ leftItemsText }</span>
                <div className="flex">
                    { Object.values(filters).map(({ text, name }) => (
                        <InlineButton key={ name }
                            className="mr-4"
                            active={ filter === name }
                            text={ text }
                            onClick={ () => setFilter(name) } />
                    )) }
                </div>
                <InlineButton text="Clear Completed" onClick={ removeCompleted } />
            </div>
        </div>
    );
}

export default List;
