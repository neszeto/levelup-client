import { Route, Routes } from "react-router-dom"
import { Login } from "../components/auth/Login"
import { Register } from "../components/auth/Register"
import { EventForm } from "../components/event/EventForm"
import { EventList } from "../components/event/EventList"
import { UpdateEvent } from "../components/event/UpdateEvent"
import { GameForm } from "../components/game/GameForm"
import { GameList } from "../components/game/GameList"
import { UpdateGame } from "../components/game/UpdateGame"
import { Authorized } from "./Authorized"


export const ApplicationViews = () => {
    return <>
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<Authorized />}>
                {/* Add Routes here */}
                <Route path="games" element={<GameList />} />
                <Route path="events" element={<EventList />} />
                <Route path="/games/new" element={<GameForm />} />
                <Route path="/events/new" element={<EventForm />} />
                <Route path="/games/:gameId" element={<UpdateGame />} />
                <Route path="/events/:eventId" element={<UpdateEvent />} />
                
            </Route>
        </Routes>
    </>
}
