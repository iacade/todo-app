function Use(props) {
    const {
        icon,
        ...rest
    } = props;
    const href = `#${ icon }-icon`;

    return (
        <svg { ...rest }>
            <use href={ href } />
        </svg>
    );
}

export default Use;
