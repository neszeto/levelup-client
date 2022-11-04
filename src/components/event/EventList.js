import React, { useEffect, useState } from "react"
import { getEvents } from "../../managers/EventManager"


export const EventList = (props) => {
    const [events, setEvents ] = useState([])

    useEffect(() => {
        getEvents().then(data => setEvents(data))
    }, [])

    return (
        <article className="games">
            {
                events.map(event=> {
                    return <section key={`event--${event.id}`} className="event">
                        <div className="event__description">{event.description}</div>
                        <div className="event__time">On {event.date} at {event.time}</div>
                    </section>
                })
            }
        </article>
    )
}