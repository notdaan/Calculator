import { useState } from 'react'
import './App.css'
import React from 'react';
import ReactDOM from 'react-dom';
import { Keys } from './keys';
import {evaluate} from 'mathjs';

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleInput = this.handleInput.bind(this)
    this.KeyPressed = this.KeyPressed.bind(this);
    this.KeyReleased = this.KeyReleased.bind(this);
    this.KeyPad = React.createRef();
    this.Input = this.Input.bind(this);
    this.Solve = this.Solve.bind(this);

    this.state = {
      //input: "",
      //answer: "",
      display: 0,
      waitingForOperand: true
    };
  }

 
  handleInput(e){
    //console.log("pressed " + e.target.id)
    if(e.target.id == "clear") {
      this.setState({
       // answer: "",
        //input: "",
        display: 0,
        waitingForOperand: true
      })
      return
    } else if(e.target.id == "equals"){
      this.Solve(this.state.display)
      return
    } else if((/\d/).test(e.target.value)){
      this.Input(e.target.value)
      return
    } else if(e.target.value == "*" || e.target.value == "/" || e.target.value == "-" || e.target.value == "+") {
      InputOperand(e.target.value)
    } else if (e.target.value == ".") {
      InputDot(e.target.value)
    };
    //this.Input(e.target.value)
  }

  Input(value){
    //console.log(value)
    let val = value
    /* console.log(this.state.waitingForOperand) */

   /*  if(this.state.input.slice(-1) == val){ //checks if the same input has been done twice
      if(isNaN(val) && val !== "-"){
        return
      }
    }; */

   /*  if(val == "*" || val == "/" || val == "-" || val == "+") {
      console.log("here")
      this.state.waitingForOperand = false
      InputOperand(val)
    }; */

    /* if(this.state.input.length === 1 && this.state.input.slice(0,1) == "0" && val == "0") { //makes sure numbers cant start with multiple zeros
      return
    };

    if(val == "." && !this.state.waitingForOperand){ //makes sure no double decimals are present on each side of the operators.
      this.InputDot()
    }; */
      let str = this.state.display + val
        if(this.state.display !== "" && isNaN(value)) {
          //this.state.display = this.state.answer + str
          this.state.answer = ""
          this.setState({
            display: this.state.answer + str,
          })
          //console.log(this.state.answer, this.state.input)
        } else {
          /* this.state.input = str;
          this.state.answer = ""; */
          this.setState({
            display: str,
          })
      //console.log(this.state.input, str)
    }
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
    this.setState({
      display: this.state.display + val
    })
    this.state.waitingForOperand = false
  }

  //5 - 9 + 5
  Solve(input){
    let eq = input
    console.log(eq)
    let result = evaluate(eq)
    this.state.answer = result;
    this.state.input = "";
    this.state.display = result;
    this.setState({
      display: result,
    })
    console.log(this.state.display)
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
              {/* <div id='text-display'>
                <div id="answer">{this.state.answer}</div>
                <div id="input">{this.state.input}</div>
              </div> */}
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
