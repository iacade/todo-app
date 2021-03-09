import { id } from "../helpers/generate";
import TodoItem from "../models/TodoItem";

const idGenerator = id();
const initial = {
    items: [
        new TodoItem("Complete online JavaScript course", true, idGenerator.next().value),
        new TodoItem("Jog around the park 3x", false, idGenerator.next().value),
        new TodoItem("10 minutes meditaion", false, idGenerator.next().value),
        new TodoItem("Read for 1 hour", false, idGenerator.next().value),
        new TodoItem("Pick up groceries", false, idGenerator.next().value),
        new TodoItem("Complete Todo App on Frontend Mentor", false, idGenerator.next().value),
    ]
};

function reducer(state, action) {
    switch (action.type) {
        case "push":
            state.items.unshift(new TodoItem(action.text, action.done, idGenerator.next().value));
            break;
        case "pop":
            state.items.splice(state.items.findIndex(
                item => item.identifier === action.identifier), 1);
            break;
        case "toggle":
            state.items.find(item => item.identifier === action.identifier)?.toggle();
            break;
        case "remove":
            state.items = state.items.filter(action.filter);
            break;
        default:
            return state;
    }

    return {
        items: state.items
    };
}

export {
    initial,
    reducer
};
