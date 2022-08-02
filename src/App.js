import React from 'react'
import './App.css'
import Blocks from './features/blocks/Blocks'
import { useNavigate } from 'react-router-dom'

function App() {
    return (
        <div className="App">
            <Blocks />
        </div>
    )
}

export default App
