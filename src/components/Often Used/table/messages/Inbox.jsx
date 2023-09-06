import {
  Avatar,
  Badge,
  Table,
  Group,
  Text,
  ActionIcon,
  ScrollArea,
  useMantineTheme,
  Space,
  Tooltip,
} from '@mantine/core'
import { IconChecks, IconSend } from '@tabler/icons-react'
import { useAuth } from '@clerk/clerk-react'

export const Inbox = ({ data, openChatModal }) => {
  const { userId } = useAuth()
  const theme = useMantineTheme()

  const rows =
    data !== null
      ? data.map((item) => {
          return (
            <tr key={item?.created_at}>
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
                    color={item?.read ? 'green' : 'yellow'}
                    variant={theme.colorScheme === 'dark' ? 'light' : 'outline'}
                  >
                    {item?.read ? 'read' : 'unread'}
                  </Badge>
                </Group>
              </td>
              <td>
                <Text>{item?.context}</Text>
              </td>
              <td>
                <Group spacing={0} position='right'>
                  {item?.user_key !== userId && (
                    <Tooltip label='Send message'>
                      <ActionIcon onClick={() => openChatModal(item)}>
                        <IconSend size='1rem' stroke={1.5} />
                      </ActionIcon>
                    </Tooltip>
                  )}
                  <Tooltip label='Mark as read'>
                    <ActionIcon>
                      <IconChecks size='1rem' stroke={1.5} />
                    </ActionIcon>
                  </Tooltip>
                </Group>
              </td>
            </tr>
          )
        })
      : null

  return (
    <ScrollArea>
      <Space h={27.5} />
      <Table sx={{ minWidth: 800 }} verticalSpacing='sm'>
        <tbody>{rows}</tbody>
      </Table>
    </ScrollArea>
  )
}
