import blocksAdapter from './blocks-adapter'

const blocksSelectors = blocksAdapter.getSelectors(
    (state) => state?.blocks ?? null
)

const {
    selectEntities: selectBlockEntities,
    selectById: selectBlockById,
    selectAll: selectAllBlocksArray,
    selectIds: selectBlockIds,
} = blocksSelectors

export {
    selectBlockEntities,
    selectBlockById,
    selectAllBlocksArray,
    selectBlockIds,
}
