import { Avatar, Text, Button, Paper, Group, Space } from '@mantine/core'
import { useSelector, useDispatch } from 'react-redux'
import { useUser, useAuth } from '@clerk/clerk-react'
import { insertMemberData } from '../components/Often Used/table/users/users-slice'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { readWorkspaceData } from './workspace-slice'

export const InvitePage = () => {
  const workspace = useSelector((state) => state.workspace.workspace)
  const { user, isSignedIn } = useUser()
  const { userId } = useAuth()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { token } = useParams()

  // добавляем пользователя в бд
  const handleCreate = () => {
    dispatch(insertMemberData({ userId, user, workspace })).then(() => {
      navigate(`/workspace/${workspace?.workspace_key}`)
    })
  }

  // делаем проверку данных пользователя для дальнейшего внесения в state
  const checkUser = () => {
    dispatch(readUserData(userId))
  }

  function splitTextIntoArrays(text) {
    if (text) {
      const words = text.split(' ')
      const firstArray = [words[0]?.[0]?.toUpperCase() || '']
      const secondArray = [words[1]?.[0]?.toUpperCase() || '']
      return [firstArray, secondArray]
    } else {
      console.log('Text is empty')
    }
  }

  let initials = ['', ''] // По умолчанию инициалы пустые

  if (workspace?.name) {
    initials = splitTextIntoArrays(workspace.name)
  }

  useEffect(() => {
    if (!isSignedIn) {
      navigate('/sign-in', {
        state: location.pathname,
      })
    } else {
      dispatch(readWorkspaceData({ token }))
    }
  }, [])

  return (
    <Group position='center'>
      <Space h={800} />
      <Paper
        radius='md'
        withBorder
        p='xl'
        sx={(theme) => ({
          backgroundColor:
            theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
        })}
      >
        <Group position='center'>
          <Avatar src={null} alt={workspace?.name} color='blue'>
            {initials[0]}
            {initials[1]}
          </Avatar>
        </Group>
        <Text ta='center' fz='lg' weight={500} mt='md'>
          {workspace?.name}
        </Text>
        <Text ta='center' c='dimmed' fz='sm'>
          Admin sent you an invite
        </Text>

        <Button onClick={handleCreate} variant='light' fullWidth mt='md'>
          Accept invite
        </Button>
      </Paper>
    </Group>
  )
}
