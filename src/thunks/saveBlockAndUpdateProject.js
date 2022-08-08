import { saveNewBlock, updateCustomBlock } from 'features/blocks/blocks-api'
import {
    projectRemoveOne,
    projectAddOne,
    setOpenProjectId,
} from 'features/projects/projects-slice'
import { blockAddOne, blockUpdateOne } from '../features/blocks/blocks-slice'

const saveBlockAndUpdateProject =
    (project, values, reset) => async (dispatch, getState) => {
        const {
            blocks,
            workspace: {
                projects: { entities, openProjectId },
            },
        } = getState()

        // checking to see if block already exists
        if (blocks.ids.includes(project.id)) {
            // if so call update function and do not dispatch
            // actions that remove/add project to update id
            const updatedBlock = await updateCustomBlock(project)

            await dispatch(
                blockUpdateOne({ id: updatedBlock.id, changes: updatedBlock })
            )

            return values
        }

        // if project id does not exist in blocks, call save new block
        try {
            const savedBlock = await saveNewBlock(project)

            await dispatch(blockAddOne(savedBlock))

            const updatedValues = { ...values }
            delete updatedValues.projects[`${project.id}`]

            updatedValues.projects[`${savedBlock.id}`] = { ...savedBlock }

            const index = entities[openProjectId].index

            await dispatch(setOpenProjectId(savedBlock.id))

            await dispatch(projectRemoveOne(project.id))

            await dispatch(
                projectAddOne({
                    id: savedBlock.id,
                    activeFile: entities[project.id].activeFile,
                    index,
                })
            )

            return updatedValues
        } catch (error) {
            console.log('error', error)
        }
    }

export default saveBlockAndUpdateProject
