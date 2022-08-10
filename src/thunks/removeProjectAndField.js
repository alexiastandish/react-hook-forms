import {
    projectRemoveOne,
    projectsSetAll,
    setOpenProjectId,
} from 'features/projects/projects-slice'

const removeProjectAndField =
    (id, resetField, unregister) => async (dispatch, getState) => {
        const {
            workspace: { projects },
        } = getState()

        const openProjectIndex = projects.ids.findIndex((item) => item === id)
        const projectIdsLength = projects.ids.length

        let nextProjectId = null

        if (openProjectIndex + 1 === projectIdsLength) {
            nextProjectId = projects.ids[openProjectIndex - 1]
        } else if (openProjectIndex === 0) {
            nextProjectId = projects.ids[1]
        } else {
            nextProjectId = projects.ids[openProjectIndex + 1]
        }

        await dispatch(projectRemoveOne(projects.ids[openProjectIndex]))

        // this step is important for getting the isDirty and dirtyFields of the form firght
        resetField(`projects.${projects.ids[openProjectIndex]}`, {
            keepDirty: false,
            keepTouched: false,
            keepError: false,
        })

        // because you are removeing that full project, might as well remove it from the field projects fully
        unregister(`projects.${projects.ids[openProjectIndex]}`, {
            keepDirty: false,
            keepDefaultValue: false,
            keepError: false,
            keepIsValid: false,
            keepTouched: false,
            keepValue: false,
        })

        await dispatch(setOpenProjectId(nextProjectId || null))
        // const nextProjectIndex = getResetIndex(openProjectIndex)
        // const nextProject = Object.values(projects.entities).filter(
        //     (project) => project.index === nextProjectIndex
        // )[0]

        // await dispatch(setOpenProjectId(nextProject?.id || null))

        // const updatedProjects = {}
        // Object.values(projects.entities).map((updatedProject) => {
        //     if (updatedProject.index !== openProjectIndex) {
        //         if (updatedProject.index > openProjectIndex) {
        //             updatedProjects[updatedProject.id] = {
        //                 ...updatedProject,
        //                 index: updatedProject.index - 1,
        //             }
        //         } else {
        //             updatedProjects[updatedProject.id] = {
        //                 ...updatedProject,
        //             }
        //         }
        //     }
        // })

        // await dispatch(
        //     projectsSetAll({
        //         changes: updatedProjects,
        //     })
        // )

        // const updatedValues = { ...values }
        // delete updatedValues.projects[`${id}`]

        // return reset(updatedValues, {
        //     keepDirty: false,
        //     keepTouched: false,
        //     keepError: false,
        // })
    }

export default removeProjectAndField
