import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getEvents } from "../../managers/EventManager"


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
                        <button onClick={
                           () => {
                            navigate({pathname: `/events/${event.id}`})
                           } 
                        }
                        >Update Event</button>
                    </section>
                })
            }
        </article>
    )
}