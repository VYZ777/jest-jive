import React from 'react'
import {
  IconChevronRight,
  IconExternalLink,
  IconSettings,
  IconClipboard,
  IconCheck,
} from '@tabler/icons-react'
import { Group, Avatar, Text, Menu, UnstyledButton, rem } from '@mantine/core'
import { useSelector } from 'react-redux'
import { notifications } from '@mantine/notifications'

export const WorkspaceButton = ({ openWorkspaceModal }) => {
  const workspace = useSelector((state) => state.workspace.workspace)

  function splitTextIntoArrays(text) {
    if (text) {
      const words = text.split(' ')
      const firstArray = [words[0]?.[0]?.toUpperCase() || '']
      const secondArray = [words[1]?.[0]?.toUpperCase() || '']
      return [firstArray, secondArray]
    } else {
      console.log('Text is empty')
      return []
    }
  }

  let initials = ['', ''] // По умолчанию инициалы пустые

  if (workspace?.name) {
    initials = splitTextIntoArrays(workspace.name)
  }

  return (
    <Group position='center'>
      <Menu width={300} offset={8}>
        <Menu.Target>
          <UnstyledButton
            sx={(theme) => ({
              display: 'block',
              width: '100%',
              padding: theme.spacing.md,
              color:
                theme.colorScheme === 'dark'
                  ? theme.colors.dark[0]
                  : theme.black,

              '&:hover': {
                backgroundColor:
                  theme.colorScheme === 'dark'
                    ? theme.colors.dark[8]
                    : theme.colors.gray[0],
              },
            })}
          >
            <Group>
              <Avatar src={null} alt={workspace?.name} color='blue'>
                {initials[0]}
                {initials[1]}
              </Avatar>
              <div style={{ flex: 1 }}>
                <Text size='sm' weight={500}>
                  {workspace?.name}
                </Text>
              </div>
              <IconChevronRight size='1rem' />
            </Group>
          </UnstyledButton>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item
            icon={<IconSettings size={rem(14)} />}
            onClick={() => openWorkspaceModal(true)}
          >
            Workspace Settings
          </Menu.Item>

          <Menu.Item
            onClick={() => {
              navigator.clipboard.writeText(
                `https://1103-37-48-50-9.ngrok-free.app/workspace/${workspace?.workspace_key}/invite/${workspace?.invite_key}`
              )
              notifications.show({
                icon: <IconCheck size='1.1rem' />,
                color: 'teal',
                title: 'Succes',
                message: 'Copied',
                autoClose: 2000,
              })
            }}
            icon={<IconClipboard size={rem(14)} />}
          >
            Copy invite link
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </Group>
  )
}
