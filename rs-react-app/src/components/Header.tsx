import { Component } from "react";

class Header extends Component{
    render() {
        return (
            <header className="header">
                <input type="text" className="input-search"/>
                <button type="submit" className="button-search">Search</button>
            </header>
        )
    }
}

export default Header