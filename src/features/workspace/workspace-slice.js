import { createSlice } from '@reduxjs/toolkit'

export const workspaceSettingsSlice = createSlice({
    name: 'workspaceSettings',
    initialState: { activeSegmented: 'settings' },
    reducers: {},
})

export default workspaceSettingsSlice.reducer
