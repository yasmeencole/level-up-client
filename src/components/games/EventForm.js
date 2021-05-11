import React, { useContext, useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { EventContext } from "./EventProvider"
import { GameContext } from "./GameProvider"


export const EventForm = () => {
    const { events, getEvents, createEvent } = useContext(EventContext)
    const { games, getGames } = useContext(GameContext)
    const history = useHistory()
    


    const [currentEvent, setCurrentEvent] = useState({
        host_id: 0,
        name: "",
        game_id: 0,
        description: "",
        date: new Date(),
        time: new Date()
    })

    useEffect(() => {
        // Get all existing games from API
        getGames()
    }, [])

    // const changeEventState = (domEvent) => {
    //     const newEvent = { ...currentEvent }
    //     let selectedValue = domEvent.target.value
    //     newEvent[domEvent.target.id] = selectedValue
    //     setCurrentEvent(newEvent)
    // }
    const changeEventGameState = (event) => {
        const newEventState = { ...currentEvent }
        newEventState.game_id = event.target.value
        setCurrentEvent(newEventState)
    }

    const changeEventNameState = (event) => {
        const newEventState = { ...currentEvent }
        newEventState.name = event.target.value
        setCurrentEvent(newEventState)
    }

    const changeEventDescriptionState = (event) => {
        const newEventState = { ...currentEvent }
        newEventState.description = event.target.value
        setCurrentEvent(newEventState)
    }

    const changeEventDateState = (event) => {
        const newEventState = { ...currentEvent }
        newEventState.date = event.target.value
        setCurrentEvent(newEventState)
    }

    const changeEventTimeState = (event) => {
        const newEventState = { ...currentEvent }
        newEventState.time = event.target.value
        setCurrentEvent(newEventState)
    }

    // "host": 1,
    // "game": 1,
    // "name": "Monopoly Event",
    // "description": "A board game about buying real estate.",
    // "date": "2021-04-06",
    // "time": "09:05AM"

    return (
        <form className="eventForm">
            <h2 className="eventForm__title">Schedule New Event</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Name of Event: </label>
                    <input type="text" name="name" required autoFocus className="form-control"
                        value={currentEvent.name}
                        onChange={changeEventNameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                <label htmlFor="game_id">Game: </label>
                <select value={currentEvent.game_id} id="game_id" className="form-control" 
                onChange={changeEventGameState}>
                    <option value="0">Select a game</option>
                        {games.map(game => (
                        <option key={game.id} value={game.id}>
                            {game.title}
                    </option>
                    ))}
                </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description: </label>
                    <input type="text" name="description" required autoFocus className="form-control"
                        value={currentEvent.description}
                        onChange={changeEventDescriptionState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="date">Date: </label>
                    <input type="date" name="date" required autoFocus className="form-control"
                        value={currentEvent.date}
                        onChange={changeEventDateState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="time">Time: </label>
                    <input type="time" name="time" required autoFocus className="form-control"
                        value={currentEvent.time}
                        onChange={changeEventTimeState}
                    />
                </div>
            </fieldset>
    
                {/* Create the rest of the input fields */}

                <button type="submit"
                    onClick={evt => {
                        // Prevent form from being submitted
                        evt.preventDefault()

                        const event = {
                            game_id: parseInt(currentEvent.game_id),
                            name: currentEvent.name,
                            description: currentEvent.description,
                            time: currentEvent.time,
                            date: currentEvent.date
                        }

                        // Send POST request to your API
                        createEvent(event)
                            .then(() => history.push("/events"))
                    }}
                    className="btn btn-primary">Create Event
                </button>
            </form>
        )
    }