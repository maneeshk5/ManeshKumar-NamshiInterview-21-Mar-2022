import logo from './logo.svg';
import './App.css';
import {data} from './data';
import Currency from './Currency';
import Weather from "./Weather";
import {Button, Col, Container, Row} from 'react-bootstrap';
import {useState} from "react";


function App() {
  const [box,setBox] = useState(data);
  const [count,setCount] = useState(1);
  const isAllZero = box.every(item => item.extraID === 0);
  const isSomeZero = box.some(item => item.extraID === 0);
  // let countAdvance =0;
  function clicked(value){
    if (count>2) {
      const updateColorForMore = box.map(boxValue => {

      if (count - boxValue.extraID === 2){
        console.log("hi there")
        return {...boxValue, color: "blue",extraID: '0'}
      }
      if (boxValue.id === value.id && boxValue.color !== "red") {
        console.log("red", value, box);
        setCount(count + 1);
        return {...boxValue, color: "red", text: `Box ` + count,extraID: count}
      }
      return boxValue
      })

      console.log(count, "update",updateColorForMore)
      setBox(updateColorForMore);

    }else{

      console.log(isAllZero,isSomeZero, "zero")
      // const updateColor = box.map( boxValue => {
      const updateColor = box.map(boxValue => {
        if (boxValue.id === value.id && boxValue.color !== "red") {
          console.log("red", value, box);
          setCount(count + 1);
          return {...boxValue, color: "red", text: `Box ` + count,extraID: count }
        }
        return boxValue

      })
      setBox(updateColor);
      // console.log(updateColor, "update")
    }
  }
  return (
    <div className="App">
        <Container>
          <Row>
            {box.map(value => (
            <Col className="col-3">
                <input style={{background: value.color}} value={value.text}  onClick={() => clicked(value)}/>
            </Col>
            ))}
          </Row>
        </Container>
    </div>
  );
}

export default App;
