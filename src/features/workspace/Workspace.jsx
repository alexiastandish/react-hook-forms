import React, { useEffect, useMemo, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
    useForm,
    useFieldArray,
    useController,
    useWatch,
} from 'react-hook-form'
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

    const { control, handleSubmit, register } = useForm({
        mode: 'onChange',
    })

    const { fields, append, update, remove } = useFieldArray({
        control,
        name: 'projects',
        defaultValues: {
            projects: [],
        },
    })

    const onSubmit = (data) => console.log('data', data)

    useEffect(() => {
        if (openProjectId && !openProjectIds.includes(openProjectId)) {
            dispatch(initEditor(openProjectId)).then((project) => {
                append({
                    title: project.title,
                    key: project.id,
                })
            })
        }
        return () => {}
    }, [openProjectId, dispatch, openProjectIds])

    const openProjectIndex = fields.findIndex(
        (project) => project.key === openProjectId
    )

    return (
        <Box sx={{ flexGrow: 1 }}>
            <DevTool control={control} placement="top-right" />

            {fields.length > 0 ? (
                <Grid>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        {fields.map((field, index) => {
                            console.log('field', field)
                            return (
                                <fieldset key={field.id}>
                                    <Edit
                                        control={control}
                                        update={update}
                                        index={index}
                                        value={field}
                                        register={register}
                                    />
                                </fieldset>
                            )
                        })}

                        <input type="submit" />
                    </form>

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

const Edit = ({ register, update, index, value }) => {
    const { watch, control } = useForm({
        defaultValues: value,
    })
    console.log('value', value)

    return (
        <div>
            <Display control={control} index={index} />

            <input {...register(`projects.${index}.title`)} />

            {/* <button
                type="button"
                onClick={handleSubmit((data) => {
                    console.log('MOP', data)
                    update(index, data)
                })}
            >
                Submit
            </button> */}
        </div>
    )
}

const Display = ({ control, index }) => {
    const data = useWatch({
        control,
    })
    console.log('ME', data)
    if (!data?.title) return null

    return (
        <div>
            <p>{data?.title}</p>
        </div>
    )
}
