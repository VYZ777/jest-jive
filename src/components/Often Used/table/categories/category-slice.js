import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { supabase } from '../../../../libs/supabaseClient'

export const readCategoryData = createAsyncThunk(
  'category/readCategoryData',
  async ({ token }) => {
    let { data: workspace } = await supabase
      .from('workspace')
      .select()
      .eq('workspace_key', token)

    let { data: categories } = await supabase
      .from('categories')
      .select()
      .eq('workspace_id', workspace[0]?.id)
    return categories
  }
)

export const insertCategoryData = createAsyncThunk(
  'category/insertCategoryData',
  async ({ item, token }, thunkApi) => {
    let { data: workspace } = await supabase
      .from('workspace')
      .select()
      .eq('workspace_key', token)

    const { data } = await supabase
      .from('categories')
      .insert([{ name: item?.label, workspace_id: workspace[0]?.id }])
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
