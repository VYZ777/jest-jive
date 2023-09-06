// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
// import { supabase } from '../libs/supabaseClient'

// export const insertAdminData = createAsyncThunk(
//   'memory/insertAdminData',
//   async ({ userId, user }) => {
//     let { data: user_data } = await supabase
//       .from('user_data')
//       .select()
//       .eq('user_key', userId)

//     if (!user_data.length) {
//       const { data } = await supabase
//         .from('user_data')
//         .insert([
//           {
//             name: user?.firstName,
//             user_key: userId,
//             workspace_id: null,
//             logo_img: user?.imageUrl,
//             admin: true,
//             email: user?.primaryEmailAddress?.emailAddress,
//           },
//         ])
//         .select()
//       return data[0]
//     } else {
//       null
//     }
//   }
// )

// export const insertMemberData = createAsyncThunk(
//   'memory/insertMemberData',
//   async ({ userId, user, workspace }) => {
//     console.log(userId, user, workspace)
//     let { data: user_data } = await supabase
//       .from('user_data')
//       .select()
//       .eq('user_key', userId)

//     if (!user_data.length) {
//       const { data } = await supabase
//         .from('user_data')
//         .insert([
//           {
//             name: user?.firstName,
//             user_key: userId,
//             workspace_id: workspace?.id,
//             logo_img: user?.imageUrl,
//             admin: false,
//             email: user?.primaryEmailAddress?.emailAddress,
//           },
//         ])
//         .select()
//       return data[0]
//     } else {
//       null
//     }
//   }
// )

// export const insertWorspaceData = createAsyncThunk(
//   'memory/insertWorspaceData',
//   async ({ randomString, userData, inputValue, tokenInvite }) => {
//     const { data } = await supabase
//       .from('workspace')
//       .insert([
//         {
//           workspace_key: randomString,
//           admin: userData?.id,
//           name: inputValue,
//           invite_key: tokenInvite,
//         },
//       ])
//       .select()
//     const { data: user } = await supabase
//       .from('user_data')
//       .update({ workspace_id: data[0]?.id })
//       .eq('id', data[0]?.admin)
//       .select()
//   }
// )

// export const insertCategoryData = createAsyncThunk(
//   'memory/insertCategoryData',
//   async ({ item, token }, thunkApi) => {
//     let { data: workspace } = await supabase
//       .from('workspace')
//       .select()
//       .eq('workspace_key', token)

//     const { data } = await supabase
//       .from('categories')
//       .insert([{ name: item?.label, workspace_id: workspace[0]?.id }])
//       .select()
//     return data[0]
//   }
// )

// export const insertTaskData = createAsyncThunk(
//   'memory/insertTaskData',
//   async ({
//     token,
//     selectedStatus,
//     inputValue,
//     descriptionValue,
//     date,
//     category,
//     assigned,
//   }) => {
//     let { data: workspace } = await supabase
//       .from('workspace')
//       .select()
//       .eq('workspace_key', token)
//     let { data: categories } = await supabase
//       .from('categories')
//       .select()
//       .eq('workspace_id', workspace[0]?.id)
//       .eq('name', category)
//     const { data: newTask, error } = await supabase
//       .from('tasks')
//       .insert([
//         {
//           workspace_id: workspace[0]?.id,
//           category_id: categories[0]?.id,
//           status: selectedStatus,
//           description: descriptionValue,
//           name: inputValue,
//           due_date: date,
//           assigned_user: assigned,
//         },
//       ])
//       .select()
//     console.log({ newTask })
//     return newTask
//   }
// )

// export const updateTaskData = createAsyncThunk(
//   'memory/updateTaskData',
//   async ({
//     editedText,
//     editedDescription,
//     selectedStatus,
//     category,
//     dueDateState,
//     selectedTask,
//   }) => {
//     let { data: categories } = await supabase
//       .from('categories')
//       .select()
//       .eq('name', category)

//     const { data, error } = await supabase
//       .from('tasks')
//       .update({
//         name: editedText,
//         status: selectedStatus,
//         description: editedDescription,
//         due_date: dueDateState,
//         category_id: categories[0]?.id,
//       })
//       .eq('id', selectedTask?.id)
//       .select()
//   }
// )

// export const insertMessageData = createAsyncThunk(
//   'memory/insertMessageData',
//   async ({ user, selectedUser, value }) => {
//     if (value?.trim()) {
//       const { data, error } = await supabase
//         .from('messages')
//         .insert([
//           { user_from: user?.id, user_to: selectedUser?.id, context: value },
//         ])
//         .select()
//     }
//   }
// )

// export const insertCommentData = createAsyncThunk(
//   'memory/insertCommentData',
//   async ({ user, selectedTask, value }) => {
//     if (value?.trim()) {
//       const { data, error } = await supabase
//         .from('comments')
//         .insert([
//           { user_id: user?.id, task_id: selectedTask?.id, context: value },
//         ])
//         .select()
//     }
//   }
// )

// export const insertImageData = createAsyncThunk(
//   'memory/insertImageData',
//   async function uploadFile(file) {
//     const { data, error } = await supabase.storage
//       .from('bucket_loader')
//       .upload('file_path', file)
//   }
// )

// export const memorySlice = createSlice({
//   name: 'memory',
//   initialState: {
//     user: [],
//     task: [],
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder.addCase(insertAdminData.fulfilled, (state, action) => {
//       state.user = action.payload
//     })
//     builder.addCase(insertMemberData.fulfilled, (state, action) => {
//       state.user = action.payload
//     })
//     builder.addCase(insertTaskData.fulfilled, (state, action) => {
//       console.log({ action })
//       state.data.tasks = [...state.data.tasks, ...action.payload]
//     })
//   },
// })
