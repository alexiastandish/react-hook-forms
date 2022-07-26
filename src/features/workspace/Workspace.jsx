import React, { useEffect, useMemo, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useForm, useFieldArray, useController } from 'react-hook-form'
import { selectAllBlocksArray } from 'features/blocks/blocks-selectors'
import WorkspaceBlocksList from './WorkspaceBlocksList'
import Projects from 'components/Projects'
import initEditor from 'utils/init-editor'
import Tabs from 'components/Tabs'
import ActiveProjectTabs from 'features/projects/ActiveProjectTabs'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import modalAlerts from 'constants/modal-alerts.json'
import AlertModal from 'components/AlertModal'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { DevTool } from '@hookform/devtools'

function Workspace() {
    const [alert, setAlert] = useState({ type: null, active: false })

    const openProjectId = useSelector(
        (state) => state.workspace.projects.openProjectId
    )
    const loaded = useSelector(
        (state) => state.workspace.projects.openProjectId
    )
    const openProjectIds = useSelector((state) => state.workspace.projects.ids)

    const blocks = useSelector(selectAllBlocksArray)

    const dispatch = useDispatch()

    const schema = yup
        .object()
        .shape({
            title: yup.string().required(),
        })
        .required()

    const onSubmit = (data) => console.log('data, data', data)

    const { register, control, handleSubmit, setValue } = useForm({
        mode: 'onChange',
        // defaultValues: {
        //     projects: useMemo(() => {
        //         const defaultBlockValues = blocks.filter((block) => {
        //             return openProjectIds.includes(block.id)
        //         })
        //         return defaultBlockValues
        //     }, [blocks, openProjectIds]),
        // },

        defaultValues: { projects: [] },
        resolver: yupResolver(schema),
    })

    const { fields, append, replace, prepend, remove, swap, move, insert } =
        useFieldArray({
            control,
            name: 'projects',
        })

    useEffect(() => {
        if (openProjectId && !openProjectIds.includes(openProjectId)) {
            dispatch(initEditor(openProjectId)).then((project) => {
                append({
                    ...project,
                    // id: project.id,
                    key: project.id,
                })

                // const defaultBlockValues = blocks.filter((block) => {
                //     console.log('block', block)
                //     return block.id === openProjectId
                // })

                // console.log('defaultBlockValues', defaultBlockValues)
                // setValue(`projects.0`, defaultBlockValues[0], {
                //     shouldDirty: false,
                // })

                // register(`projects.${project.id}`)
            })
        }
        return () => {}
    }, [openProjectId, dispatch, openProjectIds, append])

    const openProjectIndex = fields.findIndex(
        (project) => project.key === openProjectId
    )

    return (
        <Box sx={{ flexGrow: 1 }}>
            <DevTool control={control} placement="top-right" />

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
                                    openProjectIndex={openProjectIndex}
                                    openProjectId={openProjectId}
                                />
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <Projects
                                        fields={fields}
                                        control={control}
                                        handleSubmit={handleSubmit}
                                        register={register}
                                        openProjectIndex={openProjectIndex}
                                    />
                                    <input type="submit" />
                                </form>
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
            {alert.active && (
                <AlertModal
                    open={alert.active}
                    header={modalAlerts[alert.type].header}
                    subtext={modalAlerts[alert.type].subtext}
                    actions={modalAlerts[alert.type].actions}
                    setAlert={setAlert}
                />
            )}
        </Box>
    )
}
export default Workspace
