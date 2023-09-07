import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { supabase } from '../../../../libs/supabaseClient'
import { readWorkspaceData } from '../../../../pages/workspace-slice'

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
    }
  }
)

export const readAllUsersData = createAsyncThunk(
  'users/readAllUsersData',
  async ({ token }, thunkApi) => {
    const response = await thunkApi.dispatch(readWorkspaceData({ token }))
    let { data: user_data } = await supabase
      .from('user_data')
      .select()
      .eq('workspace_id', response?.payload?.id)
    return user_data
  }
)

export const makeAsAdmin = createAsyncThunk(
  'users/makeAsAdmin',
  async (user) => {
    const { data, error } = await supabase
      .from('user_data')
      .update({ admin: true })
      .eq('id', user?.id)
      .select()
  }
)
export const blockUser = createAsyncThunk('users/blockUser', async (user) => {
  const { data, error } = await supabase
    .from('user_data')
    .update({ blocked: true })
    .eq('id', user?.id)
    .select()
  return data
})
export const unBlockUser = createAsyncThunk(
  'users/unBlockUser',
  async (user) => {
    const { data, error } = await supabase
      .from('user_data')
      .update({ blocked: false })
      .eq('id', user?.id)
      .select()
    return data
  }
)
export const readBlockedUsers = createAsyncThunk(
  'users/readBlockedUsers',
  async ({ token }) => {
    let { data: workspace } = await supabase
      .from('workspace')
      .select()
      .eq('workspace_key', token)

    let { data: user_data, error } = await supabase
      .from('user_data')
      .select()
      .eq('workspace_id', workspace[0]?.id)
      .eq('blocked', true)
    return user_data
  }
)
export const usersSlice = createSlice({
  name: 'users',
  initialState: {
    singleUser: [],
    users: [],
    blockedUsers: [],
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
    builder.addCase(blockUser.fulfilled, (state, action) => {
      state.blockedUsers = [...state.blockedUsers, ...action.payload]
      state.users = state.users.filter(
        (item) => item.id !== action.payload?.[0]?.id
      )
    })
    builder.addCase(unBlockUser.fulfilled, (state, action) => {
      state.blockedUsers = state.blockedUsers.filter(
        (item) => item.id !== action.payload?.[0]?.id
      )
      state.users = state.users.map((user) => {
        if (user.id === action.payload[0]?.id) {
          return action.payload
        }
        return user
      })
    })
    builder.addCase(readBlockedUsers.fulfilled, (state, action) => {
      state.blockedUsers = action.payload
    })
  },
})
