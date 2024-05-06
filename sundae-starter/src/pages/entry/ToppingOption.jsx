import { Col, Form } from "react-bootstrap";
import { useOrderDetails } from "../../contexts/OrderDetails";

// eslint-disable-next-line react/prop-types
const ToppingOption = ({ name, imagePath }) => {

    const { updateItemCount } = useOrderDetails();

    const handleChange = e => {
        updateItemCount(name, e.target.checked ? 1 : 0, 'toppings');
    };

    return (
        <Col xs={12} sm={6} md={4} lg={3} style={{ textAlign: 'center' }}>
            <img
                src={`http://localhost:3030/${imagePath}`}
                alt={`${name} topping`}
                style={{ width: '75%' }}
            />
            <Form.Group controlId={`${name}-topping-checkbox`}>
                <Form.Check
                    type="checkbox"
                    label={name}
                    onChange={handleChange}
                />
            </Form.Group>
        </Col>
    );
};

export default ToppingOption;