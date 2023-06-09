import React from 'react';
import {FaArrowUp, FaArrowDown, FaWind} from 'react-icons/Fa';
import { MdCompress, MdOutlineWaterDrop } from "react-icons/Md";
import { BiHappy } from 'react-icons/bi';
import './weatherdescriptions.css';

const WeatherDescriptions = ({weather, units}) => {
    const tempUnits = units === 'imperial' ? '°F' : '°C'
    const windUnit = units === 'imperial' ? 'm/h' :'m/s'

    const cards = [
        {
            id: 1,
            icon: <FaArrowDown />,
            title: "min",
            data: weather.temp_min.toFixed(),
            unit: tempUnits,
        },
        {
            id: 2,
            icon: <FaArrowUp />,
            title: "max",
            data: weather.temp_max.toFixed(),
            unit: tempUnits,
        },
        {
            id: 3,
            icon: <BiHappy/>,
            title: "feels like",
            data: weather.feels_like.toFixed(),
            unit: tempUnits,
        },
        {
            id: 4,
            icon: <MdCompress />,
            title: "pressure",
            data: weather.pressure.toFixed(),
            unit: "hPa",
        },
        {
            id: 5,
            icon: <MdOutlineWaterDrop />,
            title: "humidity",
            data: weather.humidity,
            unit: "%",
        },
        {
            id: 6,
            icon: <FaWind />,
            title: "wind speed",
            data: weather.speed.toFixed(),
            unit: windUnit,
        },
    ]


  return (
    <div className="section section_descriptions">
        {cards.map(({id, icon, title, data, unit}) => (
            <div key={id} className= "card">
            <div className="description_card-icon">
                {icon}
                <small>{title}</small>
            </div>
            <h2>{`${data} ${unit}`}</h2>
        </div> 
        ))}
    </div>
  )
}

export default WeatherDescriptions;