import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>Playground</p>
        </header>
        <NumberControl
          onChange={count => console.info({ count })}
          onClick={() => console.info('You click the number!')}
        />
        <MultiStepForm onSubmit={() => console.info('You submitted!')} />
      </div>
    );
  }
}

class NumberStepper extends React.Component {
  state = {
    countNumber: this.props.initialCount
  };

  handleIncrement = () =>
    this.setState(
      prevState => ({ countNumber: prevState.countNumber + 1 }),
      () => this.props.onChange(this.state.countNumber)
    );

  handleDecrement = () =>
    this.setState(
      prevState => ({ countNumber: prevState.countNumber - 1 }),
      () => this.props.onChange(this.state.countNumber)
    );

  render() {
    return this.props.children({
      currentNumber: this.state.countNumber,
      decrement: this.handleDecrement,
      increment: this.handleIncrement
    });
  }

  // set default count to 0
  static defaultProps = {
    initialCount: 0,
    onChange: () => {}
  };
}

class NumberControl extends React.Component {
  render() {
    const props = this.props;
    return (
      <NumberStepper initialCount={props.initialCount} onChange={props.onChange}>
        {({ currentNumber, increment, decrement }) => (
          <div>
            <button onClick={decrement}>-</button>
            <span onClick={props.onClick}> {currentNumber} </span>
            <button onClick={increment}>+</button>
          </div>
        )}
      </NumberStepper>
    );
  }
}

class MultiStepForm extends React.Component {
  render() {
    return (
      <NumberStepper initialCount={1}>
        {({ currentNumber, increment, decrement }) => (
          <div>
            {currentNumber === 1 && (
              <div>
                Step 1
                <div>
                  <button onClick={increment}>Next</button>
                </div>
              </div>
            )}
            {currentNumber === 2 && (
              <div>
                Step 2
                <div>
                  <button onClick={decrement}>Back</button>
                  <button onClick={increment}>Next</button>
                </div>
              </div>
            )}
            {currentNumber === 3 && (
              <div>
                Step 3
                <div>
                  <button onClick={decrement}>Back</button>
                  <button onClick={this.props.onSubmit}>Finish</button>
                </div>
              </div>
            )}
          </div>
        )}
      </NumberStepper>
    );
  }
}

export default App;
