import { Component } from "react";
import "./style.css";
import axios from "axios";
import WithParams from "../../WithParams";

class HomePage extends Component {

    state = {
        store: {}, isLoading: true,
    }
    componentDidMount() {
        axios.get(`https://some-data.onrender.com/stores/${this.props.params.id}`)
            .then((response) => response.data)
            .then((data) => { this.setState({ store: data, isLoading: false, }) });
    }

    render() {
        console.log(this.props.params)
        return <div>
            {!this.state.isLoading && <div className="store__details">
                <h1>Details:</h1>
                <p>Store Id :  {this.state.store.id}</p>
                <p>Store Id :  {this.state.store.id}</p>
                <p>Store Name : {this.state.store.name}</p>
                <p>Store Location : {this.state.store.cities}</p>
            </div>}
        </div>
    }
}

export default WithParams(HomePage);

