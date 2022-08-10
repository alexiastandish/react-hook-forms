// import Projects from 'components/Projects'
// import Home from 'features/blocks/Blocks'
import Home from './version2/components/Home'
import Workspace from 'features/workspace/Workspace'
import { Routes as Router, Route } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import { useNavigate } from 'react-router-dom'
import { Button } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import {
    setOpenProjectId,
    projectAddOne,
} from 'features/projects/projects-slice'
import { selectAllBlocksArray } from 'features/blocks/blocks-selectors'
import Editor from 'version2/components/Editor'

const Routes = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const blocks = useSelector(selectAllBlocksArray)
    // console.log('blocks', blocks)

    return (
        <div className="App">
            <Button
                onClick={() => {
                    const id = uuidv4()
                    dispatch(setOpenProjectId(id))
                    return navigate('workspace', { state: { id: null } })
                }}
            >
                New Project
            </Button>

            <Router>
                <Route path="/" element={<Home />} />
                <Route path="/workspace" element={<Workspace />} />
            </Router>
        </div>
    )
}

export default Routes
