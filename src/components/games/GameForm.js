import React, { useContext, useState, useEffect } from "react"
import { GameContext } from "./GameProvider.js"
import { useHistory, useParams } from 'react-router-dom'


export const GameForm = () => {
    const history = useHistory()
    const { createGame, getGameTypes, gameTypes, getGameById, updateGame } = useContext(GameContext)
    const {gameId} = useParams()

    /*
        Since the input fields are bound to the values of
        the properties of this state variable, you need to
        provide some default values.
    */
    const [currentGame, setCurrentGame] = useState({
        skill_level: 1,
        number_of_players: 0,
        title: "",
        maker: "",
        gameTypeId: 0
    })

    /*
        Get game types on initialization so that the <select>
        element presents game type choices to the user.
    */

    useEffect(() => {
        getGameTypes()
    }, [])

    // this use affect will only run if gameId changes
    useEffect(() => {
        // if the gameId is not null then the game that comes back, then setCurrentGame 
        if(gameId != null) {
            getGameById(gameId).then(game => {
                setCurrentGame({
                    skill_level: game.skill_level,
                    number_of_players: game.number_of_players,
                    title: game.title,
                    maker: game.maker,
                    game_type_id: game.game_type.id
                })
        })
    }
    }, [gameId])

    /*
        REFACTOR CHALLENGE START

        Can you refactor this code so that all property
        state changes can be handled with a single function
        instead of five functions that all, largely, do
        the same thing?

        One hint: [event.target.name]
    */
    const changeGameTitleState = (event) => {
        const newGameState = { ...currentGame }
        newGameState.title = event.target.value
        setCurrentGame(newGameState)
    }

    const changeGameMakerState = (event) => {
        const newGameState = { ...currentGame }
        newGameState.maker = event.target.value
        setCurrentGame(newGameState)
    }

    const changeGamePlayersState = (event) => {
        const newGameState = { ...currentGame }
        newGameState.number_of_players = event.target.value
        setCurrentGame(newGameState)
    }

    const changeGameSkillLevelState = (event) => {
        const newGameState = { ...currentGame }
        newGameState.skill_level = event.target.value
        setCurrentGame(newGameState)
    }

    const changeGameTypeState = (event) => {
        const newGameState = { ...currentGame }
        newGameState.game_type_id = event.target.value
        setCurrentGame(newGameState)
    }
    /* REFACTOR CHALLENGE END */

    return (
            <form className="gameForm">
                <h2 className="gameForm__title">Register New Game</h2>
                <fieldset>
                    <div className="form-group">
                    <label htmlFor="game_type_id">Game Type: </label>
                    <select value={currentGame.game_type_id} id="game_type" className="form-control" 
                    onChange={changeGameTypeState}>
                        <option value="0">Select a game type</option>
                            {gameTypes.map(gameType => (
                            <option key={gameType.id} value={gameType.id}>
                                {gameType.label}
                        </option>
                        ))}
                    </select>
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="title">Title: </label>
                        <input type="text" name="title" required autoFocus className="form-control"
                            value={currentGame.title}
                            onChange={changeGameTitleState}
                        />
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="maker">Maker of Game: </label>
                        <input type="text" name="maker" required autoFocus className="form-control"
                            value={currentGame.maker}
                            onChange={changeGameMakerState}
                        />
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="number_of_players">Number of Players: </label>
                        <input type="text" name="number_of_players" required autoFocus className="form-control"
                            value={currentGame.number_of_players}
                            onChange={changeGamePlayersState}
                        />
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="skill_level">Skill Level: </label>
                        <input type="text" name="skill_level" required autoFocus className="form-control"
                            value={currentGame.skill_level}
                            onChange={changeGameSkillLevelState}
                        />
                    </div>
                </fieldset>

            <button type="submit"

                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const game = {
                        maker: currentGame.maker,
                        title: currentGame.title,
                        number_of_players: parseInt(currentGame.number_of_players),
                        skill_level: parseInt(currentGame.skill_level),
                        game_type_id: parseInt(currentGame.game_type_id)
                    }
                    console.log(game, "game")
                    if (gameId) {
                        game.id = gameId
                        updateGame(game).then(() => history.push("/games")
                        )
                    } else {
                        createGame(game)
                        .then(() => history.push("/games"))
                }}
            }
            className="btn btn-primary">{gameId?"Save":"Create"}</button>
    </form> 
    )
}