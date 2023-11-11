import { Alert } from "react-bootstrap";

// eslint-disable-next-line react/prop-types
const AlertBanner = ({ message, variant }) => {

    const alertMessage = message || 'An unexpected error occurred.';
    const alertVariant = variant || 'danger';

    return <Alert variant={alertVariant} style={{ backgroundColor: 'red' }}>
        {alertMessage}
    </Alert>;
};

export default AlertBanner;