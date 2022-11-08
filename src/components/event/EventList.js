import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { deleteEvent, getEvents } from "../../managers/EventManager"


export const EventList = (props) => {
    const [events, setEvents ] = useState([])

    let navigate = useNavigate()

    useEffect(() => {
        getEvents().then(data => setEvents(data))
    }, [])
    

    return (
        <article className="games">
            <button className="btn btn-2 btn-sep icon-create"
            onClick={() => {
                navigate({ pathname: "/events/new" })
                    }}
                >Register New Event</button>
            {
                events.map(event=> {
                    return <section key={`event--${event.id}`} className="event">
                        <div className="event__description">{event.description}</div>
                        <div className="event__time">On {event.date} at {event.time}</div>
                        <div className="event_game">Featured Game: {event.game.title}</div>
                        <button onClick={
                           () => {
                            navigate({pathname: `/events/${event.id}`})
                           } 
                        }
                        >Event Details</button>
                        <button
                        onClick={
                            () => {
                                deleteEvent(`${event.id}`)
                                .then(() =>getEvents()
                                .then(data => setEvents(data)))
                            }
                        }>Delete Event</button>
                    </section>
                })
            }
        </article>
    )
}