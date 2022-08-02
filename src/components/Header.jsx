import React from 'react'
import Button from '@mui/material/Button'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
    projectsRemoveAll,
    setOpenProjectId,
} from 'features/projects/projects-slice'

function Header({ isDirty, setAlert }) {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    return (
        <div>
            <Button
                onClick={() => {
                    if (isDirty) {
                        return setAlert({ type: 'unsaved', active: true })
                    }
                    dispatch(setOpenProjectId(''))
                    dispatch(projectsRemoveAll())
                    return navigate('/')
                }}
            >
                Close
            </Button>
        </div>
    )
}
export default Header
