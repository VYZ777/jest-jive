import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { supabase } from '../../../../libs/supabaseClient'
import { readUserData } from '../users/users-slice'

export const readMessageData = createAsyncThunk(
  'message/readMessageData',
  async ({ user, selectedUser }) => {
    let { data: messages, error } = await supabase
      .from('messages')
      .select()
      .eq('user_from', user?.id)
      .eq('user_to', selectedUser?.id)
    return messages
  }
)

export const readMessageDataReceived = createAsyncThunk(
  'message/readMessageDataReceived',
  async ({ user, selectedUser }) => {
    if (selectedUser !== null) {
      let { data: messages, error } = await supabase
        .from('messages')
        .update({ read: true })
        .select()
        .eq('user_from', selectedUser?.id)
        .eq('user_to', user?.id)
      return messages
    }
  }
)

export const readMessageDataReceivedNotRead = createAsyncThunk(
  'message/readMessageDataReceivedNotRead',
  async ({ user, userId }, thunkApi) => {
    const response = await thunkApi.dispatch(readUserData({ userId }))
    let { data: fetchedMessages, error } = await supabase.rpc(
      'get_from_user_messages',
      {
        userid: response?.payload?.id,
      }
    )
    return fetchedMessages
  }
)

export const insertMessageData = createAsyncThunk(
  'message/insertMessageData',
  async ({ user, selectedUser, value }) => {
    if (value?.trim()) {
      const { data, error } = await supabase
        .from('messages')
        .insert([
          { user_from: user?.id, user_to: selectedUser?.id, context: value },
        ])
        .select()
      return data
    }
  }
)

export const messageSlice = createSlice({
  name: 'message',
  initialState: {
    messages: [],
    receivedMessages: [],
    unread: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(readMessageData.fulfilled, (state, action) => {
      if (action?.payload) {
        state.messages = [...action.payload]
      }
    })
    builder.addCase(readMessageDataReceived.fulfilled, (state, action) => {
      if (action?.payload) {
        state.receivedMessages = [...action.payload]
      }
    })
    builder.addCase(
      readMessageDataReceivedNotRead.fulfilled,
      (state, action) => {
        state.unread = action.payload
      }
    )
    builder.addCase(insertMessageData.fulfilled, (state, action) => {
      state.messages = [...state.messages, ...action.payload]
    })
  },
})
