import { id } from "../helpers/generate";
import TodoItem from "../models/TodoItem";

const idGenerator = id();
const initial = {
    items: [
        createTodoItem("Complete online JavaScript course", true),
        createTodoItem("Jog around the park 3x", false),
        createTodoItem("10 minutes meditaion", false),
        createTodoItem("Read for 1 hour", false),
        createTodoItem("Pick up groceries", false),
        createTodoItem("Complete Todo App on Frontend Mentor", false),
    ]
};

function createTodoItem(text, done) {
    return new TodoItem(text, done, idGenerator.next().value + "");
}

function reducer(state, action) {
    switch (action.type) {
        case "push":
            state.items.unshift(createTodoItem(action.text, action.done));
            break;
        case "pop":
            const index = state.items.findIndex(item => item.identifier === action.identifier);
            
            if (index !== -1) {
                state.items.splice(index, 1);
            }
            break;
        case "toggle":
            state.items.find(item => item.identifier === action.identifier)?.toggle();
            break;
        case "remove":
            state.items = state.items.filter(action.filter);
            break;
        case "sort":
            state.items = action.items;
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
