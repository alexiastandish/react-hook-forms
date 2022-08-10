import React, { useEffect, useMemo, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
    useForm,
    useFieldArray,
    useFormContext,
    useWatch,
    FormProvider,
} from 'react-hook-form'
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
import {
    selectAllProjects,
    selectProjectEntities,
} from 'features/projects/projects-selectors'
import { setOpenProjectId } from 'features/projects/projects-slice'
import Header from 'components/Header'
import saveBlockAndUpdateProject from 'thunks/saveBlockAndUpdateProject'
import BlocksSidebar from 'features/blocks/BlocksSidebar'
import removeProjectAndField from 'thunks/removeProjectAndField'
// import FontImports from 'components/FontImports'
import addProjectAndField from 'thunks/addProjectAndField'
import useProjectForms from 'hooks/useProjectForms'

// ADD PROJECT - adds to project entities and fields
// REMOVE PROJECT - removes from project entities and fields
// CHANGE ACTIVE PROJECT / SWITCH BETWEEN TABS
// SAVE PROJECT - calls function that reshapes block for database, saves block to db, potentially updates project id
function Workspace({ initialCustomBlockId = null }) {
    // const [alert, setAlert] = useState({ type: null, active: false })

    const openProjectId = useSelector(
        (state) => state.workspace.projects.openProjectId
    )

    const customBlocksInitialized = useSelector(
        (state) => state.blocks.initialized
    )
    const openProjectIds = useSelector((state) => state.workspace.projects.ids)

    const activeFile = useSelector((state) => {
        return (
            state.workspace.projects.entities[openProjectId]?.activeFile || ''
        )
    })
    const projects = useSelector(selectAllProjects)
    const allBlocks = useSelector(selectAllBlocksArray)

    const dispatch = useDispatch()

    // _______________________

    const { methods } = useProjectForms(openProjectId)
    const { dirtyFields, isDirty } = methods.formState
    console.log('dirtyFields', dirtyFields)
    console.log('isDirty', isDirty)
    // console.log('methods.formState()', methods.formState())
    // _______________________

    useEffect(() => {
        dispatch(
            addProjectAndField({
                customBlockId: initialCustomBlockId,
                resetField: methods.resetField,
                register: methods.register,
                setValue: methods.setValue,
            })
        )
    }, [initialCustomBlockId])

    const handleSelectTab = (_, id) => {
        dispatch(setOpenProjectId(id))
    }

    const openProjectIndex = projects.findIndex((proj) => {
        return proj.id === openProjectId
    })

    const values = methods.getValues()

    if (!openProjectId || !customBlocksInitialized) {
        return null
    }

    console.log('values', values)
    console.log('openProjectId', openProjectId)

    return (
        <FormProvider {...methods}>
            <Box sx={{ flexGrow: 1 }}>
                <DevTool control={methods.control} placement="bottom-right" />
                {/* <Header isDirty={methodsisDirty} setAlert={setAlert} /> */}

                <StyledTabs onChange={handleSelectTab} value={openProjectId}>
                    {openProjectIds.includes(openProjectId) &&
                        openProjectIds.map((projectId) => {
                            if (openProjectIds.includes(projectId)) {
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

                <form
                    onSubmit={methods.handleSubmit((data) =>
                        console.log('submitting', data)
                    )}
                >
                    <TitleInput
                        // key={`projectForms.${openProjectId}.title`}
                        openProjectId={openProjectId}
                    />
                    {/* <EditorInput
                        openProjectId={openProjectId}
                        activeFile={activeFile}
                    /> */}
                    {/* <FontImports openProjectId={openProjectId} /> */}

                    <input type="submit" />
                    <p style={{ fontSize: 10 }}> {openProjectId}</p>
                </form>

                {openProjectIds.includes(openProjectId) && (
                    <Tabs
                        openProjectIndex={openProjectIndex}
                        openProjectId={openProjectId}
                    />
                )}

                <BlocksSidebar allBlocks={allBlocks} />
            </Box>
        </FormProvider>
    )
}
export default Workspace

function TitleInput({ openProjectId }) {
    const { register } = useFormContext()
    return (
        <div>
            <input
                key={`projectForms.${openProjectId}.title`}
                {...register(`projectForms.${openProjectId}.title`)}
            />
        </div>
    )
}

function FontImports({ openProjectId }) {
    const { register, control } = useFormContext()

    const { fields, append, remove, replace } = useFieldArray({
        name: `projectForms.${openProjectId}.fonts`,
        control,
    })
    // console.log('FIELDS', fields)

    return (
        <div>
            FontImports
            {fields &&
                fields.length > 0 &&
                fields.map((field, index) => {
                    // console.log('field', field)
                    return (
                        <input
                            {...register(
                                `projectForms?.${openProjectId}?.fonts?.${index}?.url`
                            )}
                        />
                    )
                })}
            <Button onClick={() => append({ type: 'font', url: '' })}>
                append
            </Button>
        </div>
    )
}

function EditorInput({ openProjectId, activeFile }) {
    const { register, control } = useFormContext()

    return (
        <div>
            <input
                key={`projectForms.${openProjectId}.${activeFile}`}
                {...register(`projectForms.${openProjectId}.${activeFile}`)}
            />
        </div>
    )
}

{
    /* {alert.active && (
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
            )} */
}

{
    /* {values?.projects?.[`${openProjectId}`]?.fonts &&
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
                    </Button> */
}

// const {
//     control,
//     register,
//     resetField,
//     getValues,
//     handleSubmit,
//     formState,
//     unregister,
//     reset,
//     watch,
// } = useForm({
//     mode: 'onChange',
//     name: 'projects',
//     defaultValues: { projects: {} },
// })

// const { isDirty } = formState

// const values = getValues()
// const onSubmit = async (data) => {
//     // console.log('data', data)
//     const submitProject = data.projects[openProjectId]
//     dispatch(
//         saveBlockAndUpdateProject(
//             submitProject,
//             values,
//             resetField,
//             reset,
//             register,
//             unregister
//         )
//     )
// }
// console.log('values', values)

{
    /* <Button
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
</Button> */
}
