import {
    projectsSetAll,
    setOpenProjectId,
} from 'features/projects/projects-slice'
import getResetIndex from 'utils/get-reset-index'

const removeProjectAndField =
    (id, values, reset) => async (dispatch, getState) => {
        const {
            workspace: { projects },
        } = getState()

        const openProjectIndex = projects.entities[id].index

        const nextProjectIndex = getResetIndex(openProjectIndex)
        const nextProject = Object.values(projects.entities).filter(
            (project) => project.index === nextProjectIndex
        )[0]

        await dispatch(setOpenProjectId(nextProject?.id || null))

        const updatedProjects = {}
        Object.values(projects.entities).map((updatedProject) => {
            if (updatedProject.index !== openProjectIndex) {
                if (updatedProject.index > openProjectIndex) {
                    updatedProjects[updatedProject.id] = {
                        ...updatedProject,
                        index: updatedProject.index - 1,
                    }
                } else {
                    updatedProjects[updatedProject.id] = {
                        ...updatedProject,
                    }
                }
            }
        })

        await dispatch(
            projectsSetAll({
                changes: updatedProjects,
            })
        )

        const updatedValues = { ...values }
        delete updatedValues.projects[`${id}`]

        return reset(updatedValues, {
            keepDirty: false,
            keepTouched: false,
            keepError: false,
        })
    }

export default removeProjectAndField
