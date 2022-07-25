import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../features/counter/counterSlice'
import blocksReducer from '../features/blocks/blocks-slice'
import workspaceReducer from '../features/workspace/workspace-slice'

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        blocks: blocksReducer,
        workspace: workspaceReducer,
    },
})
