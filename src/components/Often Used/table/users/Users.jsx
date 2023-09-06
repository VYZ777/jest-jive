import {
  Avatar,
  Badge,
  Table,
  Group,
  Text,
  ActionIcon,
  Anchor,
  ScrollArea,
  useMantineTheme,
} from '@mantine/core'
import { IconPencil, IconTrash, IconSend } from '@tabler/icons-react'
import { useSelector, useDispatch } from 'react-redux'
import { useUser, useAuth } from '@clerk/clerk-react'

const jobColors = {
  member: 'blue',
  admin: 'red',
}

export const Users = ({ data, openChatModal }) => {
  const dispatch = useDispatch()
  const userData = useSelector((state) => state.users.singleUser)
  const { user, isSignedIn } = useUser()
  const { userId } = useAuth()
  const theme = useMantineTheme()

  const rows = data.map((item) => {
    return (
      <tr key={item?.name}>
        <td>
          <Group spacing='sm'>
            <Avatar size={30} src={item?.logo_img} radius={30} />
            <Text fz='sm' fw={500}>
              {item?.name}
            </Text>
          </Group>
        </td>
        <td>
          <Group>
            <Badge
              color={jobColors[item?.admin ? 'admin' : 'member']}
              variant={theme.colorScheme === 'dark' ? 'light' : 'outline'}
            >
              {item?.admin ? 'admin' : 'member'}
            </Badge>
          </Group>
        </td>
        <td>
          <Anchor component='button' size='sm'>
            {item?.email}
          </Anchor>
        </td>
        <td>
          <Group spacing={0} position='right'>
            {item?.user_key !== userId && (
              <ActionIcon onClick={() => openChatModal(item)}>
                <IconSend size='1rem' stroke={1.5} />
              </ActionIcon>
            )}
          </Group>
        </td>
      </tr>
    )
  })

  return (
    <ScrollArea>
      <Table sx={{ minWidth: 800 }} verticalSpacing='sm'>
        <thead>
          <tr>
            <th>User</th>
            <th>Status</th>
            <th>Email</th>
            <th />
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </ScrollArea>
  )
}
