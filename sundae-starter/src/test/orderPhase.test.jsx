import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../App';

test('order phases for happy path', async () => {
    const user = userEvent.setup();
    // render app
    // Don't need to wrap in provider; already wrapped!

    // destructure 'unmount' from return value to use at the end of the test
    const { unmount } = render(<App />);

    // add ice cream scoops and toppings
    const vanillaInput = await screen.findByRole('spinbutton', {
        name: 'Vanilla'
    });
    await user.clear(vanillaInput);
    await user.type(vanillaInput, '1');

    const chocolateInput = screen.getByRole('spinbutton', {
        name: 'Chocolate'
    });
    await user.clear(chocolateInput);
    await user.type(chocolateInput, '2');

    const cherriesCheckbox = await screen.findByRole('checkbox', {
        name: 'Cherries'
    });
    await user.click(cherriesCheckbox);

    // find and click order summary button -> go to summary page
    const orderSummaryButton = screen.getByRole('button', {
        name: /order sundae/i,
    });
    await user.click(orderSummaryButton);

    // check summary subtotals
    const summaryHeading = screen.getByRole('heading', {
        name: 'Order Summary'
    });
    expect(summaryHeading).toBeInTheDocument();

    const scoopsHeading = screen.getByRole('heading', {
        name: 'Scoops: $6.00'
    });
    expect(scoopsHeading).toBeInTheDocument();

    const toppingsHeading = screen.getByRole('heading', {
        name: 'Toppings: $1.50'
    });
    expect(toppingsHeading).toBeInTheDocument();

    // check summary information based on order
    expect(screen.getByText('1 Vanilla')).toBeInTheDocument();
    expect(screen.getByText('2 Chocolate')).toBeInTheDocument();
    expect(screen.getByText('Cherries')).toBeInTheDocument();

    // accept terms and conditions and click button to confirm order
    const tcCheckbox = screen.getByRole('checkbox', {
        name: /terms and conditions/i
    });
    await user.click(tcCheckbox);

    const confirmOrderButton = screen.getByRole('button', {
        name: /confirm order/i,
    });
    await user.click(confirmOrderButton);

    // expect 'loading' to show
    const loading = screen.getByText(/loading/i);
    expect(loading).toBeInTheDocument();

    /**
     * check confirmation page text
     * this one is async because there is a POST request to server in between summary and confirmation pages
     */

    const thankYouHeader = await screen.findByRole('heading', {
        name: /thank you/i,
    });
    expect(thankYouHeader).toBeInTheDocument();

    // expect that loading has disappeared
    const notLoading = screen.queryByText('loading');
    expect(notLoading).not.toBeInTheDocument();

    const orderNumber = await screen.findByText(/order number/i);
    expect(orderNumber).toBeInTheDocument();

    // find and click 'new order' button on confirmation page
    const newOrderButton = screen.getByRole('button', {
        name: /new order/i
    });
    await user.click(newOrderButton);

    // check that scoops and toppings subtotal have been reset
    const scoopsTotal = await screen.findByText('Scoops total: $0.00');
    expect(scoopsTotal).toBeInTheDocument();
    const toppingsTotal = screen.getByText('Toppings total: $0.00');
    expect(toppingsTotal).toBeInTheDocument();

    // unmount the component to trigger cleanup
    unmount();
})

test('Toppings header is not on summary page if no toppings ordered', async () => {
    const user = userEvent.setup();

    // render app
    render(<App />);

    // add ice cream scoops
    const vanillaInput = await screen.findByRole('spinbutton', {
        name: 'Vanilla'
    });
    await user.clear(vanillaInput);
    await user.type(vanillaInput, '1');

    // find and click order summary button -> go to summary page
    const orderSummaryButton = screen.getByRole('button', {
        name: /order sundae/i,
    });
    await user.click(orderSummaryButton);


    // Use queryByRole to search for non-existing element - getByRole would throw an error
    const toppingsHeading = screen.queryByRole('heading', {
        name: /toppings/i
    });
    expect(toppingsHeading).not.toBeInTheDocument();
})