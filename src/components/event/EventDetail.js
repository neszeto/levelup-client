import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getEventById } from "../../managers/EventManager"
import { getGames } from "../../managers/GameManager"



export const EventDetail = () => {
    const { eventId } = useParams()
    const [event, setEvent] = useState({})


    let navigate = useNavigate()
    useEffect(
        () => {
            getEventById(eventId).then(event => setEvent(event))
        }, [eventId]
    )


    return (
         <section key={`event--${event.id}`} className="event">
            <div className="event__description">{event.description}</div>
            <div className="event__time">On {event.date} at {event.time}</div>
            <div className="event_game">Featured Game: {event?.game?.title}</div>
            <button onClick={
                () => {
                navigate({pathname: `/events/update/${event.id}`})
                } 
            }
            >Update Event</button>
        </section>
    )
}