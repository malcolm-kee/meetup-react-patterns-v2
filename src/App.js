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
        <MultiStepForm />
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

class Wizard extends React.Component {
  render() {
    const props = this.props;
    return (
      <NumberStepper initialCount={1}>
        {({ currentNumber, increment, decrement }) =>
          React.Children.map(props.children, child =>
            React.cloneElement(child, {
              currentStep: currentNumber,
              next: increment,
              prev: decrement
            })
          )
        }
      </NumberStepper>
    );
  }
}

const Step = ({ showNext, showPrev, stepNum, children, currentStep, next, prev }) =>
  stepNum === currentStep && (
    <div>
      {children}
      <div>
        {showPrev && <button onClick={prev}>Back</button>}
        {showNext && <button onClick={next}>Next</button>}
      </div>
    </div>
  );

class MultiStepForm extends React.Component {
  render() {
    return (
      <Wizard>
        <Step stepNum={1} showNext>
          Step 1
        </Step>
        <Step stepNum={2} showNext showPrev>
          Step 2
        </Step>
        <Step stepNum={3} showPrev>
          Step 3
        </Step>
      </Wizard>
    );
  }
}

export default App;
