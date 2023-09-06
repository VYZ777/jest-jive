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
import { IconUserExclamation } from '@tabler/icons-react'
import { RightNavigationBar } from './RightNavigationBar'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useAuth } from '@clerk/clerk-react'
import { notifications } from '@mantine/notifications'
import { useParams } from 'react-router-dom'
import { updateInviteKey } from '../../../pages/workspace-slice'

export const WorkspaceModal = ({ close, openedWorkspace }) => {
  const [linkData, setLinkData] = useState('security')
  const [show, setShow] = useState(false)
  const [value, setValue] = useState('')
  const [focused, setFocused] = useState(false)
  const { userId } = useAuth()
  const { token } = useParams()
  const dispatch = useDispatch()

  const workspace = useSelector((state) => state.workspace.workspace)
  const users = useSelector((state) => state.users.users)
  const singleUser = useSelector((state) => state.users.singleUser)

  const handleInput = (event) => {
    setValue(event.target.value)
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
                    {users?.map((user) => (
                      <Group key={user?.created_at} position='start'>
                        <Space w={1} />
                        <Avatar src={user?.logo_img} />
                        <Text>{user?.name}</Text>
                        {user?.user_key !== userId && user?.admin !== true && (
                          <Tooltip label='Make as admin'>
                            <ActionIcon onClick={() => setShow(true)}>
                              <IconUserExclamation />
                            </ActionIcon>
                          </Tooltip>
                        )}
                      </Group>
                    ))}
                    {show && (
                      <Flex
                        // mih={50}
                        gap='md'
                        justify='center'
                        align='center'
                        direction='row'
                        wrap='wrap'
                      >
                        <Space w={1} />
                        <Button
                          onClick={() => {
                            setShow(false)
                            notifications.show({
                              color: 'teal',
                              title: 'Succes',
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
                          onClick={() => setShow(false)}
                          variant='light'
                          size='xs'
                        >
                          Cancel
                        </Button>
                      </Flex>
                    )}
                  </>

                  <Space h={20} />
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
              <Group position='center'>
                <Text>Settings</Text>
              </Group>
            ) : (
              ''
            )}
          </ScrollArea>
        </Grid.Col>
      </Grid>
    </Modal>
  )
}
