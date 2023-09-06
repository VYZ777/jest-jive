import {
  Dialog,
  Text,
  ActionIcon,
  ScrollArea,
  TextInput,
  Image,
  Group,
  Space,
} from '@mantine/core'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState, useRef } from 'react'
import { IconSend } from '@tabler/icons-react'
import { insertMessageData } from './message-slice'

export const Chat = ({ close, token, selectedUser, user }) => {
  const [value, setValue] = useState('')
  const messages = useSelector((state) => state.message.messages)
  const received = useSelector((state) => state.message.receivedMessages)
  const combinedMessages = [...messages, ...received].sort(
    (a, b) => new Date(a.created_at) - new Date(b.created_at)
  )
  const dispatch = useDispatch()
  const ref = useRef(null)

  const sendMessage = () => {
    dispatch(
      insertMessageData({ user, selectedUser, value: value.trim() })
    ).then(() => {
      setValue('')
      setTimeout(() => {
        if (ref.current) {
          ref.current.scrollIntoView({ behavior: 'smooth', block: 'end' })
        }
      }, 400)
    })
  }

  return (
    <>
      <Dialog
        style={{ backgroundColor: '#0c0d21' }}
        opened={selectedUser}
        withCloseButton
        onClose={close}
        size='lg'
        radius='md'
      >
        <Group position='center'>
          <Text size='xs'>Chat with</Text>
        </Group>
        <Group position='left' spacing='sm'>
          <Image
            maw={40}
            mx={10}
            radius={500}
            src={selectedUser?.logo_img}
            alt={selectedUser?.name}
          />
          <Text>{selectedUser?.name}</Text>
        </Group>
        <ScrollArea
          style={{
            backgroundColor: '#2b2c3d',
            border: '0.0625rem solid #4d4f66',
            borderRadius: '0.25rem',
            marginLeft: '1rem',
            marginRight: '1.8rem',
            marginTop: '1rem',
          }}
          h={500}
          type='scroll'
          scrollbarSize={5}
        >
          {combinedMessages.map((message) => (
            <Group
              key={message?.id}
              position={message?.user_from === user?.id ? 'right' : 'left'}
            >
              <Space ref={ref} h={50} />
              <Group
                style={{
                  backgroundColor:
                    message?.user_from === user?.id ? '#0c0d21' : '#1d1e30',
                  padding: '0.5rem',
                  borderRadius: '0.25rem',
                  maxWidth: '70%',
                }}
              >
                <Text>{message?.context}</Text>
              </Group>
              <Space style={{ marginRight: '-0.5rem' }} />
            </Group>
          ))}
        </ScrollArea>
        <div
          style={{
            display: 'flex',
            borderRadius: '0.25rem',
            marginLeft: '1rem',
            marginRight: '1.8rem',
            marginTop: '0.5rem',
            alignItems: 'center',
          }}
        >
          <div style={{ width: '20rem' }}>
            <TextInput
              value={value}
              placeholder='Send message'
              onChange={(event) => setValue(event.currentTarget.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  sendMessage()
                }
              }}
            />
          </div>
          <ActionIcon
            onClick={sendMessage}
            style={{
              marginLeft: '1rem',
              backgroundColor: '#2b2c3d',
              scale: '1.25',
            }}
          >
            <IconSend />
          </ActionIcon>
        </div>
      </Dialog>
    </>
  )
}
