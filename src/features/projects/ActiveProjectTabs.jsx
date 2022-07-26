import React from 'react'
import { useDispatch } from 'react-redux'
import { setOpenProjectId } from './projects-slice'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'

function ActiveProjectTabs({ openProjectIds, openProjectId, fields }) {
    console.log('fields', fields)
    const dispatch = useDispatch()

    const handleSelectTab = (_, id) => {
        dispatch(setOpenProjectId(id))
    }

    return (
        <Tabs onChange={handleSelectTab} value={openProjectId}>
            {openProjectIds.map((openProjectId, index) => {
                return (
                    <Tab
                        label={fields[index].title}
                        key={openProjectId}
                        value={openProjectId}
                    />
                )
            })}
        </Tabs>
    )
}
export default ActiveProjectTabs
