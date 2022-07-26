import { combineReducers } from '@reduxjs/toolkit'
import projectsReducer from 'features/projects/projects-slice'
import workspaceSettingsReducer from 'features/workspace/workspace-slice'

const workspaceReducer = combineReducers({
    projects: projectsReducer,
    workspaceSettings: workspaceSettingsReducer,
})

export default workspaceReducer
