import { configureStore } from '@reduxjs/toolkit'
import blocksReducer from '../features/blocks/blocks-slice'
import workspaceReducer from '../features/workspace/workspace-reducer'

export const store = configureStore({
    reducer: {
        blocks: blocksReducer,
        workspace: workspaceReducer,
    },
})
