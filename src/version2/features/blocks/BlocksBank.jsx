import { selectAllBlocksArray } from 'features/blocks/blocks-selectors'
import React from 'react'
import { useSelector } from 'react-redux'
import Box from '@mui/material/Box'

function BlocksBank(props) {
    const allBlocks = useSelector(selectAllBlocksArray)

    return (
        <div>
            BlocksBank
            {allBlocks.map((block) => {
                return (
                    <div key={block.id}>
                        <Box
                            sx={{
                                width: 300,
                                height: 300,
                                backgroundColor: 'primary.dark',
                                '&:hover': {
                                    backgroundColor: 'primary.main',
                                    opacity: [0.9, 0.8, 0.7],
                                },
                            }}
                        >
                            {block.id}
                        </Box>
                    </div>
                )
            })}
        </div>
    )
}
export default BlocksBank
