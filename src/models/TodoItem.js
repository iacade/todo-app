export default class TodoItem {
    text = ""
    done = false
    identifier = ""

    constructor(text, done, identifier) {
        this.text = text;
        this.done = done;
        this.identifier = identifier;
    }

    toggle() {
        this.done = !this.done;
    }
}
