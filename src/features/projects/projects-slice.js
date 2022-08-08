import { createSlice } from '@reduxjs/toolkit'
import projectsAdapter from './projects-adapter'

const projectsSlice = createSlice({
    name: 'projects',
    initialState: projectsAdapter.getInitialState({
        openProjectId: '',
    }),
    reducers: {
        projectAddOne: (state, action) => {
            return projectsAdapter.addOne(state, action.payload)
        },
        projectUpdateOne: projectsAdapter.updateOne,
        projectRemoveOne: (state, action) => {
            return projectsAdapter.removeOne(state, action.payload)
        },
        projectsRemoveAll: projectsAdapter.removeAll,
        projectsUpdateMany: (state, action) => {
            return projectsAdapter.updateMany(state, action.payload.changes)
        },
        projectsSetAll: (state, action) => {
            return projectsAdapter.setAll(state, action.payload.changes)
        },
        setOpenProjectId: (state, action) => {
            state.openProjectId = action.payload
        },
        setActiveFileInProject: (state, action) => {
            state.entities[action.payload.id].activeFile = action.payload.file
        },
    },
})

export const {
    projectAddOne,
    projectUpdateOne,
    setOpenProjectId,
    setActiveFileInProject,
    projectsRemoveAll,
    projectRemoveOne,
    projectsUpdateMany,
    projectsSetAll,
} = projectsSlice.actions

export default projectsSlice.reducer
