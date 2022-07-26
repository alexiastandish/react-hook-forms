import { selectProjectIds } from 'features/projects/projects-selectors'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { projectAddOne, setOpenProjectId } from '../projects/projects-slice'

function WorkspaceBlocksList({ blocks, append }) {
    const openProjectIds = useSelector(selectProjectIds)
    const dispatch = useDispatch()
    return (
        <div>
            {blocks.map((block) => {
                return (
                    <div key={block.id}>
                        <p style={{ color: 'red' }}>{block.id}</p>
                        <button
                            type="button"
                            onClick={() => {
                                dispatch(setOpenProjectId(block.id))
                                if (!openProjectIds.includes(block.id)) {
                                    dispatch(
                                        projectAddOne({
                                            id: block.id,
                                            activeFile: 'html',
                                        })
                                    )
                                    append({
                                        key: block.id,
                                        ...block,
                                    })
                                }
                            }}
                        >
                            Open in editor
                        </button>
                    </div>
                )
            })}
        </div>
    )
}
export default WorkspaceBlocksList
