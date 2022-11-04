import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getGameById, getGameTypes, updateGame } from "../../managers/GameManager"



export const UpdateGame = () => {
    const { gameId } = useParams()
    const [currentGame, setCurrentGame] = useState({})

    const [gameTypes, setGameTypes] = useState([])

    let navigate = useNavigate()

    useEffect(
        () => {
            getGameById(gameId).then(game => setCurrentGame(game))
            getGameTypes().then(types => setGameTypes(types))
        }, [gameId]
    )

    const changeGameState = (domEvent) => {
        const newGame = Object.assign({}, currentGame)
        newGame[domEvent.target.name] = domEvent.target.value
        setCurrentGame(newGame)
    }
    
    return (
        <form className="gameForm">
            <h2 className="gameForm__title">Update Game</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Title: </label>
                    <input type="text" name="title" required autoFocus className="form-control"
                        value={currentGame.title}
                        onChange={changeGameState}
                    />
                    <label htmlFor="maker">Maker: </label>
                    <input type="text" name="maker" required autoFocus className="form-control"
                        value={currentGame.maker}
                        onChange={changeGameState}
                    />
                    <label htmlFor="type">Game Type: </label>
                    <select id="type" className="form-control" onChange={changeGameState} name="game_type">
                        <option value="">{currentGame.game_type?.label}</option>
                        {
                            gameTypes.map(type => <option value={type.id} key={type.id}>{type.label}</option>)
                        }
                    </select>
                    <label htmlFor="number">Number of Players: </label>
                    <input type="number" name="number_of_players" required autoFocus className="form-control"
                        value={currentGame.number_of_players}
                        onChange={changeGameState}
                    />
                    <label htmlFor="skill">Skill Level </label>
                    <input type="number" name="skill_level" required autoFocus className="form-control"
                        value={currentGame.skill_level}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const newGame = {
                        maker: currentGame.maker,
                        title: currentGame.title,
                        numberOfPlayers: parseInt(currentGame.number_of_players),
                        skillLevel: parseInt(currentGame.skill_level),
                        gameType: parseInt(currentGame.game_type.id)
                    }

                    // Send POST request to your API
                    updateGame(newGame, gameId)
                        .then(() => navigate("/games"))
                }}
                className="btn btn-primary">Create</button>
        </form>
    )



}