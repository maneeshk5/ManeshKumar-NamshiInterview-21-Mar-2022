import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import React, {useState, useEffect} from "react";
import {Col, Container, Row, Table} from 'react-bootstrap';


function Weather() {
    const [weatherData,setWeatherData] = useState([])
    const [forecast, setForecast] = useState([]);
    useEffect(() => {
        fetch('http://api.openweathermap.org/data/2.5/forecast?lat=25&lon=55&appid=486200fc9985f9dbf4280275570ce78a')
            .then(results => results.json())
            .then(data => {
                setWeatherData((data));
                setForecast(data.list)
                console.log(data,"data")
            });
    }, []);




    function getUnixTime(time){
        const unixTime = time;
        const date = new Date(unixTime*1000);
        return date.toLocaleTimeString();
    }
    function getUnixDay(day){
        const unixTime = day;
        const date = new Date(unixTime*1000);

        return date.toDateString();
    }
    function getCelsius(value){
        return Math.round((value-273.15) * 10) / 10;
    }
  return (
        <Container>
            <h1>Weather Forecast</h1>
            <Row>
                <Col><p>City: {weatherData?weatherData.city?weatherData.city.name:"":""}</p></Col>
                <Col><p>Country: {weatherData?weatherData.city?weatherData.city.country:"":""}</p></Col>
                <Col><p>Sunrise: {weatherData?weatherData.city?getUnixTime(weatherData.city.sunrise):"":""}</p></Col>
                <Col><p>Sunset: {weatherData?weatherData.city?getUnixTime(weatherData.city.sunset):"":""}</p></Col>
          </Row>
            <Row>
                <Col>
                    <p>Daily Forecast API is not working, I'm using daily forecast but with 3 hour difference.</p>
                    <Table striped bordered hover variant="dark">
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Day</th>
                            <th>Temperate(C)</th>
                            <th>Humidity</th>
                            <th>Description</th>
                        </tr>
                        </thead>
                        <tbody>
                        {forecast?forecast.map((item, i,value) => (

                            <tr>
                                <td>{i+1}</td>
                                <td>{(getUnixDay(item.dt))}</td>
                                <td>{getCelsius(item.main?item.main.temp:"")}</td>
                                <td>{item.main?item.main.humidity:""}</td>
                                <td>{item.weather?item.weather[0].description:""}</td>
                            </tr>
                        )):""}
                        </tbody>
                    </Table>
                </Col>
            </Row>

        </Container>
  );
}

export default Weather;
