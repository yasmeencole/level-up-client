import React, { useContext, useEffect } from "react"
import { EventContext } from "./EventProvider.js"
import "./Event.css"
import { useHistory } from "react-router-dom";


export const EventList = (props) => {
    const { events, getEvents, joinEvent, leaveEvent } = useContext(EventContext)

    const history = useHistory()


    useEffect(() => {
        console.log("Fetching events data from API")
        getEvents()
    }, [])

    return (
        <>
        <header className="events__header">
            <h1>Level Up Game Events</h1>
        </header>
        <button className="btn btn-2 btn-sep icon-create"
            onClick={() => {
                history.push({ pathname: "/events/new" })
            }}
            >Register New Event
        </button>
        <article className="events">
            {
                events.map(event => {
                    // const attending = profile.events.some(evt => evt.id === event.id)
                    return <section key={`event--${event.id}`} className="event">
                        <div className="registration__game">
                            <h3>
                                {event.game.title}
                            </h3>
                        </div>
                        <div>{event.description}</div>
                        <br />
                        <div>
                            {
                                new Date(event.date).toLocaleDateString("en-US",
                                {
                                    weekday: 'long',
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })
                            }
                            @ {event.time}
                        </div>
                        {/* <button className="btn btn-2" onClick={() => joinEvent(event.id)}>Join</button> */}
                        {
                            event.joined
                                ? <button className="btn btn-3"
                                    onClick={() => leaveEvent(event.id)}
                                    >Leave</button>
                                : <button className="btn btn-2"
                                    onClick={() => joinEvent(event.id)}
                                    >Join</button>
                        }
                    </section>
                })
            }
        </article >
        </>
    )
}