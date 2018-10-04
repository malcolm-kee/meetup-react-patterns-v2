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

const getComponentName = Component => Component.displayName || Component.name || 'Component';

const withNumberStepper = (Component, initialCount = 0) => {
  class WrappedComponent extends React.Component {
    render() {
      const { initialCount: propsInitialCount, onChange, ...restProps } = this.props;
      return (
        <NumberStepper initialCount={propsInitialCount || initialCount} onChange={onChange}>
          {stepperProps => <Component {...stepperProps} {...restProps} />}
        </NumberStepper>
      );
    }
  }

  WrappedComponent.displayName = `withNumberStepper(${getComponentName(Component)})`;

  return WrappedComponent;
};

class NumberControlContainer extends React.Component {
  render() {
    const props = this.props;
    return (
      <div>
        <button onClick={props.decrement}>-</button>
        <span onClick={props.onClick}> {props.currentNumber} </span>
        <button onClick={props.increment}>+</button>
      </div>
    );
  }
}

const NumberControl = withNumberStepper(NumberControlContainer);

class MultiStepFormContainer extends React.Component {
  render() {
    const props = this.props;
    return (
      <div>
        {props.currentNumber === 1 && (
          <div>
            Step 1
            <div>
              <button onClick={props.increment}>Next</button>
            </div>
          </div>
        )}
        {props.currentNumber === 2 && (
          <div>
            Step 2
            <div>
              <button onClick={props.decrement}>Back</button>
              <button onClick={props.increment}>Next</button>
            </div>
          </div>
        )}
        {props.currentNumber === 3 && (
          <div>
            Step 3
            <div>
              <button onClick={props.decrement}>Back</button>
              <button onClick={props.onSubmit}>Finish</button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

const MultiStepForm = withNumberStepper(MultiStepFormContainer, 1);

export default App;
