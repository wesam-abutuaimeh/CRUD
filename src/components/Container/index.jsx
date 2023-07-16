import { PureComponent } from "react";
import "./style.css"

class Container extends PureComponent {
    render() {
        return (<div className="container">{this.props.children}</div>);
    }
}

export default Container;
