import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import initEditor from 'utils/init-editor'
import {
    useForm,
    useController,
    useFieldArray,
    useWatch,
} from 'react-hook-form'
import { selectAllBlocksArray } from 'features/blocks/blocks-selectors'
import WorkspaceBlocksList from './WorkspaceBlocksList'
import BasicForm from 'components/BasicForm'

function Workspace() {
    const openProjectId = useSelector((state) => state.workspace.openProjectId)
    const blocks = useSelector(selectAllBlocksArray)
    const openProjectIndex = blocks.findIndex(
        (block) => block.id === openProjectId
    )

    const { register, control, handleSubmit, setValue } = useForm()
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'projects',
    })

    return (
        <div>
            <WorkspaceBlocksList blocks={blocks} append={append} />
            <BasicForm
                fields={fields}
                control={control}
                handleSubmit={handleSubmit}
                setValue={setValue}
                register={register}
                openProjectIndex={openProjectIndex}
            />
        </div>
    )
}
export default Workspace
