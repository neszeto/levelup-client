import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { createEvent } from "../../managers/EventManager"
import { getGames } from "../../managers/GameManager"



export const EventForm = () => {
    const [games, setGames] = useState([])

    const [event, setEvent] = useState({
        game: 0,
        description: "",
        date: "",
        time: ""
    })

    let navigate = useNavigate()
    useEffect(() => {
        getGames().then(games => setGames(games))
    }, [])


    const changeEventState = (domEvent) => {
        const newEvent = Object.assign({}, event)
        newEvent[domEvent.target.name] = domEvent.target.value
        setEvent(newEvent)
    }

    return (
        <form className="gameForm">
            <h2 className="gameForm_title">Create New Event</h2>
            <fieldset>
                <div className="form-group">
                <label htmlFor="game">Event Game: </label>
                    <select id="game" className="form-control" onChange={changeEventState} name="game">
                        <option value="">Select a game...</option>
                        {
                            games.map(game => <option value={game.id} key={game.id}>{game.title}</option>)
                        }
                    </select>
                    
                <label htmlFor="title">Event Description: </label>
                    <textarea type="text" name="description" required autoFocus className="form-control"
                        value={event.description}
                        onChange={changeEventState}
                    />
                <label htmlFor="title">Date: </label>
                    <input type="date" name="date" required autoFocus className="form-control"
                        value={event.date}
                        onChange={changeEventState}
                    />
                    <label htmlFor="title">Time: </label>
                    <input type="time" name="time" required autoFocus className="form-control"
                        value={event.date}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>
            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const createdEvent = {
                        game: parseInt(event.game),
                        description: event.description,
                        date: event.date,
                        time: event.time
                    }

                    // Send POST request to your API
                    createEvent(createdEvent)
                        .then(() => navigate("/events"))
                }}
                className="btn btn-primary">Create</button>
        </form>
    )



}