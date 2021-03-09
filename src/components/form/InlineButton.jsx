import { classes } from "../../helpers/classes";

function InlineButton(props) {
    const className = classes({
        "btn btn-inline": true,
        "btn-inline--active": props.active,
        [props.className]: props.className
    });
    
    return (
        <button className={ className } onClick={ props.onClick }>
            { props.text }
        </button>
    );
}

export default InlineButton;
