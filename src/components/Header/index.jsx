import { Component } from "react";
import { NavLink } from "react-router-dom";
import Container from "../Container";
import "./style.css";

class Header extends Component {
    render() {
        return (<header>
            <Container>
                <nav>
                    <div className="logo">Stores</div>
                    <ul>
                        <li><NavLink to={"/"}>Home</NavLink></li>
                        <li><NavLink to={"/stores/all"}>Stores</NavLink></li>
                        <li><NavLink to={"/create"}>Create</NavLink></li>
                        <li><NavLink to={"/update"}>Update</NavLink></li>
                    </ul>
                </nav>
            </Container>
        </header>);
    }
}

export default Header;
