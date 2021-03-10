export default class ActionsStore {
    actions = []
    top = 0

    push(action) {
        this.actions.push(action);

        return this;
    }

    undo(state) {
        if (!this.actions.length) {
            return;
        }

        const action = this.actions.pop();

        switch (action.type) {
            case "push":
                state.items.shift();
                break;
            case "pop":
                state.items.splice(action.index, 0, action.item);
                break;
            case "toggle":
                state.items.find(item =>
                    item.identifier === action.identifier)
                    .toggle();
                break;
            case "remove":
            case "sort":
                state.items = action.items;
                break;
            default:
                break;
        }
    }
}
