import { http, HttpResponse } from 'msw';
import { server } from '../../../mocks/server';

import { render, screen } from "@testing-library/react";
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

    const alerts = await screen.findAllByRole('alert', {name: 'An unexpected error occurred.'});

    expect(alerts).toHaveLength(2);
});