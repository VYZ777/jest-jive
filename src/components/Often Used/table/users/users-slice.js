import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { supabase } from '../../../../libs/supabaseClient'

export const readUserData = createAsyncThunk(
  'users/readUserData',
  async ({ userId }) => {
    let { data: user_data } = await supabase
      .from('user_data')
      .select()
      .eq('user_key', userId)
    return user_data[0]
  }
)

export const insertAdminData = createAsyncThunk(
  'users/insertAdminData',
  async ({ userId, user }) => {
    let { data: user_data } = await supabase
      .from('user_data')
      .select()
      .eq('user_key', userId)

    if (!user_data.length) {
      const { data } = await supabase
        .from('user_data')
        .insert([
          {
            name: user?.firstName,
            user_key: userId,
            workspace_id: null,
            logo_img: user?.imageUrl,
            admin: true,
            email: user?.primaryEmailAddress?.emailAddress,
          },
        ])
        .select()
      console.log(data[0])
      return data[0]
    } else {
      null
    }
  }
)

export const insertMemberData = createAsyncThunk(
  'users/insertMemberData',
  async ({ userId, user, workspace }) => {
    let { data: user_data } = await supabase
      .from('user_data')
      .select()
      .eq('user_key', userId)

    if (!user_data.length) {
      const { data } = await supabase
        .from('user_data')
        .insert([
          {
            name: user?.firstName,
            user_key: userId,
            workspace_id: workspace?.id,
            logo_img: user?.imageUrl,
            admin: false,
            email: user?.primaryEmailAddress?.emailAddress,
          },
        ])
        .select()
      return data
    } else {
      null
    }
  }
)

export const readAllUsersData = createAsyncThunk(
  'users/readAllUsersData',
  async ({ token }) => {
    let { data: workspace } = await supabase
      .from('workspace')
      .select()
      .eq('workspace_key', token)
    let { data: user_data } = await supabase
      .from('user_data')
      .select()
      .eq('workspace_id', workspace[0]?.id)
    return user_data
  }
)

export const usersSlice = createSlice({
  name: 'users',
  initialState: {
    singleUser: [],
    users: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(readUserData.fulfilled, (state, action) => {
      state.singleUser = action.payload
    })
    builder.addCase(insertAdminData.fulfilled, (state, action) => {
      state.users = [{ ...action.payload }]
    })
    builder.addCase(insertMemberData.fulfilled, (state, action) => {
      state.users = [...state.users, ...action.payload]
    })
    builder.addCase(readAllUsersData.fulfilled, (state, action) => {
      state.users = action.payload
    })
  },
})
