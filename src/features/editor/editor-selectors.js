import { createSelector } from '@reduxjs/toolkit'
import {
    selectOpenProjectId,
    selectProjectEntities,
} from 'features/projects/projects-selectors'

const selectActiveFile = createSelector(
    [selectOpenProjectId, selectProjectEntities],
    (id, entities) => {
        return entities[id].activeFile
    }
)

export { selectActiveFile }
