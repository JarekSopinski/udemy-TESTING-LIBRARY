import { logRoles } from '@testing-library/react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('buttons starts with correct color', () => {
    const { container } = render(<App />);
    logRoles(container);
    const buttonElement = screen.getByRole('button', {name: /blue/i});
    expect(buttonElement).toHaveClass('red');
});

test('buttons has correct color after click', () => {

});

test('buttons has correct text after click', () => {

});