import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getEventById, updateEvent } from "../../managers/EventManager"
import { getGames } from "../../managers/GameManager"

export const UpdateEvent = () => {
    const { eventId } = useParams()
    const [currentEvent, setCurrentEvent] = useState({})
    const [games, setGames] = useState([])


    let navigate = useNavigate()
    useEffect(
        () => {
            getEventById(eventId).then(event => setCurrentEvent(event))
            getGames().then(games => setGames(games))
        }, [eventId]
    )


    const changeEventState = (domEvent) => {
        const newEvent = Object.assign({}, currentEvent)
        newEvent[domEvent.target.name] = domEvent.target.value
        setCurrentEvent(newEvent)
    }


    return (
        <form className="gameForm">
            <h2 className="gameForm_title">Update Event</h2>
            <fieldset>
                <div className="form-group">
                <label htmlFor="game">Event Game: </label>
                    <select id="game" className="form-control" onChange={changeEventState} name="game">
                        <option value={currentEvent?.game?.id}>{currentEvent?.game?.title}</option>
                        {
                            games.map(game => <option value={game.id} key={game.id}>{game.title}</option>)
                        }
                    </select>
                    
                <label htmlFor="title">Event Description: </label>
                    <textarea type="text" name="description" required autoFocus className="form-control"
                        value={currentEvent.description}
                        onChange={changeEventState}
                    />
                <label htmlFor="title">Date: </label>
                    <input type="date" name="date" required autoFocus className="form-control"
                        value={currentEvent.date}
                        onChange={changeEventState}
                    />
                    <label htmlFor="title">Time: </label>
                    <input type="time" name="time" required autoFocus className="form-control"
                        value={currentEvent.time}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>
            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                   //had to create this if/else statement to handle changing access to the game key depending on if users changed the game from the dropdown or not
                    if (currentEvent.game.id) { 
                        
                        const createdEvent = {
                        
                            game: parseInt(currentEvent.game.id), 
                            description: currentEvent.description,
                            date: currentEvent.date,
                            time: currentEvent.time
                        }
                        updateEvent(createdEvent, eventId)
                        .then(() => navigate("/events"))
                    }
                    else {
                        
                        const createdEvent = {
                        
                            game: parseInt(currentEvent.game),
                            description: currentEvent.description,
                            date: currentEvent.date,
                            time: currentEvent.time
                        }
                        updateEvent(createdEvent, eventId)
                        .then(() => navigate("/events"))
                    }
                   

                    
                }}
                className="btn btn-primary">Create</button>
        </form>
    )


}