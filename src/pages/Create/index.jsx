import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '../../components/Container';
import { REQUESTS, apiCalls } from "../../utilities";
import { API_URL } from '../../config/api';
import './style.css';

function CreateStorePage() {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [cities, setCities] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        if (name === 'name') {
            setName(value);
        } else if (name === 'cities') {
            setCities(value);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = { name, cities };
        if (!name.trim() || !cities.trim()) {
            return;
        }
        setIsLoading(true);
        setError(null);
        try {
            await apiCalls(REQUESTS.POST, API_URL, data)
            setIsLoading(false);
            navigate('/stores/all');
        } catch (error) {
            setIsLoading(false);
            setError('Error While Create Store');
        }
    };

    return (
        <div>
            <Container>
                <h1 className='hero__text'>Create Store</h1>
                <form className='form__container' onSubmit={handleSubmit}>
                    <label>
                        Name:
                        <input className='input' type='text' name='name' value={name} onChange={handleInputChange} />
                    </label>
                    <label>
                        Cities:
                        <input className='input' type='text' name='cities' value={cities} onChange={handleInputChange} />
                    </label>
                    <button type='submit' disabled={isLoading}> {isLoading ? 'Submitting...' : 'Submit'} </button>
                </form>
                {error && <p className='error__message'>Error: {error}</p>}
            </Container>
        </div>
    );
}

export default CreateStorePage;
