import Projects from 'components/Projects'
import Blocks from 'features/blocks/Blocks'
import Workspace from 'features/workspace/Workspace'
import { Routes as Router, Route } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import { useNavigate } from 'react-router-dom'
import { Button } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { setOpenProjectId } from 'features/projects/projects-slice'

const Routes = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    return (
        <div className="App">
            <Button
                onClick={() => {
                    dispatch(setOpenProjectId(uuidv4()))
                    return navigate('workspace')
                }}
            >
                New Project
            </Button>

            <Router>
                <Route path="/" element={<Blocks />} />
                <Route path="/workspace" element={<Workspace />} />
                <Route path="/test-form" element={<Projects />} />
            </Router>
        </div>
    )
}

export default Routes
