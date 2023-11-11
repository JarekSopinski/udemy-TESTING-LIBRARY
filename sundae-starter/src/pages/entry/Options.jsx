import axios from 'axios';
import { useEffect, useState } from 'react';
import { Row } from 'react-bootstrap';
import ScoopOption from './ScoopOption';

// eslint-disable-next-line react/prop-types
const Options = ({ optionType }) => {
    // optionType is 'scoops' or 'toppings'

    const [items, setItems] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:3030/${optionType}`)
            .then(res => setItems(res))
            .catch(err => console.error(err))
    }, [optionType]);

    const ItemComponent = optionType === 'scoops' ? ScoopOption : null;

    const optionItems = items.map(item => (
        <ItemComponent
            key={item.name}
            name={item.name}
            imagePath={item.imagePath}
        />
    ));

    return <Row>{optionItems}</Row>;
};

export default Options;