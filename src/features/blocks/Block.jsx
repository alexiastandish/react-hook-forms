import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectBlockById } from './blocks-selectors'
import { useNavigate } from 'react-router-dom'
import { setOpenProjectId } from 'features/projects/projects-slice'

function Block({ id }) {
    const block = useSelector((state) => selectBlockById(state, id))
    const navigate = useNavigate()
    const dispatch = useDispatch()

    return (
        <div
            onClick={() => {
                dispatch(setOpenProjectId(block.id))
                return navigate('workspace')
            }}
        >
            {block.title} - {block.id}
        </div>
    )
}
export default Block
