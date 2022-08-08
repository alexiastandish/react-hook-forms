import { setOpenProjectId } from 'features/projects/projects-slice'
import React from 'react'
import { useDispatch } from 'react-redux'

function BlocksSidebar({ allBlocks }) {
    const dispatch = useDispatch()
    return (
        <div>
            {allBlocks.map((block) => {
                return (
                    <div
                        onClick={() => dispatch(setOpenProjectId(block.id))}
                        key={block.id}
                    >
                        {block.title} - {block.id}
                    </div>
                )
            })}
        </div>
    )
}
export default BlocksSidebar
