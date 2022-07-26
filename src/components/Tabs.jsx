import { setActiveFileInProject } from 'features/projects/projects-slice'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Tabs as StyledTabs, Tab as StyledTab } from '@mui/material'
import { selectActiveFile } from 'features/editor/editor-selectors'

function Tabs({ openProjectId }) {
    const dispatch = useDispatch()
    const activeFile = useSelector(selectActiveFile)

    const handleChange = (_, value) => {
        dispatch(setActiveFileInProject({ id: openProjectId, file: value }))
    }
    return (
        <div>
            <StyledTabs value={activeFile} onChange={handleChange}>
                <StyledTab value="html" label="HTML" />
                <StyledTab value="css" label="CSS" />
                <StyledTab value="js" label="JS" />
            </StyledTabs>
        </div>
    )
}
export default Tabs
