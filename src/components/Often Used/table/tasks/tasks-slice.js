import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { supabase } from '../../../../libs/supabaseClient'

export const readTaskData = createAsyncThunk(
  'tasks/readTaskData',
  async ({ token }) => {
    let { data: workspace } = await supabase
      .from('workspace')
      .select()
      .eq('workspace_key', token)
    let { data: tasks, error } = await supabase
      .from('tasks')
      .select(`*, user_data(*), categories(*)`)
      .eq('workspace_id', workspace[0]?.id)
    return tasks
  }
)

export const insertTaskData = createAsyncThunk(
  'tasks/insertTaskData',
  async ({
    token,
    selectedStatus,
    inputValue,
    descriptionValue,
    date,
    category,
    assigned,
  }) => {
    let { data: workspace } = await supabase
      .from('workspace')
      .select()
      .eq('workspace_key', token)
    let { data: categories } = await supabase
      .from('categories')
      .select()
      .eq('workspace_id', workspace[0]?.id)
      .eq('name', category)
    const { data: newTask, error } = await supabase
      .from('tasks')
      .insert([
        {
          workspace_id: workspace[0]?.id,
          category_id: categories[0]?.id,
          status: selectedStatus,
          description: descriptionValue,
          name: inputValue,
          due_date: date,
          assigned_user: assigned,
        },
      ])
      .select(`*, user_data(*), categories(*)`)
    return newTask
  }
)

export const deleteTaskData = createAsyncThunk(
  'tasks/deleteTaskData',
  async ({ selection }) => {
    const { error } = await supabase
      .from('tasks')
      .delete()
      .eq('id', selection[0])
    console.log(error)

    return selection[0]
  }
)

export const updateTaskData = createAsyncThunk(
  'tasks/updateTaskData',
  async ({
    editedText,
    editedDescription,
    selectedStatus,
    category,
    dueDateState,
    selectedTask,
  }) => {
    let { data: categories } = await supabase
      .from('categories')
      .select()
      .eq('name', category)

    const { data: tasks, error } = await supabase
      .from('tasks')
      .update({
        name: editedText,
        status: selectedStatus,
        description: editedDescription,
        due_date: dueDateState,
        category_id: categories[0]?.id,
      })
      .eq('id', selectedTask?.id)
      .select(`*, user_data(*), categories(*)`)

    return tasks?.[0]
  }
)

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {
    tasks: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(readTaskData.fulfilled, (state, action) => {
      state.tasks = action.payload
    })
    builder.addCase(insertTaskData.fulfilled, (state, action) => {
      state.tasks = [...state.tasks, ...action.payload]
    })
    builder.addCase(deleteTaskData.fulfilled, (state, action) => {
      state.tasks = state.tasks.filter((it) => it.id !== action.payload)
    })
    builder.addCase(updateTaskData.fulfilled, (state, action) => {
      state.tasks = state.tasks.map((task) => {
        if (task.id === action.payload.id) {
          return action.payload
        }
        return task
      })
    })
  },
})
