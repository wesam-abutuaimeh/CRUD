import { Component } from "react";
import axios from "axios";
import Table from "../../components/Table";
import STORES_COLUMNS from "../../constants/stores"
import { Navigate } from "react-router-dom";
import WithParams from "../../WithParams";
import "./style.css";

class HomePage extends Component {
    state = {
        allStores: [],
        isLoading: true,
        rowId: null,
        isNavgate: false,
        isCreating: false,
    }

    handleDelete = async (id) => {
        console.log(id, 'is deleted');
        try {
            axios.delete(`https://some-data.onrender.com/stores/${id}`);
        } catch (err) {
            throw new Error("Error While Deleting the store according store id!")
        }
    }

    handleEdit = (id) => {
        console.log(id, 'is edited');
        this.setState({ editId: id });
    };

    handleView = (row) => {
        console.log(this.state.rowId, 'is viewed');
        this.setState({ rowId: row.id, isNavgate: true, })
    };

    componentDidMount() {
        axios.get("https://some-data.onrender.com/stores")
            .then((response) => response.data)
            .then((data) => { this.setState({ allStores: data, isLoading: false, }) });
    }

    render() {
        return <>
            <Table columns={STORES_COLUMNS(this.state.allStores, this.handleEdit, this.handleDelete)} data={this.state.allStores}
                onRowClick={this.handleView} />
            {this.state.isLoading && <h1> Loading ... </h1>}
            {this.state.isNavgate && <Navigate to={`/stores/${this.state.rowId}`} replace={true}></Navigate>}
            <button className="create__btn" onClick={() => this.setState({ isCreating: true })}>
                Create Post
            </button>
            {this.state.isCreating && <Navigate to={"/create"} replace={true}></Navigate>}
        </>
    }
}

export default WithParams(HomePage);
