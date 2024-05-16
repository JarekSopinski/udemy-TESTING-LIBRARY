/* eslint-disable react/prop-types */
import axios from 'axios';
import { useEffect, useState, Fragment, useMemo } from 'react';
import { Row } from 'react-bootstrap';
import ScoopOption from './ScoopOption';
import ToppingOption from './ToppingOption';
import AlertBanner from '../common/AlertBanner';
import { PRICE_PER_ITEM } from '../../constants';
import { formatCurrency } from '../../utilities';
import { useOrderDetails } from '../../contexts/OrderDetails';

const Options = ({ optionType }) => {
    // optionType is 'scoops' or 'toppings'

    const [items, setItems] = useState([]);
    const [error, setError] = useState(false);
    const { totals } = useOrderDetails();

    // create an abortController to attach to network request
    const controller = useMemo(() => new AbortController(), []);

    useEffect(() => {
        axios.get(`http://localhost:3030/${optionType}`, { signal: controller.signal })
            .then(res => setItems(res.data))
            .catch((error) => {
                if (error.name !== 'CanceledError') {
                    setError(true);
                }
            });

        // abort axios call on component unmount
        return () => {
            // @FIXME
            // controller.abort();
        }
    }, [controller, optionType]);

    if (error) {
        return <AlertBanner />
    }

    const ItemComponent = optionType === 'scoops' ? ScoopOption : ToppingOption;
    const title = optionType[0].toUpperCase() + optionType.slice(1).toLowerCase();

    const optionItems = items.map(item => (
        <ItemComponent
            key={item.name}
            name={item.name}
            imagePath={item.imagePath}
        />
    ));

    return (
        <Fragment>
            <h2>{title}</h2>
            <p>{formatCurrency(PRICE_PER_ITEM[optionType])} each</p>
            <p>{title} total: {formatCurrency(totals[optionType])}</p>
            <Row>{optionItems}</Row>
        </Fragment>
    );
};

export default Options;