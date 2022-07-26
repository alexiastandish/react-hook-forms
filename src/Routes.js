import Projects from 'components/Projects'
import Blocks from 'features/blocks/Blocks'
import Workspace from 'features/workspace/Workspace'
import { Routes as Router, Route } from 'react-router-dom'

const Routes = () => {
    return (
        <div className="App">
            <Router>
                <Route path="/" element={<Blocks />} />
                <Route path="/workspace" element={<Workspace />} />
                <Route path="/test-form" element={<Projects />} />
            </Router>
        </div>
    )
}

export default Routes
