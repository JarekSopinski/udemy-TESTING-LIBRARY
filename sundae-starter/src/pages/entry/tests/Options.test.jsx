import { render, screen } from '../../../test-utils/testing-library-utils';
import userEvent from '@testing-library/user-event';

import Options from '../Options';

test('displays image for each scoop option from server', async () => {
    render(<Options optionType='scoops' />);

    // find images
    const scoopImages = await screen.findAllByRole('img', { name: /scoop$/i });
    expect(scoopImages).toHaveLength(2);

    // confirm alt text of images
    const altText = scoopImages.map(element => element.alt);
    expect(altText).toEqual(['Chocolate scoop', 'Vanilla scoop']);
});

test('displays image for each topping option from server', async () => {
    render(<Options optionType='toppings' />);

    // find images
    const toppingsImages = await screen.findAllByRole('img', { name: /topping$/i });
    expect(toppingsImages).toHaveLength(3);

    // confirm alt text of images
    const altText = toppingsImages.map(element => element.alt);
    expect(altText).toEqual(['Cherries topping', 'M&Ms topping', 'Hot fudge topping']);
});

test('no scoops subtotal update for invalid scoops count', async () => {
    const user = userEvent.setup();
    render(<Options optionType='scoops' />);

    // wait for vanilla input to appear after server call
    const vanillaInput = await screen.findByRole('spinbutton', {
        name: 'Vanilla'
    });

    // find the scoops subtotal, which starts at 0
    const scoopsSubtotal = screen.getByText('Scoops total: $', {
        exact: false
    });

    // clear the input
    await user.clear(vanillaInput);

    // .type() will type one character at a time
    await user.type(vanillaInput, '2.5');

    // make sure scoops subtotal hasn't updated
    expect(scoopsSubtotal).toHaveTextContent('0.00');
});