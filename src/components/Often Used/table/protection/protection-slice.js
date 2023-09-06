import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { supabase } from '../../../../libs/supabaseClient'

export const readSecuredInfo = createAsyncThunk(
  'protection/readSecuredInfo',
  async ({ token, userId }) => {
    let { data: workspace } = await supabase
      .from('workspace')
      .select()
      .eq('workspace_key', token)
    if (workspace.length > 0) {
      let { data: user_data } = await supabase
        .from('user_data')
        .select()
        .eq('user_key', userId)
        .eq('workspace_id', workspace[0]?.id)
      return user_data
    } else {
      return null
    }
  }
)

export const protectionSlice = createSlice({
  name: 'protection',
  initialState: {
    protection: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(readSecuredInfo.fulfilled, (state, action) => {
      state.protection = action.payload
    })
  },
})
