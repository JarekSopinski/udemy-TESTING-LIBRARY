import React from 'react';
import './App.css';

function App() {
  const [buttonColor, setButtonColor] = React.useState('red');
  const [disabled, setDisabled] = React.useState(false);
  const nextColor = buttonColor === 'red' ? 'blue' : 'red';

  return (
    <div>
      <button
        className={buttonColor}
        onClick={() => setButtonColor(nextColor)}
        disabled={disabled}
      >
        Change to {nextColor}
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
