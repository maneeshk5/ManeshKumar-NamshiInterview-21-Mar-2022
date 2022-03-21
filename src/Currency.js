import React, {useState, useEffect} from "react";
import './App.css';

import {Button, Col, Container, Row, Table} from 'react-bootstrap';

function Currency() {
    const [data,setData] = useState([])
    const [currencies, setCurrencies] = useState('')
    useEffect(() => {
        fetch('https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/aed.json')
            .then(results => results.json())
            .then(data => {
                setData(data);
                setCurrencies((data.aed));
                // console.log(data,"data")
            });
    }, []);

  return (

        <Container className="currencyApp">
          <Row>
              <Col><h3>All Currencies in AED</h3> </Col>
              <Col><h3>Date: {data?data.date:""}</h3></Col>
          </Row>
          <Row>
            <Col>
                <Table striped bordered hover variant="dark">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Country</th>
                        <th>Currency</th>
                    </tr>
                    </thead>
                    <tbody>
                    {Object.keys(currencies).map((item, i,value) => (

                        <tr>
                            <td key={i}>{i+1}</td>
                            <td key={item}>{item.toUpperCase()}</td>
                            <td >{currencies[item]}</td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            </Col>
          </Row>
        </Container>

  );
}

export default Currency;
