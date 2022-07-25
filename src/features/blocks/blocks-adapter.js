import { createEntityAdapter } from '@reduxjs/toolkit'

const blocksAdapter = createEntityAdapter({
    selectId: (block) => block.id,
    sortComparer: false,
})

export default blocksAdapter
