import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useForm, useWatch } from 'react-hook-form'
import { selectBlockEntities } from 'features/blocks/blocks-selectors'
import initEditor from 'utils/init-editor'
import { Tabs as StyledTabs } from '@mui/material'
import Tab from '@mui/material/Tab'
import Tabs from 'components/Tabs'
import Box from '@mui/material/Box'
import modalAlerts from 'constants/modal-alerts.json'
import AlertModal from 'components/AlertModal'
import { v4 as uuidv4 } from 'uuid'
// import * as yup from 'yup'
// import { yupResolver } from '@hookform/resolvers/yup'
import { DevTool } from '@hookform/devtools'
import {
    selectAllProjects,
    selectProjectEntities,
} from 'features/projects/projects-selectors'
import { setOpenProjectId } from 'features/projects/projects-slice'
import defaultValues from 'constants/default-block-state.json'
import Header from 'components/Header'

import saveBlockAndUpdateProject from 'thunks/saveBlockAndUpdateProject'

function Workspace() {
    const [alert, setAlert] = useState({ type: null, active: false })

    const openProjectId = useSelector(
        (state) => state.workspace.projects.openProjectId
    )

    const openProjectIds = useSelector((state) => state.workspace.projects.ids)

    const blockEntities = useSelector(selectBlockEntities)
    const projectEntities = useSelector(selectProjectEntities)
    const projects = useSelector(selectAllProjects)

    const dispatch = useDispatch()

    const {
        control,
        register,
        resetField,
        getValues,
        handleSubmit,
        formState,
    } = useForm({
        mode: 'onChange',
        name: 'projects',
        defaultValues: { projects: {} },
    })

    const { isDirty } = formState

    const values = getValues()

    const onSubmit = async (data) => {
        const submitProject = data.projects[openProjectId]
        dispatch(saveBlockAndUpdateProject(submitProject))
    }

    useEffect(() => {
        if (openProjectId && !openProjectIds.includes(openProjectId)) {
            dispatch(initEditor(openProjectId)).then((project) => {
                const blockExists = blockEntities[project.id] || {
                    ...defaultValues,
                    id: project.id,
                }
                return resetField(`projects.${project.id}`, {
                    defaultValue: { ...blockExists },
                    keepDirty: true,
                    keepTouched: true,
                    keepError: true,
                })
            })
        }
        if (!openProjectId) {
            dispatch(setOpenProjectId(uuidv4()))
        }
        return () => {}
    }, [openProjectId, dispatch, openProjectIds])

    const handleSelectTab = (_, id) => {
        dispatch(setOpenProjectId(id))
    }

    const results = useWatch({ name: `projects.${openProjectId}`, control })

    const openProjectIndex = projects.findIndex((proj) => {
        return proj.id === openProjectId
    })
    const activeFileType =
        openProjectId &&
        projectEntities[`${openProjectId}`] &&
        projectEntities[`${openProjectId}`].activeFile

    return (
        <Box sx={{ flexGrow: 1 }}>
            <DevTool control={control} placement="top-right" />
            <Header isDirty={isDirty} setAlert={setAlert} />
            <StyledTabs onChange={handleSelectTab} value={openProjectId}>
                {openProjectIds.includes(openProjectId) &&
                    openProjectIds.map((projectId) => {
                        if (openProjectIds.includes(projectId)) {
                            return (
                                <Tab
                                    label={results?.title || 'Untitled'}
                                    key={projectId}
                                    value={projectId}
                                />
                            )
                        }
                        return null
                    })}
            </StyledTabs>

            <form onSubmit={handleSubmit(onSubmit)}>
                <input
                    key={`projects.${openProjectId}.title`}
                    {...register(`projects.${openProjectId}.title`)}
                />
                <input
                    key={`projects.${openProjectId}.${activeFileType}`}
                    {...register(`projects.${openProjectId}.${activeFileType}`)}
                />
                {openProjectId}
                <input type="submit" />
            </form>

            {openProjectIds.includes(openProjectId) && (
                <Tabs
                    openProjectIndex={openProjectIndex}
                    openProjectId={openProjectId}
                />
            )}

            {alert.active && (
                <AlertModal
                    open={alert.active}
                    header={modalAlerts[alert.type].header}
                    subtext={modalAlerts[alert.type].subtext}
                    actions={modalAlerts[alert.type].actions}
                    setAlert={setAlert}
                    values={values}
                    value={values.projects[`${openProjectId}`]}
                />
            )}
        </Box>
    )
}
export default Workspace
