import { configureStore } from '@reduxjs/toolkit'
// import { memorySlice } from './slice'
// import { dataRead } from './read'
import { categorySlice } from '../components/Often Used/table/categories/category-slice'
import { messageSlice } from '../components/Often Used/table/messages/message-slice'
import { commentsSlice } from '../components/Often Used/table/tasks/comments'
import { tasksSlice } from '../components/Often Used/table/tasks/tasks-slice'
import { usersSlice } from '../components/Often Used/table/users/users-slice'
import { protectionSlice } from '../components/Often Used/table/protection/protection-slice'
import { workspaceSlice } from '../pages/workspace-slice'

export const store = configureStore({
  reducer: {
    // memory: memorySlice.reducer,
    // data: dataRead.reducer,
    category: categorySlice.reducer,
    message: messageSlice.reducer,
    comments: commentsSlice.reducer,
    tasks: tasksSlice.reducer,
    users: usersSlice.reducer,
    protection: protectionSlice.reducer,
    workspace: workspaceSlice.reducer,
  },
})
