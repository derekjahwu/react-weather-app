import React, {useState} from 'react';
import '../App.css';

function Application() {
    const [query, setQuery] = useState('Berlin');
    const [country, setCountry] = useState('');
    const [image, setImage] = useState('')
    const [date, setDate] = useState('');
    const [humidity, setHumidity] = useState('');
    const [rain, setRain] = useState('');
    const [text, setText] = useState('');
    const [weather, setWeather] = useState(() => {
        fetch(`http://api.weatherapi.com/v1/forecast.json?key=dbe5af8d5484472c84d03742210311&q=berlin&days=7&aqi=no&alerts=no
        `)
            .then(response => response.json())
            .then(data => {
                setWeather(Math.floor(data.current.feelslike_f));
                setCountry(`${data.location.name}, ${data.location.country}`);
                setDate(data.forecast.forecastday[0].date);
                setImage(data.current.condition.icon);
                setHumidity(data.current.humidity);
                setText(data.current.condition.text);
                setRain(data.forecast.forecastday[0].day.daily_chance_of_rain);
            })
    }
    )

    
    const url = `http://api.weatherapi.com/v1/forecast.json?key=dbe5af8d5484472c84d03742210311&q=${query}&days=7&aqi=no&alerts=no
    `

    const search = (e) => {
        if(e.key === 'Enter') {
            fetch(url)
            .then(response => response.json())
            .then(data => {
                if(data) {
                    setWeather(Math.floor(data.current.feelslike_f))
                console.log(data)
                setCountry(`${data.location.name}, ${data.location.country}`)
                setDate(data.forecast.forecastday[0].date);
                setImage(data.current.condition.icon);
                setHumidity(data.current.humidity);
                setRain(data.forecast.forecastday[0].day.daily_chance_of_rain);
                } else {
               alert('city not found')
                }                
            })
    }
}

    return (
        <div className={(weather > 72) ? 'application warm' : 'application cool'}>
            <h1 className='date'>{date}</h1>
            <h3 className='country' >{country}</h3>
            <div className='imageDiv'>
            <img className='image' src={image} />
            <h3 className='text'>{text}</h3>
            </div>
            <div className='altInfo'>
               <div className='humidity'>
                   <h5 className='humidityText'>Humidity</h5>
                <h3>{humidity}</h3>
               </div>
               <div className='rainSnow'>
                   <h5 className='rainText'>Rain/Snow</h5>
               <h3>{rain}</h3>
               </div>
            </div>
            <h3 className='weather'>{weather}&deg;F</h3>
            <input className='inputCity' placeholder='Search for a City' type='text' onKeyPress={search} onChange={e => setQuery(e.target.value)} />
        </div>
    )
}

export default Application