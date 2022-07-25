import { createSlice } from '@reduxjs/toolkit'

export const workspaceSlice = createSlice({
    name: 'workspace',
    initialState: { openProjectId: null, activeProjectIds: [] },
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        setOpenProjectId: (state, action) => {
            state.openProjectId = action.payload
        },
        addActiveProjectId: (state, action) => {
            state.activeProjectIds.push(action.payload)
        },
    },
})

export const { setOpenProjectId, addActiveProjectId } = workspaceSlice.actions

export default workspaceSlice.reducer
