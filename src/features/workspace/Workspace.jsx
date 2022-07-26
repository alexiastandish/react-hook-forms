import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useForm, useFieldArray, useWatch } from 'react-hook-form'
import {
    selectAllBlocksArray,
    selectBlockEntities,
} from 'features/blocks/blocks-selectors'
import initEditor from 'utils/init-editor'
import { Tabs as StyledTabs } from '@mui/material'
import Button from '@mui/material/Button'
import Tab from '@mui/material/Tab'
import Tabs from 'components/Tabs'
import Box from '@mui/material/Box'
import modalAlerts from 'constants/modal-alerts.json'
import AlertModal from 'components/AlertModal'
import { DevTool } from '@hookform/devtools'
import { selectAllProjects } from 'features/projects/projects-selectors'
import { setOpenProjectId } from 'features/projects/projects-slice'
import defaultValues from 'constants/default-block-state.json'
import Header from 'components/Header'
import saveBlockAndUpdateProject from 'thunks/saveBlockAndUpdateProject'
import BlocksSidebar from 'features/blocks/BlocksSidebar'
import removeProjectAndField from 'thunks/removeProjectAndField'

function Workspace() {
    const [alert, setAlert] = useState({ type: null, active: false })

    const openProjectId = useSelector(
        (state) => state.workspace.projects.openProjectId
    )

    const openProjectIds = useSelector((state) => state.workspace.projects.ids)

    const blockEntities = useSelector(selectBlockEntities)

    const activeFile = useSelector((state) => {
        return (
            state.workspace.projects.entities[openProjectId]?.activeFile || ''
        )
    })
    const projects = useSelector(selectAllProjects)
    const allBlocks = useSelector(selectAllBlocksArray)

    const dispatch = useDispatch()

    const {
        control,
        register,
        resetField,
        getValues,
        handleSubmit,
        formState,
        unregister,
        reset,
        setValue,
    } = useForm({
        mode: 'onChange',
        name: 'projects',
        defaultValues: { projects: {} },
    })

    const { isDirty } = formState

    const values = getValues()

    const onSubmit = async (data) => {
        const submitProject = data.projects[openProjectId]
        dispatch(
            saveBlockAndUpdateProject(
                submitProject,
                values,
                resetField,
                reset,
                unregister
            )
        )
    }
    console.log('values', values)
    const fieldIds = (values?.projects && Object.keys(values.projects)) || []

    useEffect(() => {
        if (openProjectId && !fieldIds.includes(openProjectId)) {
            dispatch(initEditor(openProjectId)).then((project) => {
                if (!project) {
                    return
                }
                const blockExists = blockEntities[project.id] || {
                    ...defaultValues,
                    id: project.id,
                }

                console.log('here')
                return resetField(`projects.${project.id}`, {
                    defaultValue: { ...blockExists },
                    keepDirty: true,
                    keepTouched: true,
                    keepError: true,
                })
            })
        }
    }, [openProjectId, dispatch, fieldIds])

    const handleSelectTab = (_, id) => {
        dispatch(setOpenProjectId(id))
    }

    useWatch({ name: `projects.${openProjectId}`, control })

    const openProjectIndex = projects.findIndex((proj) => {
        return proj.id === openProjectId
    })

    console.log('formState', formState)
    const openProjectDirtyFields = formState.dirtyFields?.projects
        ? formState.dirtyFields?.projects?.[`${openProjectId}`]
        : ''

    console.log('values', values)

    const fonts = values?.projects?.[`${openProjectId}`]?.fonts

    const fontsLength = values?.projects?.[`${openProjectId}`]?.fonts?.length

    // const renderFontButton =
    //     fonts && fontsLength === 0
    //         ? true
    //         : fonts[fontsLength - 1].url
    //         ? true
    //         : false

    return (
        <Box sx={{ flexGrow: 1 }}>
            <DevTool control={control} placement="bottom-right" />
            <Header isDirty={isDirty} setAlert={setAlert} />

            <StyledTabs onChange={handleSelectTab} value={openProjectId}>
                {openProjectIds.includes(openProjectId) &&
                    openProjectIds.map((projectId) => {
                        if (openProjectIds.includes(projectId)) {
                            console.log('projectId', projectId)
                            return (
                                <Tab
                                    label={
                                        values?.projects?.[`${projectId}`]
                                            ?.title || 'Untitled'
                                    }
                                    key={projectId}
                                    value={projectId}
                                />
                            )
                        }
                        return null
                    })}
            </StyledTabs>

            {activeFile && (
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input
                        key={`projects.${openProjectId}.title`}
                        {...register(`projects.${openProjectId}.title`)}
                    />
                    <input
                        key={`projects.${openProjectId}.${activeFile}`}
                        {...register(`projects.${openProjectId}.${activeFile}`)}
                    />

                    {values?.projects?.[`${openProjectId}`]?.fonts &&
                        values?.projects?.[`${openProjectId}`]?.fonts.map(
                            (font, index) => {
                                return (
                                    <>
                                        <input
                                            key={`projects.${openProjectId}.fonts[${index}]`}
                                            {...register(
                                                `projects.${openProjectId}.fonts[${index}].url`
                                            )}
                                        />
                                        <Button
                                            onClick={() => {
                                                const updatedFonts = [...fonts]
                                                updatedFonts.splice(index, 1)

                                                setValue(
                                                    `projects.${openProjectId}.fonts`,
                                                    updatedFonts
                                                )
                                            }}
                                        >
                                            x
                                        </Button>
                                    </>
                                )
                            }
                        )}

                    <Button
                        onClick={() => {
                            if (fonts) {
                                return setValue(
                                    `projects.${openProjectId}.fonts`,
                                    [...fonts, { type: 'font', url: '' }]
                                )
                            } else {
                                setValue(`projects.${openProjectId}.fonts`, [
                                    { type: 'font', url: '' },
                                ])
                            }
                        }}
                    >
                        add font field
                    </Button>

                    <Button
                        onClick={() => {
                            if (openProjectDirtyFields) {
                                return setAlert({
                                    type: 'unsaved',
                                    active: true,
                                })
                            }
                            dispatch(
                                removeProjectAndField(
                                    openProjectId,
                                    resetField,
                                    unregister
                                )
                            )
                        }}
                    >
                        Remove
                    </Button>

                    <input type="submit" />
                    <p style={{ fontSize: 10 }}> {openProjectId}</p>
                </form>
            )}

            {openProjectIds.includes(openProjectId) && (
                <Tabs
                    openProjectIndex={openProjectIndex}
                    openProjectId={openProjectId}
                />
            )}

            <BlocksSidebar allBlocks={allBlocks} />

            {alert.active && (
                <AlertModal
                    open={alert.active}
                    header={modalAlerts[alert.type].header}
                    subtext={modalAlerts[alert.type].subtext}
                    actions={modalAlerts[alert.type].actions}
                    setAlert={setAlert}
                    dirtyFields={formState.dirtyFields}
                    openProjectId={openProjectId}
                    values={values}
                    resetField={resetField}
                    unregister={unregister}
                    // value={values.projects[`${openProjectId}`]}
                />
            )}
        </Box>
    )
}
export default Workspace
