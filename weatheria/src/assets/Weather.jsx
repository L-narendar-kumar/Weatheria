import React from "react"

export default function Weather() {

    const [city, setCity] = React.useState("")
    const [weather, setWeather] = React.useState({})
    const [submitted, setSubmitted] = React.useState(false)
    const [submitting, setSubmitting] = React.useState(false)

    React.useEffect(() => {
        async function fetchData() {
            if (city != "" && submitted) {
                try {
                    let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=f1a97389ca9c92d5c0d590493a14aa23`)
                    let data = await response.json()
                    setWeather(data)
                }
                catch (e) {
                    console.log("error")
                    setSubmitting(false)
                }
            }
        }
        fetchData()
    }, [city, submitted])

    function handleChange(event) {
        setCity(event.target.value)
    }

    function onSubmit(event) {
        event.preventDefault()
        setSubmitted(true)
        setSubmitting(true)
    }

    function newData(){
        setWeather({})
        setSubmitted(false)
        setSubmitting(false)
        setCity("")
    }

    return (
        <div className="weather-app">
            <form onSubmit={onSubmit}>
                <label htmlFor="city">City</label>
                <input
                    type="text"
                    name="city"
                    onChange={handleChange}
                    value={city}
                    disabled={submitting}

                />
                {!submitted && <button type="submit">Submit</button>}

            </form>
            {
                submitted ? (
                    weather && weather.main && weather.weather ? (
                        <div>
                          <h2>{weather.name}</h2>
                          <p>Temperature: {weather.main.temp}°K</p>
                          <p>Description: {weather.weather[0].description}</p>
                        </div>
                      ) : (
                        <p>No weather data found</p>
                    )
                ) : (
                    <p>Enter city name</p>
                )
            }
            {submitted && <button onClick={newData}>Get New city</button>}
        </div>
    )
}