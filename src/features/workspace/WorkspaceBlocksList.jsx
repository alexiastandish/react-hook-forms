import React from 'react'
import { useDispatch } from 'react-redux'
import { addActiveProjectId, setOpenProjectId } from './workspace-slice'

function WorkspaceBlocksList({ blocks, append }) {
    const dispatch = useDispatch()
    return (
        <div>
            {blocks.map((block) => {
                return (
                    <div
                        key={block.id}
                        onClick={() => {
                            dispatch(setOpenProjectId(block.id))
                            dispatch(addActiveProjectId(block.id))
                        }}
                    >
                        <p style={{ color: 'red' }}>{block.id}</p>
                        <button
                            type="button"
                            onClick={() => {
                                append({
                                    activeFile: 'html',
                                    customBlock: {
                                        ...block,
                                    },
                                })
                            }}
                        >
                            Append
                        </button>
                    </div>
                )
            })}
        </div>
    )
}
export default WorkspaceBlocksList
