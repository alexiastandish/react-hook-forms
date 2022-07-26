import { createSelector } from '@reduxjs/toolkit'
import projectsAdapter from './projects-adapter'

const projectsSelector = projectsAdapter.getSelectors(
    (state) => state?.workspace?.projects ?? null
)

const {
    selectIds: selectProjectIds,
    selectEntities: selectProjectEntities,
    selectAll: selectAllProjects,
} = projectsSelector

const selectOpenProjectId = (state) => state.workspace.projects.openProjectId

const selectActiveFile = createSelector(
    [selectProjectEntities, selectOpenProjectId],
    (projects, openId) => {
        return projects[openId].activeFile
    }
)

export {
    selectProjectIds,
    selectOpenProjectId,
    selectProjectEntities,
    selectAllProjects,
    selectActiveFile,
}
