import { id } from "../helpers/generate";
import ActionsStore from "../models/ActionsStore";
import TodoItem from "../models/TodoItem";

const actionsStore = new ActionsStore();
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
        items: items.map(({ text, done, identifier }) =>
            new TodoItem(text, done || false, identifier))
    }, lastId ];
}

function saveState(state) {
    window.localStorage.setItem("items", JSON.stringify(state.items));

    return state;
}

function reducer(state, action) {
    switch (action.type) {
        case "push":
            state.items.unshift(createTodoItem(
                action.text, action.done));
            actionsStore.push({ type: "push" });
            break;
        case "pop":
            const index = state.items.findIndex(item =>
                item.identifier === action.identifier);
            const [ removed ] = state.items.splice(index, 1);
            actionsStore.push({ type: "pop", item: removed, index: index });
            break;
        case "toggle":
            state.items.find(item =>
                item.identifier === action.identifier)?.toggle();
            actionsStore.push({ type: "toggle", identifier: action.identifier });
            break;
        case "remove":
            actionsStore.push({ type: "remove", items: state.items });
            state.items = state.items.filter(action.filter);
            break;
        case "sort":
            actionsStore.push({ type: "sort", items: state.items });
            state.items = action.items;
            break;
        case "undo":
            actionsStore.undo(state);
            break;
        default:
            return state;
    }

    return saveState({ items: state.items });
}

export {
    initial,
    reducer
};
