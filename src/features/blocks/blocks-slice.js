import { createAsyncThunk, createAction, createSlice } from '@reduxjs/toolkit'
import blocksAdapter from './blocks-adapter'
import { getAllBlocks, updateCustomBlock, saveNewBlock } from './blocks-api'

// export const updateBlock = createAsyncThunk(
//     'blocks/updateBlock',
//     async (block, { rejectWithValue }) => {
//         try {
//             const updatedBlock = await updateCustomBlock(block)
//             return { block: updatedBlock, id: block.id }
//         } catch (error) {
//             console.log('error', error)
//             return rejectWithValue(error.message[0])
//         }
//     }
// )
// export const saveBlock = createAsyncThunk(
//     'blocks/saveBlock',
//     async (block, { rejectWithValue }) => {
//         const newBlock = await saveNewBlock(block)
//         return newBlock
//     }
// )

export const fetchSavedBlocks = createAsyncThunk(
    'blocks/fetchSavedBlocks',
    async () => {
        const blocksResponse = await getAllBlocks()

        return blocksResponse
    }
)

export const blocksSlice = createSlice({
    name: 'blocks',
    initialState: blocksAdapter.getInitialState({
        initialized: false,
        loading: 'idle',
        error: null,
    }),
    reducers: {
        blockAddOne: (state, action) => {
            return blocksAdapter.addOne(state, action.payload)
        },
        blockUpdateOne: (state, action) => {
            console.log('ACTION', action)
            return blocksAdapter.updateOne(state, {
                id: action.payload.id,
                changes: { ...action.payload.changes },
            })
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(fetchSavedBlocks.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(fetchSavedBlocks.fulfilled, (state, action) => {
                state.status = 'idle'
                blocksAdapter.upsertMany(state, action.payload)
            })
        // .addCase(saveBlock.pending, (state, action) => {
        //     state.status = 'loading'
        // })
        // .addCase(saveBlock.fulfilled, (state, action) => {
        //     blocksAdapter.addOne(state, action.payload)
        // })
        // .addCase(saveBlock.rejected, (state, action) => {
        //     state.status = 'rejected'
        //     state.error = action.error.message
        //     return action.error.message
        // })
        // .addCase(updateBlock.pending, (state) => {
        //     state.status = 'loading'
        // })
        // .addCase(updateBlock.fulfilled, (state, { payload }) => {
        //     console.log('payload.block', payload.block)
        //     state.status = 'idle'
        //     blocksAdapter.updateOne(state, {
        //         id: payload.id,
        //         changes: { ...payload.block },
        //     })
        //     return payload.block
        // })
        // .addCase(updateBlock.rejected, (state, action) => {
        //     state.status = 'rejected'
        //     state.error = action.error.message
        // })
    },
})

export const { blockAddOne, blockUpdateOne } = blocksSlice.actions

export default blocksSlice.reducer
