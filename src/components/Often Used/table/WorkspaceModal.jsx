import {
  Modal,
  Grid,
  ScrollArea,
  Text,
  Group,
  Flex,
  Space,
  TextInput,
  Stack,
  Button,
  Tooltip,
  Avatar,
  Title,
  ActionIcon,
} from '@mantine/core'
import {
  IconUserExclamation,
  IconCopy,
  IconLockAccessOff,
  IconLockAccess,
} from '@tabler/icons-react'
import { RightNavigationBar } from './RightNavigationBar'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useAuth } from '@clerk/clerk-react'
import { notifications } from '@mantine/notifications'
import { useParams } from 'react-router-dom'
import {
  updateInviteKey,
  updateWorkspaceName,
} from '../../../pages/workspace-slice'
import {
  blockUser,
  makeAsAdmin,
  readBlockedUsers,
  unBlockUser,
} from './users/users-slice'

export const WorkspaceModal = ({ close, openedWorkspace }) => {
  const [linkData, setLinkData] = useState('security')
  const [show, setShow] = useState(false)
  const [showBlock, setShowBlock] = useState(false)
  const [value, setValue] = useState('')
  const [newName, setNewName] = useState('')
  const [focused, setFocused] = useState(false)
  const { userId } = useAuth()
  const { token } = useParams()
  const dispatch = useDispatch()

  const workspace = useSelector((state) => state.workspace.workspace)
  const users = useSelector((state) => state.users.users)
  const blockedUsers = useSelector((state) => state.users.blockedUsers)

  const handleInput = (event) => {
    setValue(event.target.value)
  }
  const handleChange = (event) => {
    setNewName(event.target.value)
  }

  return (
    <Modal
      opened={openedWorkspace}
      onClose={close}
      title='Workspace settings'
      centered
      size='70%'
    >
      <Grid>
        <Grid.Col span={3}>
          <RightNavigationBar setLinkData={setLinkData} />
        </Grid.Col>
        <Grid.Col span={9}>
          <ScrollArea>
            {linkData === 'security' ? (
              <>
                <Flex
                  mih={50}
                  gap='md'
                  justify='flex-end'
                  align='flex-start'
                  direction='column'
                  wrap='wrap'
                >
                  <>
                    <Group>
                      <Space w={1} />
                      <Title size='lg'>Admins</Title>
                    </Group>
                    {users?.map(
                      (user) =>
                        user?.admin && (
                          <Group key={user?.created_at} position='start'>
                            <Space w={1} />
                            <Avatar src={user?.logo_img} />
                            <Text>{user?.name}</Text>
                          </Group>
                        )
                    )}
                  </>
                  <Space h={20} />
                  <>
                    <Group>
                      <Space w={1} />
                      <Title size='lg'>Members</Title>
                    </Group>
                    {users
                      ?.filter((user) => !user?.blocked)
                      .map((user) => (
                        <Group key={user?.created_at} position='start'>
                          <Space w={1} />
                          <Avatar src={user?.logo_img} />
                          <Text>{user?.name}</Text>
                          {user?.user_key !== userId &&
                            user?.admin !== true && (
                              <Group>
                                <Tooltip label='Make as admin'>
                                  <ActionIcon
                                    onClick={() => {
                                      setShow(user.id)
                                      setShowBlock(null)
                                    }}
                                  >
                                    <IconUserExclamation />
                                  </ActionIcon>
                                </Tooltip>
                                <Tooltip label='Block user'>
                                  <ActionIcon
                                    onClick={() => {
                                      setShowBlock(user.id)
                                      setShow(null)
                                    }}
                                  >
                                    <IconLockAccess />
                                  </ActionIcon>
                                </Tooltip>
                              </Group>
                            )}
                          {show === user.id && (
                            <Flex
                              gap='md'
                              justify='center'
                              align='center'
                              direction='row'
                              wrap='wrap'
                            >
                              <Space w={1} />
                              <Button
                                onClick={() => {
                                  dispatch(makeAsAdmin(user))
                                  setShow(null) // Сбросить show для текущего пользователя
                                  notifications.show({
                                    color: 'teal',
                                    title: 'Success',
                                    message: 'Admin has been appointed',
                                    autoClose: 4000,
                                  })
                                }}
                                variant='light'
                                size='xs'
                                color='red'
                              >
                                Make as admin
                              </Button>
                              <Button
                                onClick={() => setShow(null)} // Сбросить show для текущего пользователя
                                variant='light'
                                size='xs'
                              >
                                Cancel
                              </Button>
                            </Flex>
                          )}
                          {showBlock === user.id && (
                            <Flex
                              gap='md'
                              justify='center'
                              align='center'
                              direction='row'
                              wrap='wrap'
                            >
                              <Space w={1} />
                              <Button
                                onClick={() => {
                                  dispatch(blockUser(user))
                                  setShowBlock(null) // Сбросить show для текущего пользователя
                                  notifications.show({
                                    color: 'teal',
                                    title: 'Success',
                                    message: 'User has been blocked',
                                    autoClose: 4000,
                                  })
                                }}
                                variant='light'
                                size='xs'
                                color='red'
                              >
                                Block user
                              </Button>
                              <Button
                                onClick={() => setShowBlock(null)} // Сбросить show для текущего пользователя
                                variant='light'
                                size='xs'
                              >
                                Cancel
                              </Button>
                            </Flex>
                          )}
                        </Group>
                      ))}
                  </>
                  <Space h={20} />
                  <>
                    {blockedUsers.length !== 0 && (
                      <Group>
                        <Space w={1} />
                        <Title size='lg'>Blocked users</Title>
                      </Group>
                    )}
                    {blockedUsers?.map((user) => (
                      <Group key={user?.created_at} position='start'>
                        <Space w={1} />
                        <Avatar src={user?.logo_img} />
                        <Text>{user?.name}</Text>
                        <ActionIcon
                          onClick={() => {
                            dispatch(unBlockUser(user))
                            notifications.show({
                              color: 'teal',
                              title: 'Success',
                              message: 'User has been unblocked',
                              autoClose: 4000,
                            })
                          }}
                        >
                          <Tooltip label='Unblock user'>
                            <IconLockAccessOff />
                          </Tooltip>
                        </ActionIcon>
                      </Group>
                    ))}
                  </>

                  {blockedUsers.length !== 0 && <Space h={20} />}
                  <>
                    <Group>
                      <Space w={1} />
                      <Title size='lg'>Links</Title>
                    </Group>

                    <Group position='start'>
                      <Space w={1} />
                      <TextInput
                        maxLength={16}
                        onFocus={() => setFocused(true)}
                        onBlur={() => setFocused(false)}
                        onChange={handleInput}
                        inputContainer={(children) => (
                          <Tooltip
                            label='You can change your invite key'
                            position='top-start'
                            opened={focused}
                          >
                            {children}
                          </Tooltip>
                        )}
                        label='Your invitation key'
                        placeholder={workspace?.invite_key}
                      />
                      <ActionIcon
                        onClick={() =>
                          navigator.clipboard.writeText(
                            `https://1103-37-48-50-9.ngrok-free.app/workspace/${workspace?.workspace_key}/invite/${workspace?.invite_key}`
                          )
                        }
                      >
                        <Tooltip label='Copy invite link'>
                          <IconCopy />
                        </Tooltip>
                      </ActionIcon>
                    </Group>
                    <Flex justify='flex-end'>
                      <Group position='end'>
                        <Space w={1} />
                        <Button
                          disabled={!value.trim()}
                          size='xs'
                          variant='light'
                          onClick={() => {
                            dispatch(updateInviteKey({ token, value }))
                            notifications.show({
                              color: 'teal',
                              title: 'Succes',
                              message: 'Invite key was updated',
                              autoClose: 4000,
                            })
                          }}
                        >
                          Save changes
                        </Button>
                      </Group>
                    </Flex>
                  </>
                </Flex>
              </>
            ) : linkData === 'integrations' ? (
              <Group position='center'>
                <Text>Integrations</Text>
              </Group>
            ) : linkData === 'analitycs' ? (
              <Group position='center'>
                <Text>Analitycs</Text>
              </Group>
            ) : linkData === 'notifications' ? (
              <Group position='center'>
                <Text>Notifications</Text>
              </Group>
            ) : linkData === 'help' ? (
              <Group position='center'>
                <Text>Help/Support</Text>
              </Group>
            ) : linkData === 'settings' ? (
              <Grid.Col span={9}>
                <Group position='start'>
                  <Title size='lg'>General</Title>
                </Group>
                <Space h={20} />
                <Group position='start'>
                  <TextInput
                    value={newName}
                    maxLength={20}
                    placeholder={workspace?.name}
                    w={300}
                    label='Change workspace name'
                    onChange={handleChange}
                  />
                </Group>
                <Space h={15} />
                <Button
                  disabled={!newName.trim()}
                  size='xs'
                  variant='light'
                  onClick={() => {
                    dispatch(updateWorkspaceName({ token, newName }))
                    notifications.show({
                      color: 'teal',
                      title: 'Succes',
                      message: 'Workspace name was updated',
                      autoClose: 4000,
                    })
                  }}
                >
                  Save changes
                </Button>
              </Grid.Col>
            ) : (
              ''
            )}
          </ScrollArea>
        </Grid.Col>
      </Grid>
    </Modal>
  )
}
