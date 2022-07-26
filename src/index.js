import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './app/store'
import reportWebVitals from './reportWebVitals'
import './index.css'
import { fetchSavedBlocks } from './features/blocks/blocks-slice'
import { BrowserRouter } from 'react-router-dom'
import Routes from 'Routes'

const container = document.getElementById('root')
const root = createRoot(container)

store.dispatch(fetchSavedBlocks())
root.render(
    <BrowserRouter>
        <Provider store={store}>
            <Routes />
        </Provider>
    </BrowserRouter>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
