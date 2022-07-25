import React from 'react'
import { useSelector } from 'react-redux'
import { selectBlockIds } from 'features/blocks/blocks-selectors'
import Block from './Block'

function Blocks(props) {
    const blockIds = useSelector(selectBlockIds)
    return (
        <div>
            {blockIds.map((block) => {
                return <Block id={block} key={block} />
            })}
        </div>
    )
}
export default Blocks
