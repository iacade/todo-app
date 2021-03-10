import { useContext } from "react";
import AppContext from "../../context/AppContext";
import Use from "../svg/Use";

function Header() {
    const { theme, toggle } = useContext(AppContext);
    const icon = theme === "dark" ? "sun" : "moon";

    return (
        <header className="flex align-between valign-center">
            <h1 className="title">TODO</h1>
            <button className="btn-ico btn" type="button" onClick={ toggle }>
                <span className="btn-ico__mask"></span>
                <div className="btn-ico__content">
                    <Use icon={ icon } width="26" height="26" />
                </div>
            </button>
        </header>
    );
}

export default Header;
