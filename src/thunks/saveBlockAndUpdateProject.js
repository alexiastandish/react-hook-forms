import { saveNewBlock, updateCustomBlock } from 'features/blocks/blocks-api'
import {
    setOpenProjectId,
    projectUpdateOne,
} from 'features/projects/projects-slice'
import { blockAddOne, blockUpdateOne } from '../features/blocks/blocks-slice'

const saveBlockAndUpdateProject =
    (project, values, resetField, reset, unregister) =>
    async (dispatch, getState) => {
        const {
            blocks,
            workspace: {
                projects: { entities, openProjectId },
            },
        } = getState()

        if (blocks.ids.includes(project.id)) {
            const updatedBlock = await updateCustomBlock(project)
            await dispatch(
                blockUpdateOne({ id: updatedBlock.id, changes: updatedBlock })
            )
            return resetField(`projects.${project.id}`, {
                defaultValue: { ...updatedBlock },
                keepDirty: false,
                keepTouched: false,
                keepError: false,
            })
        }

        try {
            const savedBlock = await saveNewBlock(project)
            await dispatch(blockAddOne(savedBlock))
            const activeProject = entities[openProjectId]
            await dispatch(
                projectUpdateOne({
                    id: project.id,
                    changes: { ...activeProject, customBlockId: savedBlock.id },
                })
            )
            await dispatch(setOpenProjectId(savedBlock.id))

            resetField(`projects.${savedBlock.id}`, {
                defaultValue: { ...savedBlock },
                keepDirty: true,
                keepTouched: true,
                keepError: true,
            })

            return unregister(`projects.${project.id}`, {
                keepDirty: false,
                keepDefaultValue: false,
                keepError: false,
                keepIsValid: false,
                keepTouched: false,
                keepValue: false,
            })
        } catch (error) {
            console.log('error', error)
        }
    }

export default saveBlockAndUpdateProject
