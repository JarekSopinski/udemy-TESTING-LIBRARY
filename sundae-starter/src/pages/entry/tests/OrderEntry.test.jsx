import { http, HttpResponse } from 'msw';
import { server } from '../../../mocks/server';
import userEvent from '@testing-library/user-event';

import { render, screen } from "../../../test-utils/testing-library-utils";
import OrderEntry from "../OrderEntry";

test('handles error for scoops and toppings routes', async () => {

    // Override default handlers with error responses
    server.resetHandlers(
        http.get('http://localhost:3030/scoops', () => {
            return new HttpResponse(null, { status: 500 })
        }),
        http.get('http://localhost:3030/toppings', () => {
            return new HttpResponse(null, { status: 500 })
        }),
    );

    render(<OrderEntry />);

    const alerts = await screen.findAllByRole('alert');

    expect(alerts).toHaveLength(2);
});

test('Order button is disabled if there are no scoops added', async () => {
    const user = userEvent.setup();

    render(<OrderEntry />);

    // order button should be disabled at first, even before options load
    const orderButton = screen.getByRole('button', {
        name: /order sundae/i
    });
    expect(orderButton).toBeDisabled();

    // expect button to be enabled after adding scoop
    const vanillaInput = await screen.findByRole('spinbutton', {
        name: 'Vanilla'
    });
    await user.clear(vanillaInput);
    await user.type(vanillaInput, '1');
    expect(orderButton).toBeEnabled();

    // expect button to be disabled again after removing scoop
    await user.clear(vanillaInput);
    await user.type(vanillaInput, '0');
    expect(orderButton).toBeDisabled();
});