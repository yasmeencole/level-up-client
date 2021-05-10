import React, { useContext, useEffect, useState } from "react"
import { GameContext } from "./GameProvider.js"
import "./Game.css"
import { useHistory } from "react-router-dom";


export const GameList = (props) => {
    const { games, getGames } = useContext(GameContext)

    // const [ allGames, setFiltered ] = useState([])
    const history = useHistory()


    useEffect(() => {
        console.log("Fetching games data from API")
        getGames()
    }, [])

    return (
        <>
        <button className="btn btn-2 btn-sep icon-create"
                    onClick={() => {
                        history.push({ pathname: "/games/new" })
                    }}
                    >Register New Game
        </button>
        <article className="games">
            {
                games.map(game => {
                    return <section key={`game--${game.id}`} className="game">
                        
                        <div className="game__title">
                            <h2>
                            {game.title} by {game.maker}
                            </h2>
                        </div>
                        <div className="game__players">Number of Players: {game.number_of_players}</div>
                        <div className="game__skillLevel">Skill Level: {game.skill_level}</div>
                    </section>
                })
            }
        </article>
        </>
    )
}