import { useEffect, useState } from 'react'
import { useUser, useAuth } from '@clerk/clerk-react'
import {
  AiOutlineUserAdd,
  AiOutlineArrowRight,
  AiFillCopy,
} from 'react-icons/ai'
import { useLocation, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { insertWorspaceData } from './workspace-slice'
import { readUserData } from '../components/Often Used/table/users/users-slice'
import { notifications } from '@mantine/notifications'
import { IconCheck, IconX, IconAlertCircle } from '@tabler/icons-react'
import {
  Modal,
  Group,
  Button,
  Text,
  Input,
  Tooltip,
  Space,
  ActionIcon,
  Divider,
  Stack,
  Collapse,
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'

export const Workspace = () => {
  const [opened, { toggle }] = useDisclosure(false)
  const [randomString, setRandomString] = useState('')
  const [tokenInvite, setTokenInvite] = useState('')
  const [inputValue, setInputValue] = useState('')
  const location = useLocation()

  // установка используемых переменных
  const navigate = useNavigate()
  const { user, isSignedIn } = useUser()
  const { userId } = useAuth()
  const users = useSelector((state) => state.users.users)
  const dispatch = useDispatch()
  console.log(users)
  // генерация рандомного ключа в 20 символов
  const generateRandomString = (length) => {
    const charset =
      'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    let result = ''

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length)
      result += charset[randomIndex]
    }

    return result
  }

  // помещаем сгенерированный ключ в state
  const generateTokenWorkspace = () => {
    const newRandomString = generateRandomString(20)
    setRandomString(newRandomString)
  }

  const generateInviteToken = () => {
    const randomInviteToken = generateRandomString(16)
    setTokenInvite(randomInviteToken)
  }

  // помещаем введённый текст в state
  const handleInputChange = (event) => {
    setInputValue(event.target.value)
  }

  // делаем проверку данных пользователя для дальнейшего внесения в state
  const checkUser = () => {
    dispatch(readUserData({ userId }))
  }

  const linkInvite = `https://1103-37-48-50-9.ngrok-free.app/workspace/${randomString}/invite/${tokenInvite}`

  // добавляем воркспейс в бд при нажатии на кнопку
  const handleSubmit = () => {
    if (users?.workspace_id > 0) {
      notifications.show({
        icon: <IconX size='1.1rem' />,
        color: 'red',
        title: 'Oops...',
        message: 'You already have a workspace 🤥',
        autoClose: 2000,
      })
    } else {
      dispatch(
        insertWorspaceData({
          randomString,
          inputValue,
          tokenInvite,
          userId,
          user,
        })
      )
        .then(() => {
          navigate(`/workspace/${randomString}`)
        })
        .catch((err) => console.log(err))
    }
  }

  useEffect(() => {
    if (isSignedIn) {
      generateTokenWorkspace()
      generateInviteToken()
      checkUser()
    } else {
      navigate('/sign-in', {
        state: location.pathname,
      })
    }
  }, [])

  return (
    <Group position='center'>
      <Modal size='xl' opened={true} title='Workspace' centered>
        <Space h={45} />
        <Stack align='center' h={300}>
          <Group position='center'>
            <Stack align='center' h={300}>
              <Group position='center'>
                <Text size='lg'>Workspace: </Text>
                <Input
                  rightSection={
                    <Tooltip
                      offset={20}
                      withArrow
                      arrowPosition='center'
                      label='if you want an auto-generated logo - write the name of the workspace in two words using a space between'
                      position='top-end'
                    >
                      <div>
                        <IconAlertCircle
                          size='1rem'
                          style={{ display: 'block', opacity: 0.5 }}
                        />
                      </div>
                    </Tooltip>
                  }
                  onChange={handleInputChange}
                  placeholder='Type workspace name'
                />
                <Tooltip
                  offset={10}
                  withArrow
                  label='Invite members'
                  position='right'
                >
                  <ActionIcon size='lg' onClick={toggle}>
                    <AiOutlineUserAdd size='xl' />
                  </ActionIcon>
                </Tooltip>
                <Collapse transitionDuration={500} in={opened}>
                  <Group position='center'>
                    <Stack align='center' spacing='lg' h={200}>
                      <Group position='center'>
                        <Text>Invite members:</Text>
                        <Input
                          type='email'
                          onChange={handleInputChange}
                          placeholder='Type member email'
                        />
                        <ActionIcon size='lg'>
                          <AiOutlineArrowRight size='xl' />
                        </ActionIcon>
                      </Group>
                      <Divider
                        my='xl'
                        label='Or send manually'
                        labelPosition='center'
                      />
                      <Group position='center'>
                        <Text size={10}>{linkInvite}</Text>
                        <Tooltip
                          offset={10}
                          withArrow
                          label='Copy'
                          position='top'
                        >
                          <ActionIcon
                            size='md'
                            onClick={() => {
                              navigator.clipboard.writeText(
                                `https://1103-37-48-50-9.ngrok-free.app/workspace/${randomString}/invite/${tokenInvite}`
                              )
                              notifications.show({
                                icon: <IconCheck size='1.1rem' />,
                                color: 'teal',
                                title: 'Succes',
                                message: 'Copied',
                                autoClose: 2000,
                              })
                            }}
                          >
                            <AiFillCopy size='sm' />
                          </ActionIcon>
                        </Tooltip>
                      </Group>
                    </Stack>
                  </Group>
                </Collapse>
              </Group>
            </Stack>
            <Group style={{ marginTop: '-3rem' }} position='center'>
              <Button
                onClick={handleSubmit}
                disabled={!inputValue}
                variant='light'
              >
                Create
              </Button>
            </Group>
          </Group>
        </Stack>
      </Modal>
    </Group>
  )
}
