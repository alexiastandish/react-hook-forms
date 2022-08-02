import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectBlockIds } from 'features/blocks/blocks-selectors'
import Block from './Block'
// import { setOpenProjectId } from 'features/projects/projects-slice'
// import Test from 'components/Test'

function Blocks() {
    const blockIds = useSelector(selectBlockIds)
    // const dispatch = useDispatch()
    // const navigate = useNavigate()

    return (
        <div>
            {/* <Test /> */}
            <h3>Custom Blocks Bank</h3>

            {blockIds.map((block) => {
                return <Block id={block} key={block} />
            })}
        </div>
    )
}
export default Blocks
