import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '../../components/Container';
import { API_URL } from '../../config/api';
import useAPI from '../../hooks/useAPI';
import './style.css';

function CreateStorePage() {
    const [name, setName] = useState('');
    const [cities, setCities] = useState('');
    const navigate = useNavigate();
    const { data, isLoading, post } = useAPI(API_URL);
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        switch (name) {
            case "name":
                setName(value)
                break;
            case "cities":
                setCities(value);
                break;
            default:
                break;
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = { name, cities };
        if (!name.trim() || !cities.trim()) return;
        post(data);
        navigate('/stores/all');
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
                {data.error && <p className='error__message'>Error: {data.error}</p>}
            </Container>
        </div>
    );
}

export default CreateStorePage;
