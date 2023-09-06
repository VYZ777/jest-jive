import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { supabase } from '../libs/supabaseClient'
import { insertAdminData } from '../components/Often Used/table/users/users-slice'

export const insertWorspaceData = createAsyncThunk(
  'workspace/insertWorspaceData',
  async ({ randomString, inputValue, tokenInvite, userId, user }, thunkApi) => {
    thunkApi
      .dispatch(insertAdminData({ userId, user }))
      .then(async (response) => {
        const { data } = await supabase
          .from('workspace')
          .insert([
            {
              workspace_key: randomString,
              admin: response?.payload?.id,
              name: inputValue,
              invite_key: tokenInvite,
            },
          ])
          .select()
        return data[0]
      })
      .then(async (response) => {
        console.log(response)
        const { data: user_data, error } = await supabase
          .from('user_data')
          .update({ workspace_id: response?.id })
          .eq('user_key', userId)
          .select()
        console.log(user_data)
      })
  }
)

export const readWorkspaceData = createAsyncThunk(
  'workspace/readWorkspaceData',
  async ({ token }) => {
    let { data: workspace } = await supabase
      .from('workspace')
      .select()
      .eq('workspace_key', token)
    return workspace[0]
  }
)

export const updateInviteKey = createAsyncThunk(
  'workspace/updateInviteKey',
  async ({ value, token }) => {
    const { data, error } = await supabase
      .from('workspace')
      .update({ invite_key: value })
      .eq('workspace_key', token)
      .select()
  }
)

export const workspaceSlice = createSlice({
  name: 'workspace',
  initialState: {
    workspace: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(insertWorspaceData.fulfilled, (state, action) => {
      state.workspace = action.payload
    })
    builder.addCase(readWorkspaceData.fulfilled, (state, action) => {
      state.workspace = action.payload
    })
    builder.addCase(updateInviteKey.fulfilled, (state, action) => {
      state.workspace = action.payload
    })
  },
})
