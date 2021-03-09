import Field from "./Field";
import Header from "./Header";
import List from "./List";

function Widget() {
    return (
        <article className="widget">
            <Header />
            <Field />
            <List />
        </article>
    );
}

export default Widget;
