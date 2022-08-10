import { createAsyncThunk, createAction, createSlice } from '@reduxjs/toolkit'
import blocksAdapter from './blocks-adapter'
import { getAllBlocks, updateCustomBlock, saveNewBlock } from './blocks-api'

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
                state.initialized = true
                blocksAdapter.upsertMany(state, action.payload)
            })
    },
})

export const { blockAddOne, blockUpdateOne } = blocksSlice.actions

export default blocksSlice.reducer
