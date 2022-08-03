import { createSlice } from '@reduxjs/toolkit'
import projectsAdapter from './projects-adapter'

const projectsSlice = createSlice({
    name: 'projects',
    initialState: projectsAdapter.getInitialState({
        openProjectId: '',
    }),
    reducers: {
        projectAddOne: projectsAdapter.addOne,
        projectUpdateOne: projectsAdapter.updateOne,
        projectRemoveOne: (state, action) => {
            return projectsAdapter.removeOne(state, action.payload)
        },
        projectsRemoveAll: projectsAdapter.removeAll,
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
} = projectsSlice.actions

export default projectsSlice.reducer
