import React from "react"
import { Route } from "react-router-dom"
import { GameList } from "./games/GameList"
import { GameProvider } from "./games/GameProvider"
import { EventList } from "./games/EventList"
import { EventProvider } from "./games/EventProvider"
import { GameForm } from "./games/GameForm"
import { EventForm } from "./games/EventForm"
import { Profile } from "./auth/Profile"
import { ProfileProvider } from "./auth/ProfileProvider"


export const ApplicationViews = () => {
    return (
    <>
        <main style={{
            margin: "5rem 2rem",
            lineHeight: "1.75rem"
        }}>
            <EventProvider>
                <GameProvider>
                        <Route exact path="/">
                            <GameList />
                        </Route>
                        <Route exact path="/games">
                            <GameList />
                        </Route>
                        <Route exact path="/games/new">
                            <GameForm />
                        </Route>
                        <Route exact path="/games/:gameId/update">
                            <GameForm />
                        </Route>
                </GameProvider>
            </EventProvider>

            <GameProvider>
                <EventProvider>
                        <Route exact path="/events">
                            <EventList />
                        </Route>
                        <Route exact path="/events/new">
                            <EventForm />
                        </Route>
                </EventProvider>
            </GameProvider>

            <ProfileProvider>
                <Route exact path="/profile">
                    <Profile />
                </Route>
            </ProfileProvider>
        </main>
    </>
    )
}
