import { useForm } from 'react-hook-form'
import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Typography from '@mui/material/Typography'

import {
    selectOpenProjectId,
    selectProjectIds,
} from 'features/projects/projects-selectors'
import { DevTool } from '@hookform/devtools'
import { setOpenProjectId } from 'features/projects/projects-slice'

function Editor(props) {
    const location = useLocation()
    const dispatch = useDispatch()

    const openProjectId = useSelector(selectOpenProjectId)
    const [activeProjectId, setActiveProjectId] = useState()

    const onSubmit = async (data) => {
        // console.loglog('data', data)
        // const submitProject = data.projects[openProjectId]
        // dispatch(
        //     saveBlockAndUpdateProject(
        //         submitProject,
        //         values,
        //         resetField,
        //         reset,
        //         register,
        //         unregister
        //     )
        // )
    }

    const { register, handleSubmit, setValue, getValues, control, resetField } =
        useForm({
            mode: 'onChange',
            name: 'projects',
            defaultValues: { projects: {} },
        })
    const values = getValues()

    const isActiveBlock = useSelector(
        (state) => state.blocks.entities[openProjectId]
    )
    const activeProjectValus = useSelector(
        (state) => state.workspace.projects.entities[openProjectId]
    )
    // console.loglog('activeProjectValus', activeProjectValus)

    useEffect(() => {
        // console.loglog('isActiveBlock', isActiveBlock)
        const fields = ['id', 'title', 'fonts']
        // console.loglog('values', values)
        if (isActiveBlock) {
            // fields.forEach((field) => {
            //     // console.loglog('field', field)
            //     setValue(
            //         `projects.${openProjectId}.${field}`,
            //         isActiveBlock[field]
            //     )
            // })

            //  resetField(`projects.${openProjectId}`, {
            //      defaultValue: { id: openProjectId, title: '', fonts: [] },

            return resetField(`projects.${isActiveBlock.id}`, {
                defaultValue: {
                    id: isActiveBlock.id,
                    title: isActiveBlock.title,
                    fonts: isActiveBlock.fonts,
                },
                keepDirty: true,
                keepTouched: true,
                keepError: true,
            })
        } else {
            resetField(`projects.${openProjectId}`, {
                defaultValue: { id: openProjectId, title: '', fonts: [] },
            })
        }
    }, [isActiveBlock, openProjectId, resetField, setValue])
    // console.loglog('values', values)
    // const projectIds = useSelector(selectProjectIds)

    return (
        <>
            <DevTool control={control} placement="bottom-right" />

            <Typography variant="h4" gutterBottom component="div">
                {activeProjectValus?.id} - {activeProjectValus?.title}
            </Typography>

            <div>
                Tabs:{' '}
                {values?.projects &&
                    Object.values(values.projects).map((value, index) => {
                        // console.loglog('value', value)
                        // if (value)

                        return (
                            <div
                                style={{
                                    color:
                                        value.id === openProjectId
                                            ? 'red'
                                            : 'black',
                                }}
                                onClick={() =>
                                    dispatch(setOpenProjectId(value.id))
                                }
                            >
                                {`${value.title || 'Untitled'}-${index}`}
                            </div>
                        )
                    })}
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
                <input {...register(`projects.${openProjectId}.title`)} />
                <input type="submit" />
            </form>
        </>
    )
}
export default Editor
