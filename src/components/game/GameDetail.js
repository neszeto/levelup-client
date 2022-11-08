import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getGameById, getGameTypes } from "../../managers/GameManager"



export const GameDetail = () => {
    const { gameId } = useParams()
    const [game, setGame] = useState({})

    let navigate = useNavigate()

    useEffect(
        () => {
            getGameById(gameId).then(game => setGame(game))
        }, [gameId]
    )

    return (
      
    <section key={`game--${game.id}`} className="game">
        <div className="game__title">{game.title} by {game.maker}</div>
        <div className="game__players">{game.number_of_players} players needed</div>
        <div className="game__skillLevel">Skill level is {game.skill_level}</div>
        <button onClick={
            () => {
            navigate({pathname: `/games/update/${game.id}`})
            } 
        }>Update Game</button>
    </section>
    )
      
}