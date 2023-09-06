import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { supabase } from '../../../../libs/supabaseClient'

export const readCommentData = createAsyncThunk(
  'comments/readCommentData',
  async ({ selectedTask }) => {
    let { data: comments, error } = await supabase
      .from('comments')
      .select(`*, user_data(*)`)
      .eq('task_id', selectedTask?.id)
    return comments
  }
)

export const insertCommentData = createAsyncThunk(
  'comments/insertCommentData',
  async ({ user, selectedTask, value }) => {
    if (value?.trim()) {
      const { data, error } = await supabase
        .from('comments')
        .insert([
          { user_id: user?.id, task_id: selectedTask?.id, context: value },
        ])
        .select()
      return data
    }
  }
)

export const commentsSlice = createSlice({
  name: 'comments',
  initialState: {
    comments: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(readCommentData.fulfilled, (state, action) => {
      state.comments = action.payload
    })
    builder.addCase(insertCommentData.fulfilled, (state, action) => {
      state.comments = [...state.comments, ...action.payload]
    })
  },
})
