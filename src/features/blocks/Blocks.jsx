import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectBlockIds } from 'features/blocks/blocks-selectors'
import Block from './Block'
import { Button } from '@mui/material'
import { v4 as uuidv4 } from 'uuid'
import { setOpenProjectId } from 'features/projects/projects-slice'
import { useNavigate } from 'react-router-dom'

function Blocks() {
    const blockIds = useSelector(selectBlockIds)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    return (
        <div>
            <h3>Custom Blocks Bank</h3>
            <Button
                onClick={() => {
                    dispatch(setOpenProjectId(uuidv4()))
                    return navigate('workspace')
                }}
            >
                Launch Editor
            </Button>
            {blockIds.map((block) => {
                return <Block id={block} key={block} />
            })}
        </div>
    )
}
export default Blocks
