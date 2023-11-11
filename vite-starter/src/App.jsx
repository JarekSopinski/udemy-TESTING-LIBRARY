import React from 'react';
import './App.css';
import { kebabCaseToTitleCase } from './helpers';

function App() {
  const [disabled, setDisabled] = React.useState(false);
  const [buttonColor, setButtonColor] = React.useState('medium-violet-red');
  const nextColorClass = buttonColor === 'medium-violet-red' ? 'midnight-blue' : 'medium-violet-red';
  const nextColorTitleCase = kebabCaseToTitleCase(nextColorClass);
  const className = disabled ? 'grey' : buttonColor;

  return (
    <div>
      <button
        className={className}
        onClick={() => setButtonColor(nextColorClass)}
        disabled={disabled}
      >
        Change to {nextColorTitleCase}
      </button>
      <br />
      <input
        type='checkbox'
        id='disable-button-checkbox'
        defaultChecked={false}
        onChange={(e) => setDisabled(e.target.checked)}
      />
      <label htmlFor='disable-button-checkbox'>
        Disable button
      </label>
    </div>
  );
}

export default App;
