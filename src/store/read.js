// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
// import { supabase } from '../libs/supabaseClient'

// export const readUserData = createAsyncThunk(
//   'data/readUserData',
//   async ({ userId }) => {
//     let { data: user_data } = await supabase
//       .from('user_data')
//       .select()
//       .eq('user_key', userId)
//     return user_data[0]
//   }
// )

// export const readAllUsersData = createAsyncThunk(
//   'data/readAllUsersData',
//   async ({ token }) => {
//     let { data: workspace } = await supabase
//       .from('workspace')
//       .select()
//       .eq('workspace_key', token)
//     let { data: user_data } = await supabase
//       .from('user_data')
//       .select()
//       .eq('workspace_id', workspace[0]?.id)
//     return user_data
//   }
// )

// export const readWorkspaceData = createAsyncThunk(
//   'data/readWorkspaceData',
//   async ({ token }) => {
//     let { data: workspace } = await supabase
//       .from('workspace')
//       .select()
//       .eq('workspace_key', token)
//     return workspace[0]
//   }
// )

// export const readSecuredInfo = createAsyncThunk(
//   'data/readSecuredInfo',
//   async ({ token, isSignedIn, userId }) => {
//     if (isSignedIn) {
//       let { data: workspace } = await supabase
//         .from('workspace')
//         .select()
//         .eq('workspace_key', token)
//       if (workspace.length > 0) {
//         let { data: user_data } = await supabase
//           .from('user_data')
//           .select()
//           .eq('user_key', userId)
//           .eq('workspace_id', workspace[0]?.id)
//         return user_data
//       } else {
//         return null
//       }
//     } else {
//       return null
//     }
//   }
// )

// export const readCategoryData = createAsyncThunk(
//   'data/readCategoryData',
//   async ({ token }) => {
//     let { data: workspace } = await supabase
//       .from('workspace')
//       .select()
//       .eq('workspace_key', token)

//     let { data: categories } = await supabase
//       .from('categories')
//       .select()
//       .eq('workspace_id', workspace[0]?.id)
//     return categories
//   }
// )

// export const readTaskData = createAsyncThunk(
//   'data/readTaskData',
//   async ({ token }) => {
//     let { data: workspace } = await supabase
//       .from('workspace')
//       .select()
//       .eq('workspace_key', token)
//     let { data: tasks, error } = await supabase
//       .from('tasks')
//       .select(`*, user_data(*), categories(*)`)
//       .eq('workspace_id', workspace[0]?.id)
//     return tasks
//   }
// )

// export const readMessageData = createAsyncThunk(
//   'data/readMessageData',
//   async ({ user, selectedUser }) => {
//     let { data: messages, error } = await supabase
//       .from('messages')
//       .select()
//       .eq('user_from', user?.id)
//       .eq('user_to', selectedUser?.id)
//     return messages
//   }
// )
// export const readMessageDataReceived = createAsyncThunk(
//   'data/readMessageDataReceived',
//   async ({ user, selectedUser }) => {
//     let { data: messages, error } = await supabase
//       .from('messages')
//       .update({ read: true })
//       .select()
//       .eq('user_from', selectedUser?.id)
//       .eq('user_to', user?.id)
//     return messages
//   }
// )

// export const readMessageDataReceivedNotRead = createAsyncThunk(
//   'data/readMessageDataReceivedNotRead',
//   async ({ user }) => {
//     let { data: messages, error } = await supabase.rpc(
//       'get_from_user_messages',
//       {
//         userid: user.id,
//       }
//     )
//     return messages
//   }
// )

// export const deleteTaskData = createAsyncThunk(
//   'data/deleteTaskData',
//   async ({ selection }) => {
//     const { error } = await supabase
//       .from('tasks')
//       .delete()
//       .eq('id', selection[0])
//     console.log(error)

//     return selection[0]
//   }
// )

// export const readCommentData = createAsyncThunk(
//   'data/readCommentData',
//   async ({ selectedTask }) => {
//     let { data: comments, error } = await supabase
//       .from('comments')
//       .select(`*, user_data(*)`)
//       .eq('task_id', selectedTask?.id)
//     return comments
//   }
// )

// export const dataRead = createSlice({
//   name: 'data',
//   initialState: {
//     user: [],
//     allUsers: [],
//     workspace: [],
//     protection: [],
//     category: [],
//     tasks: [],
//     messages: [],
//     received: [],
//     unread: [],
//     comments: [],
//   },
//   reducers: {},

//   extraReducers: (builder) => {
//     builder.addCase(readUserData.fulfilled, (state, action) => {
//       state.user = action.payload
//     })
//     builder.addCase(readAllUsersData.fulfilled, (state, action) => {
//       state.allUsers = action.payload
//     })
//     builder.addCase(readWorkspaceData.fulfilled, (state, action) => {
//       state.workspace = action.payload
//     })
//     builder.addCase(readSecuredInfo.fulfilled, (state, action) => {
//       state.protection = action.payload
//     })
//     builder.addCase(readCategoryData.fulfilled, (state, action) => {
//       state.category = action.payload
//     })
//     builder.addCase(readTaskData.fulfilled, (state, action) => {
//       state.tasks = action.payload
//     })
//     builder.addCase(readMessageData.fulfilled, (state, action) => {
//       state.messages = action.payload
//     })
//     builder.addCase(readMessageDataReceived.fulfilled, (state, action) => {
//       state.received = action.payload
//     })
//     builder.addCase(
//       readMessageDataReceivedNotRead.fulfilled,
//       (state, action) => {
//         state.unread = action.payload
//       }
//     )
//     builder.addCase(readCommentData.fulfilled, (state, action) => {
//       state.comments = action.payload
//     })
//   },
// })
