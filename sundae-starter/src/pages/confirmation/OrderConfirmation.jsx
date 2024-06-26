import { useEffect, useState } from "react";
import axios from "axios";
import { Button, Alert } from "react-bootstrap";
import { useOrderDetails } from "../../contexts/OrderDetails";

// eslint-disable-next-line react/prop-types
export default function OrderConfirmation({ setOrderPhase }) {

    const { resetOrder } = useOrderDetails();
    const [orderNumber, setOrderNumber] = useState(null);
    const [isError, setError] = useState(false);

    useEffect(() => {
        axios
            .post('http://localhost:3030/order')
            .then(res => {
                setOrderNumber(res.data.orderNumber);
                setError(false);
            })
            .catch(() => {
                setError(true);
            })
    }, []);

    function handleClick() {
        // clear the order details
        resetOrder();

        // send back to order page
        setOrderPhase('inProgress');
    }

    if (isError) {
        return (
            <Alert>
                An unexpected error occurred.
            </Alert>
        )
    }
    else if (orderNumber) {
        return(
            <div style={{ textAlign: 'center' }}>
                <h1>Thank You!</h1>
                <p>Your order number is {orderNumber}</p>
                <p style={{ fontSize: '25%' }}>
                    as per out terms and conditions, nothing will happen now
                </p>
                <Button onClick={handleClick}>
                    Create new order
                </Button>
            </div>
        )
    } else {
        return <div>Loading</div>;
    }

}