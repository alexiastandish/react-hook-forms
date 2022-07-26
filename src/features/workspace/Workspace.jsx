import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useForm, useFieldArray } from 'react-hook-form'
import { selectAllBlocksArray } from 'features/blocks/blocks-selectors'
import WorkspaceBlocksList from './WorkspaceBlocksList'
import Projects from 'components/Projects'
import initEditor from 'utils/init-editor'
import Tabs from 'components/Tabs'
import ActiveProjectTabs from 'features/projects/ActiveProjectTabs'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'

function Workspace() {
    const openProjectId = useSelector(
        (state) => state.workspace.projects.openProjectId
    )
    const loaded = useSelector(
        (state) => state.workspace.projects.openProjectId
    )
    const openProjectIds = useSelector((state) => state.workspace.projects.ids)
    const blocks = useSelector(selectAllBlocksArray)

    const dispatch = useDispatch()

    const { register, control, handleSubmit, setValue } = useForm()
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'projects',
    })

    useEffect(() => {
        if (openProjectId && !openProjectIds.includes(openProjectId)) {
            dispatch(initEditor(openProjectId)).then((project) => {
                append({
                    ...project,
                    id: project.id,
                    key: project.id,
                })
            })
        }
        return () => {}
    }, [openProjectId, dispatch, openProjectIds, append])

    const openProjectIndex = fields.findIndex(
        (project) => project.key === openProjectId
    )

    return (
        <Box sx={{ flexGrow: 1 }}>
            {fields.length > 0 ? (
                <Grid container spacing={2}>
                    <Grid item xs={8}>
                        {loaded && (
                            <>
                                <ActiveProjectTabs
                                    openProjectId={openProjectId}
                                    openProjectIds={openProjectIds}
                                    fields={fields}
                                />
                                <Tabs
                                    setValue={setValue}
                                    openProjectIndex={openProjectIndex}
                                    openProjectId={openProjectId}
                                />
                                <Projects
                                    fields={fields}
                                    control={control}
                                    handleSubmit={handleSubmit}
                                    setValue={setValue}
                                    register={register}
                                    openProjectIndex={openProjectIndex}
                                />
                            </>
                        )}
                    </Grid>
                    <Grid item xs={4}>
                        <WorkspaceBlocksList blocks={blocks} append={append} />
                    </Grid>
                </Grid>
            ) : (
                <div>loading</div>
            )}
        </Box>
    )
}
export default Workspace
