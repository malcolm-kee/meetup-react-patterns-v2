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

class NumberControl extends React.Component {
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
    return (
      <div>
        <button onClick={this.handleDecrement}>-</button>
        <span onClick={this.props.onClick}> {this.state.countNumber} </span>
        <button onClick={this.handleIncrement}>+</button>
      </div>
    );
  }

  // set default count to 0
  static defaultProps = {
    initialCount: 0,
    onChange: () => {}
  };
}

class MultiStepForm extends React.Component {
  state = {
    stepNumber: 1
  };

  handleIncrement = () => this.setState(prevState => ({ stepNumber: prevState.stepNumber + 1 }));

  handleDecrement = () => this.setState(prevState => ({ stepNumber: prevState.stepNumber - 1 }));

  render() {
    return (
      <div>
        {this.state.stepNumber === 1 && (
          <div>
            Step 1
            <div>
              <button onClick={this.handleIncrement}>Next</button>
            </div>
          </div>
        )}
        {this.state.stepNumber === 2 && (
          <div>
            Step 2
            <div>
              <button onClick={this.handleDecrement}>Back</button>
              <button onClick={this.handleIncrement}>Next</button>
            </div>
          </div>
        )}
        {this.state.stepNumber === 3 && (
          <div>
            Step 3
            <div>
              <button onClick={this.handleDecrement}>Back</button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default App;
