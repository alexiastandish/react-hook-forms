import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectBlockById } from './blocks-selectors'
import { useNavigate } from 'react-router-dom'
import {
    addActiveProjectId,
    setOpenProjectId,
} from 'features/workspace/workspace-slice'

function Block({ id }) {
    const block = useSelector((state) => selectBlockById(state, id))
    const navigate = useNavigate()
    const dispatch = useDispatch()

    return (
        <div
            onClick={() => {
                dispatch(setOpenProjectId(block.id))
                dispatch(addActiveProjectId(block.id))
                return navigate('workspace')
            }}
        >
            {block.id}
        </div>
    )
}
export default Block
