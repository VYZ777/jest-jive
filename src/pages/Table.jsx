import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { HeaderPanel } from '../components/Often Used/table/HeaderPanel'
import { Menu } from '../components/Often Used/table/Menu'
import { SheetsTask } from '../components/Often Used/table/tasks/SheetsTask'
import {
  readMessageData,
  readMessageDataReceived,
  readMessageDataReceivedNotRead,
} from '../components/Often Used/table/messages/message-slice'
import { readCommentData } from '../components/Often Used/table/tasks/comments'
import { readTaskData } from '../components/Often Used/table/tasks/tasks-slice'
import {
  readAllUsersData,
  readUserData,
} from '../components/Often Used/table/users/users-slice'
import { TaskModal } from '../components/Often Used/table/tasks/TaskModal'
import { useDisclosure } from '@mantine/hooks'
import { Users } from '../components/Often Used/table/users/Users'
import { Chat } from '../components/Often Used/table/messages/Chat'
import { useUser, useAuth } from '@clerk/clerk-react'
import { Inbox } from '../components/Often Used/table/messages/Inbox'
import { supabase } from '../libs/supabaseClient'
import { WorkspaceModal } from '../components/Often Used/table/WorkspaceModal'

export const Table = () => {
  const [linkData, setLinkData] = useState('tasks')
  const [renderCount, setRenderCount] = useState(0)
  const [renderTaskCount, setRenderTaskCount] = useState(0)
  const [openedWorkspace, setOpenedWorkspace] = useState(false)
  const tasks = useSelector((state) => state.tasks.tasks)
  const allUsers = useSelector((state) => state.users.users)
  const user = useSelector((state) => state.users.singleUser)
  const unread = useSelector((state) => state.message.unread)
  const { userId } = useAuth()
  const { token } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const initialLoad = sessionStorage.getItem('initialLoad')

  // Открываем/закрываем модальное окно
  const { opened, toggle, close, open } = useDisclosure(false)

  // Состояние для хранения выбранного задания
  const [selectedTask, setSelectedTask] = useState(null)

  // Состояние для хранения выбранного пользователя
  const [selectedUser, setSelectedUser] = useState(null)

  // selected Categories
  const [selectedCategory, setSelectedCategory] = useState([])

  const openTaskModal = (item) => {
    setSelectedTask(item)
    if (renderTaskCount === 0) {
      setRenderTaskCount(renderTaskCount + 1)
    }
  }
  const closeTaskModal = () => {
    setSelectedTask(null) // Очищаем выбранное задание при закрытии модального окна
    setRenderTaskCount(0)
  }
  const openChatModal = (item) => {
    setSelectedUser(item)
    dispatch(readMessageDataReceived({ user: item, selectedUser }))
    dispatch(readMessageDataReceivedNotRead({ user, userId }))
    if (renderCount === 0) {
      setRenderCount(renderCount + 1)
    }
  }
  const closeChatModal = () => {
    setSelectedUser(null) // Очищаем выбранное задание при закрытии модального окна
    setRenderCount(0)
  }
  const openWorkspaceModal = (bool) => {
    setOpenedWorkspace(bool)
  }
  const closeWorkspaceModal = () => {
    setOpenedWorkspace(false)
  }

  useEffect(() => {
    if (userId) {
      dispatch(readTaskData({ token }))
      dispatch(readAllUsersData({ token }))
      dispatch(readUserData({ userId }))
      dispatch(readMessageDataReceivedNotRead({ user, userId }))

      const messageSub = supabase
        .channel('sending-message')
        .on(
          'postgres_changes',
          { event: 'INSERT', schema: 'public', table: 'messages' },
          (payload) => {
            dispatch(readMessageDataReceived({ user, selectedUser }))
            dispatch(readMessageDataReceivedNotRead({ user, userId }))
          }
        )
        .subscribe()
    }
  }, [])

  useEffect(() => {
    if (renderTaskCount > 0) {
      dispatch(readCommentData({ selectedTask }))
    }
  }, [renderTaskCount])
  useEffect(() => {
    if (renderCount > 0) {
      dispatch(readMessageData({ user, selectedUser }))
      dispatch(readMessageDataReceived({ user, selectedUser }))
    }
  }, [renderCount])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <>
        <HeaderPanel />
        <div style={{ display: 'flex', flex: 1 }}>
          <Menu
            setSelectedCategory={setSelectedCategory}
            selectedCategory={selectedCategory}
            allUsers={allUsers}
            setLinkData={setLinkData}
            openWorkspaceModal={openWorkspaceModal}
            token={token}
          />
          {linkData === 'tasks' ? (
            <>
              {tasks?.length ? (
                <div>
                  <div style={{ marginTop: '0.30rem' }}></div>
                  <SheetsTask
                    selectedCategory={selectedCategory}
                    toggle={toggle}
                    token={token}
                    openTaskModal={openTaskModal}
                    setSelectedTask={setSelectedTask}
                  />
                </div>
              ) : (
                <h1
                  style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    fontSize: '4rem',
                  }}
                >
                  Oops... You have no any tasks
                </h1>
              )}
            </>
          ) : linkData === 'users' ? (
            <div>
              <div style={{ marginTop: '0.30rem' }}></div>
              {allUsers && (
                <Users openChatModal={openChatModal} data={allUsers} />
              )}
            </div>
          ) : linkData === 'inbox' ? (
            <Inbox openChatModal={openChatModal} data={unread} />
          ) : (
            <h1
              style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: '4rem',
              }}
            >
              Oops... You have no any messages
            </h1>
          )}
        </div>
        {selectedTask && ( // Открываем модальное окно, если opened === true
          <TaskModal
            selectedTask={selectedTask}
            opened={opened}
            toggle={openTaskModal}
            close={closeTaskModal}
            token={token}
            user={user}
          />
        )}
        <Chat
          user={user}
          selectedUser={selectedUser}
          opened={opened}
          toggle={openChatModal}
          close={closeChatModal}
          token={token}
        />
        <WorkspaceModal
          openedWorkspace={openedWorkspace}
          opened={opened}
          open={openWorkspaceModal}
          close={closeWorkspaceModal}
        />
      </>
    </div>
  )
}
