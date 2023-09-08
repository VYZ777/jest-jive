import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { supabase } from '../../../../libs/supabaseClient'
import { readWorkspaceData } from '../../../../pages/workspace-slice'

export const readCategoryData = createAsyncThunk(
  'category/readCategoryData',
  async ({ token }, thunkApi) => {
    const response = await thunkApi.dispatch(readWorkspaceData({ token }))

    let { data: categories } = await supabase
      .from('categories')
      .select()
      .eq('workspace_id', response?.payload?.id)
    return categories
  }
)

export const insertCategoryData = createAsyncThunk(
  'category/insertCategoryData',
  async ({ item, token }, thunkApi) => {
    const response = await thunkApi.dispatch(readWorkspaceData({ token }))

    const { data } = await supabase
      .from('categories')
      .insert([{ name: item?.label, workspace_id: response?.payload?.id }])
      .select()
    return data[0]
  }
)

export const categorySlice = createSlice({
  name: 'category',
  initialState: {
    categories: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(readCategoryData.fulfilled, (state, action) => {
      state.categories = action.payload
    })
    builder.addCase(insertCategoryData.fulfilled, (state, action) => {
      state.categories = [...state.categories, action.payload]
    })
  },
})
