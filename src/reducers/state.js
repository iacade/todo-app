import { id } from "../helpers/generate";
import TodoItem from "../models/TodoItem";

const [ initial, lastId ] = fetchState();
const idGenerator = id(lastId + 1);

function createTodoItem(text, done) {
    return new TodoItem(text, done, idGenerator.next().value + "");
}

function fetchState() {
    let items = [];
    let lastId = 1;

    try {
        items = JSON.parse(window.localStorage.getItem("items")) || [];
        lastId = Math.max(...items.map(({ identifier }) => +identifier), 0);
    }
    catch (err) {
        window.localStorage.removeItem("items");
    }

    return [ {
        items: items.map(({ text, done, identifier }) => new TodoItem(text, done || false, identifier))
    }, lastId ];
}

function saveState(state) {
    window.localStorage.setItem("items", JSON.stringify(state.items));
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

    const newState = {
        items: state.items
    };
    saveState(newState);

    return newState;
}

export {
    initial,
    reducer
};
