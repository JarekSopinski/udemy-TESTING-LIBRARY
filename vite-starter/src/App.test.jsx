import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('buttons click flow', () => {
    // render App
    render(<App />);

    // find the button
    const buttonElement = screen.getByRole('button', {name: /blue/i});

    // check initial color
    expect(buttonElement).toHaveClass('red');

    // click the button
    fireEvent.click(buttonElement);

    // check button text
    expect(buttonElement).toHaveTextContent(/red/i);

    // check button color
    expect(buttonElement).toHaveClass('blue');
    // expect(buttonElement).toHaveStyle({ 'background-color': 'rgb(0, 0, 255)' });
});