import React, { Component } from 'react';
import axios from 'axios';
import Container from '../../components/Container';
import { Navigate } from 'react-router-dom';

class CreateStorePage extends Component {
    state = {

        name: '',
        cities: '',
        isLoading: false,
        isSubmitted: false,
        error: null,

    };

    handleInputChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    };

    handleSubmit = async (event) => {
        event.preventDefault();

        const { id, name, cities } = this.state;
        const data = { id, name, cities };

        this.setState({ isLoading: true, error: null });

        try {
            await axios.post('https://some-data.onrender.com/stores', data);
            this.setState({ isLoading: false, isSubmitted: true });
        } catch (error) {
            this.setState({ isLoading: false, error: error.message });
        }

    };


    render() {
        const { name, cities, isLoading, error } = this.state;
        return (
            <div>
                <Container>
                    <h1>Create Store</h1>
                    <form onSubmit={this.handleSubmit}>
                        <label>
                            Name:
                            <input
                                type="text"
                                name="name"
                                value={name}
                                onChange={this.handleInputChange}
                            />
                        </label>
                        <label>
                            Cities:
                            <input
                                type="text"
                                name="cities"
                                value={cities}
                                onChange={this.handleInputChange}
                            />
                        </label>
                        <button type="submit" disabled={isLoading}>
                            {isLoading ? 'Submitting...' : 'Submit'}
                        </button>
                    </form>
                    {error && <p>Error: {error}</p>}
                    {this.state.isSubmitted && <Navigate to="/stores/all"></Navigate>}
                </Container>
            </div>
        );
    }
}

export default CreateStorePage;
