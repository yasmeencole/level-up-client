import React from "react"
import { Route } from "react-router-dom"
import { GameList } from "./games/GameList"
import { GameProvider } from "./games/GameProvider"
import { EventList } from "./games/EventList"
import { EventProvider } from "./games/EventProvider"
import { GameForm } from "./games/GameForm"
import { EventForm } from "./games/EventForm"


export const ApplicationViews = () => {
    return (
    <>
        <main style={{
            margin: "5rem 2rem",
            lineHeight: "1.75rem"
        }}>
            <GameProvider>
                <EventProvider>
                    <Route exact path="/">
                        <GameList />
                    </Route>
                    <Route exact path="/games">
                        <GameList />
                    <Route path="/games/new">
                        <GameForm />
                    </Route>

                    </Route>
                    <Route exact path="/events">
                        <EventList />
                    </Route>
                    <Route exact path="/events/new">
                        <EventForm />
                    </Route>
                </EventProvider>
            </GameProvider>
        </main>
    </>
    )
}
