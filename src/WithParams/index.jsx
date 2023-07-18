import { useParams } from 'react-router-dom';

const WithParams = (WrappedComponent) => {
    return (props) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const params = useParams();
        return <WrappedComponent {...props} params={params} />;
    };
};

export default WithParams;
