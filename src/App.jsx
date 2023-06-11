import { useState } from 'react'
import './App.css'
import React from 'react';
import ReactDOM from 'react-dom';
import { Keys } from './keys';
import {evaluate, typeOf} from 'mathjs';

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleInput = this.handleInput.bind(this)
    this.KeyPressed = this.KeyPressed.bind(this);
    this.KeyReleased = this.KeyReleased.bind(this);
    this.KeyPad = React.createRef();
    this.Input = this.Input.bind(this);
    this.Solve = this.Solve.bind(this);
    this.InputOperand = this.InputOperand.bind(this);
    this.InputDot = this.InputDot.bind(this);

    this.state = {
      display: "0",
      waitingForOperand: false,
      beenSolved: false,
    };
  }

 
  handleInput(e){
    if(e.target.id == "clear") {
      this.setState({
        display: 0,
        waitingForOperand: false
      })
      return
    } else if(e.target.id == "equals"){
      this.Solve(this.state.display)
      return
    } else if((/\d/).test(e.target.value)){
      this.Input(e.target.value)
      return
    } else if(e.target.value == "*" || e.target.value == "/" || e.target.value == "-" || e.target.value == "+") {
      this.InputOperand(e.target.value)
      
    } else if (e.target.value == ".") {
      //console.log("dot")
      this.InputDot(e.target.value)
    };
  }

  Input(value){
    //console.log(value)
    let val = value
    let str = ""
    if(this.state.display == "0" || this.state.beenSolved) {
      str = val
    } else {
      str = this.state.display + val
    };
      this.setState({
        display: str,
        beenSolved: false
      })
  }

  InputDot(val) {
    if(val == "." && !this.state.waitingForOperand){ //makes sure no double decimals are present on each side of the operators.
      this.setState({
        display: this.state.display + '.',
        waitingForOperand: true
      })
    };
  }

  InputOperand(val) {
    if(this.state.display !== "0"){
      if(this.state.display.slice(-1) == val){ //checks if the same input has been done twice
        if(isNaN(val) && val !== "-"){
          return
        }
        if((/\-{2,}/).test(this.state.display.slice(-2))){
          return
        }
      }
      this.setState({
        display: this.state.display + val,
        beenSolved: false
      })
    } else {
      this.setState({
        display: val,
        beenSolved: false
      })
    }
    this.state.waitingForOperand = false
  }

  //5 - 9 + 5
  Solve(input){
    console.log( "equation : " + input)
    let eq = input
    //console.log(eq)
    let filEq = eq.match(/(\*|\+|\/|-)?(\.|\-)?\d+/g).join('');
    let result = evaluate(filEq)
    this.state.display = result.toString(),
    this.setState({
      display: result.toString(),
      beenSolved: true
    })
    
    console.log( "answer : " + this.state.display)
  };
  
  KeyPressed(e) {
    //console.log(e.keyCode)
    for (let i =0; i < Keys.length; i++) {
      if(e.keyCode === Keys[i].keyCode) {
        this.Input(Keys[i].value)
      }
    }
  }

  KeyReleased(e) {
    
  }

  componentDidMount() {
    document.addEventListener('keydown', this.KeyPressed);
    document.addEventListener('keyup', this.KeyReleased);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.KeyPressed);
    document.removeEventListener('keyup', this.KeyReleased);
  }

  render() {
    return (
      <div className="App">
        <div className='Calc-Container'>
            <div id='display-wrapper'>
              <div id='display-box'>
                <div id='display'>{this.state.display}</div>
              </div>
            </div>
              <div className='calc-keypad' ref={this.keyPad}>
              <button className='calc-button' id='clear'     value = 'CA' onClick={this.handleInput}>CA</button>
              <button className='calc-button' id='divide'    value = '/' onClick={this.handleInput}>/</button>
              <button className='calc-button' id='multiply'  value = '*' onClick={this.handleInput}>*</button>
              <button className='calc-button' id='subtract'     value = '-' onClick={this.handleInput}>-</button>
              <button className='calc-button' id='seven'     value = '7' onClick={this.handleInput}>7</button>
              <button className='calc-button' id='eight'     value = '8' onClick={this.handleInput}>8</button>
              <button className='calc-button' id='nine'      value = '9' onClick={this.handleInput}>9</button>
              <button className='calc-button' id='add'       value = '+' onClick={this.handleInput}>+</button>
              <button className='calc-button' id='four'      value = '4' onClick={this.handleInput}>4</button>
              <button className='calc-button' id='five'      value = '5' onClick={this.handleInput}>5</button>
              <button className='calc-button' id='six'       value = '6' onClick={this.handleInput}>6</button>
              <button className='calc-button' id='one'       value = '1' onClick={this.handleInput}>1</button>
              <button className='calc-button' id='two'       value = '2' onClick={this.handleInput}>2</button>
              <button className='calc-button' id='three'     value = '3' onClick={this.handleInput}>3</button>
              <button className='calc-button' id='equals'    value = '=' onClick={this.handleInput}>=</button>
              <button className='calc-button' id='zero'      value = '0' onClick={this.handleInput}>0</button>
              <button className='calc-button' id='decimal'   value = '.' onClick={this.handleInput}>.</button>
            </div>
        </div>
      </div>
    );
  }
}
