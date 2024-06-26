import { useState } from "react";
import { Col, Form, Row } from "react-bootstrap";

import { useOrderDetails } from "../../contexts/OrderDetails";

// eslint-disable-next-line react/prop-types
const ScoopOption = ({ name, imagePath }) => {
    const { updateItemCount } = useOrderDetails();

    const [isValid, setValid] = useState(true);

    const handleChange = e => {
        const currentValue = e.target.value;

        // make sure we're using a number and not a string to validate
        const currentValueFloat = parseFloat(currentValue);
        const valueIsValid =
            0 <= currentValueFloat &&
            currentValueFloat <= 10 &&
            Math.floor(currentValueFloat) === currentValueFloat;

        setValid(valueIsValid);

        const newValue = valueIsValid ? parseInt(currentValue) : 0;
        updateItemCount(name, newValue, 'scoops')
    };

    return (
        <Col xs={12} sm={6} md={4} lg={3} style={{ textAlign: 'center' }}>
            <img
                src={`http://localhost:3030/${imagePath}`}
                alt={`${name} scoop`}
                style={{ width: '75%' }}
            />
            <Form.Group
                controlId={`${name}-count`}
                as={Row}
                style={{ marginTop: '10px' }}
            >
                <Form.Label
                    column
                    xs='6'
                    style={{ textAlign: 'right' }}
                >
                    {name}
                </Form.Label>
                <Col
                    xs='5'
                    style={{ textAlign: 'left' }}
                >
                    <Form.Control
                        type="number"
                        defaultValue={0}
                        isInvalid={!isValid}
                        onChange={handleChange}
                    />
                </Col>
            </Form.Group>
        </Col>
    );
};

export default ScoopOption;