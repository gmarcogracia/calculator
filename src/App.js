
import "./styles.css";
import {useReducer} from "react";
import DigitButton from "./DigitButton";
import OperationButton from "./OperationButton";



export const ACTIONS = {
  ADD_DIGIT:'add-digit',
  CLEAR_DIGITS:'clear-digits',
  REMOVE_DIGIT:'remove-digit',
  CHOOSE_OPERATION:'choose',
  EVALUATE:'evaluate'

}

function evaluate({currentOperand,previousOperand,operation}){
    var prev= parseFloat(previousOperand);
    var current = parseFloat(currentOperand);
    if(isNaN(prev) || isNaN(current)){
      return ""
    }
    var computation= "";
    switch(operation){
      case "+":
      computation = prev+current;
      break;
      case "x":
      computation = prev*current;
      break;
      case "-":
      computation = prev-current;
      break;
      case "÷":
      computation = prev/current;
      


    }return computation.toString();

}

function reducer(state,{type,payload}){

switch(type){
  case ACTIONS.ADD_DIGIT:
  if(payload.digit==="0" && state.currentOperand ==="0"){
    return state
  }
  if (payload.digit==="." && state.currentOperand.includes(".")){
    return state

  }
  return {
    ...state,
    currentOperand: `${state.currentOperand || ""}${payload.digit}`,
  }
  case ACTIONS.CLEAR_DIGITS:
    
    return {}
  case ACTIONS.CHOOSE_OPERATION:
    if(state.currentOperand ==null && state.previousOperand==null){
      return state
    }
    if(state.currentOperand==null){
      return {
        ...state,
        operation: payload.operation
      }

    }
    if(state.previousOperand==null){
     
return {
        ...state,
        operation:payload.operation,
        previousOperand:state.currentOperand,
        currentOperand:null


        




      }
    }
    return {
      ...state,
      previousOperand:evaluate(state),
      currentOperand:null,
      operation:payload.operation
    }
    case ACTIONS.EVALUATE:
      if(state.currentOperand ==null || state.previousOperand == null || state.operation==null){
        return state
      }
      return{
        ...state,
    
        currentOperand:evaluate(state),
        previousOperand:null,
        operation:null

      }
    case ACTIONS.REMOVE_DIGIT:
    return{
      ...state,
        currentOperand: state.currentOperand.substring(0, state.currentOperand.length - 1)

    }
  
  


}
}


function App() {
 
  const [{ currentOperand, previousOperand, operation }, dispatch] = useReducer(
    reducer,
    {}
  )



  return (
    <div className="calculator-grid-container">
      <div className="output">
        <div className="previous-operation">{previousOperand} {operation}</div>
        <div className="current-operand">{currentOperand}</div>
      </div>
      <button className="span-two" onClick={()=> dispatch({type: ACTIONS.CLEAR_DIGITS})}>AC</button>
      <button onClick={()=> dispatch({type:ACTIONS.REMOVE_DIGIT})} >DEL</button>
      <OperationButton operation="÷"  dispatch={dispatch}>÷</OperationButton>
      <DigitButton digit="1"  dispatch={dispatch}>1</DigitButton>
      <DigitButton digit="2"  dispatch={dispatch}>2</DigitButton>
      <DigitButton digit="3"  dispatch={dispatch}>3</DigitButton>
      <OperationButton operation="x"  dispatch={dispatch}>x</OperationButton>
      <DigitButton digit="4"  dispatch={dispatch}>4</DigitButton>
      <DigitButton digit="5"  dispatch={dispatch}>5</DigitButton>
      <DigitButton digit="6"  dispatch={dispatch}>6</DigitButton>
      <OperationButton operation="+"  dispatch={dispatch}>+</OperationButton>
      <DigitButton digit="7"  dispatch={dispatch}>7</DigitButton>
      <DigitButton digit="8"  dispatch={dispatch}>8</DigitButton>
      <DigitButton digit="9"  dispatch={dispatch}>9</DigitButton>
      <OperationButton operation="-"  dispatch={dispatch}>-</OperationButton>
      <DigitButton digit="."  dispatch={dispatch}>.</DigitButton>
      <DigitButton digit="0"  dispatch={dispatch}>0</DigitButton>
      <button className="span-two" onClick={()=> dispatch({type:ACTIONS.EVALUATE})}>=</button>
  
      

    </div>
  );
}

export default App;
