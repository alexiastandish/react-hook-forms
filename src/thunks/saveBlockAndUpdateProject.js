import { saveNewBlock, updateCustomBlock } from 'features/blocks/blocks-api'
import {
    projectRemoveOne,
    projectAddOne,
    setOpenProjectId,
} from 'features/projects/projects-slice'
import { blockAddOne, blockUpdateOne } from '../features/blocks/blocks-slice'

const saveBlockAndUpdateProject = (project) => async (dispatch, getState) => {
    const {
        blocks,
        workspace: {
            projects: { entities },
        },
    } = getState()

    // checking to see if block already exists
    if (blocks.ids.includes(project.id)) {
        // if so call update function and do not dispatch
        // actions that remove/add project to update id
        const updatedBlock = await updateCustomBlock(project)
        console.log('updatedBlock', updatedBlock)

        await dispatch(
            blockUpdateOne({ id: updatedBlock.id, changes: updatedBlock })
        )
        return
    }

    // if project id does not exist in blocks, call save new block
    try {
        const savedBlock = await saveNewBlock(project)

        await dispatch(blockAddOne(savedBlock))
        await dispatch(setOpenProjectId(savedBlock.id))

        // dispatch actions that remove/add project to update id from backend response
        await dispatch(projectRemoveOne(project.id))
        await dispatch(
            projectAddOne({
                id: savedBlock.id,
                activeFile: entities[project.id].activeFile,
            })
        )
    } catch (error) {
        console.log('error', error)
    }
}

export default saveBlockAndUpdateProject
