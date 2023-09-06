import {
  Dialog,
  Group,
  Button,
  TextInput,
  Text,
  Select,
  ActionIcon,
  Textarea,
  ScrollArea,
  Input,
  Space,
  Avatar,
} from '@mantine/core'
import { useSelector, useDispatch } from 'react-redux'
import { format } from 'date-fns'
import { DateInput } from '@mantine/dates'
import { useState, useRef } from 'react'
import { IconPencil, IconCheck, IconSend } from '@tabler/icons-react'
import { insertCommentData } from './comments'
import { insertCategoryData } from '../categories/category-slice'
import { updateTaskData } from './tasks-slice'

export const TaskModal = ({ opened, close, selectedTask, token, user }) => {
  const [selectedStatus, setSelectedStatus] = useState(selectedTask?.status)
  const [date, setDate] = useState(null)
  const [dueDateState, setDueDateState] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const [editedText, setEditedText] = useState(selectedTask?.name)
  const [editedDescription, setEditedDescription] = useState(
    selectedTask?.description
  )
  const [category, setCategory] = useState([])
  const [value, setValue] = useState('')

  const comments = useSelector((state) => state.comments.comments)
  const categoryData = useSelector((state) => state.category.categories)

  const dispatch = useDispatch()

  const formatDate = (dateTimeString) => {
    const date = new Date(dateTimeString)
    return format(date, 'MMMM dd, yyyy HH:mm:ss')
  }
  const createdDate = formatDate(selectedTask?.created_at)
  const dueDate = formatDate(selectedTask?.due_date)

  const ref = useRef(null)

  const sendMessage = () => {
    dispatch(insertCommentData({ user, value, selectedTask })).then(() => {
      setValue('')
      setTimeout(() => {
        if (ref.current) {
          ref.current.scrollIntoView({ behavior: 'smooth', block: 'end' })
        }
      }, 400)
    })
  }

  const handleDescriptionChange = (event) => {
    setEditedDescription(event.target.value)
  }

  const handleStatusChange = (value) => {
    setSelectedStatus(value)
  }

  const handleDateChange = (value) => {
    setDate(value)
  }

  const handleDueDateChange = (value) => {
    setDueDateState(value)
  }

  const handleEditToggle = () => {
    setIsEditing(!isEditing)
  }

  const handleTextChange = (event) => {
    setEditedText(event.target.value)
  }

  const handleSave = () => {
    setIsEditing(false)
  }

  const handleCategoryChange = (value) => {
    setCategory(value)
  }
  const handleUpadate = () => {
    if (selectedStatus !== 'todo') {
      setDueDateState(null)
    }
    dispatch(
      updateTaskData({
        editedText,
        editedDescription,
        selectedStatus,
        date,
        dueDateState,
        selectedTask,
        category,
      }),
      close()
    )
  }
  const data = [
    { value: 'done', label: 'Done' },
    { value: 'todo', label: 'ToDo' },
    { value: 'expired', label: 'Expired' },
    { value: 'nottodo', label: 'Not To Do' },
  ]
  return (
    <>
      <Dialog
        style={{ backgroundColor: '#0c0d21' }}
        opened={selectedTask}
        withCloseButton
        onClose={close}
        size='lg'
        radius='md'
      >
        <div
          style={{
            marginTop: '1rem',
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {isEditing ? (
              <div style={{ scale: '0.8' }}>
                <TextInput
                  label='Task name'
                  maxLength={30}
                  value={editedText}
                  size='xs'
                  onChange={handleTextChange}
                />
              </div>
            ) : (
              <Text
                style={{
                  marginLeft: '1rem',
                }}
                size='xs'
                mb='xs'
                weight={500}
              >
                {editedText}
              </Text>
            )}
            <div style={{ display: 'flex' }}>
              <ActionIcon onClick={handleEditToggle}>
                <IconPencil size='0.8rem' />
              </ActionIcon>
              {isEditing && (
                <ActionIcon style={{ marginLeft: '0rem' }} onClick={handleSave}>
                  <IconCheck size='0.8rem' />
                </ActionIcon>
              )}
            </div>
          </div>
        </div>
        <div
          style={{
            marginTop: '1rem',
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          <div
            style={{
              marginTop: '-1rem',
              scale: '0.8',
              marginRight: '1rem',
              zIndex: '3',
            }}
          >
            <Select
              label='Status'
              placeholder={selectedTask?.status}
              size='xs'
              value={selectedStatus}
              onChange={handleStatusChange}
              data={data}
            />
          </div>
          <div
            style={{
              marginTop: '-1rem',
              scale: '0.8',
              marginRight: '1rem',
              zIndex: '3',
            }}
          >
            <Select
              label='Category'
              size='xs'
              placeholder={selectedTask?.categories?.name}
              nothingFound='Nothing found'
              searchable
              onChange={handleCategoryChange}
              data={categoryData?.map((nameData) => ({
                value: nameData?.name,
                label: nameData?.name,
              }))}
              creatable
              getCreateLabel={(query) => `+ Create ${query}`}
              onCreate={(query) => {
                const item = { value: query, label: query }
                dispatch(insertCategoryData({ item, token })).then(() => {
                  setCategory(query)
                })
                return item
              }}
            />
          </div>
          <div
            style={{
              marginTop: '-1rem',
              scale: '0.8',
              marginRight: '1rem',
              zIndex: '2',
            }}
          >
            <DateInput
              onChange={handleDueDateChange}
              label='Due Date'
              clearable
              size='xs'
              value={dueDateState}
              placeholder={dueDate}
              disabled={selectedStatus !== 'todo'}
              maw={600}
              mx='auto'
            />
          </div>
        </div>
        <div style={{ width: '100%' }}>
          <Textarea
            style={{ marginLeft: '1rem', marginRight: '1.8rem' }}
            label='Description'
            value={editedDescription}
            size='xs'
            onChange={handleDescriptionChange}
          />
        </div>
        <ScrollArea
          style={{
            backgroundColor: '#2b2c3d',
            border: '0.0625rem solid #4d4f66',
            borderRadius: '0.25rem',
            marginLeft: '1rem',
            marginRight: '1.8rem',
            marginTop: '1rem',
          }}
          h={250}
          type='scroll'
          scrollbarSize={5}
        >
          {comments.map((message) => (
            <Group
              key={message?.id}
              position={message?.user_id === user?.id ? 'right' : 'left'}
            >
              <Space ref={ref} h={50} />
              {message?.user_id !== user?.id && (
                <Avatar
                  size={20}
                  radius={50}
                  src={message?.user_data?.logo_img}
                />
              )}
              <Group
                style={{
                  backgroundColor:
                    message?.user_id === user?.id ? '#0c0d21' : '#1d1e30',
                  padding: '0.5rem',
                  borderTopRightRadius:
                    message?.user_id !== user?.id ? '5px' : '5px',
                  borderTopRightRadius:
                    message?.user_id !== user?.id ? '5px' : '5px',
                  borderBottomRightRadius:
                    message?.user_id !== user?.id ? '5px' : '5px',
                  borderBottomLeftRadius:
                    message?.user_id !== user?.id ? '10px' : '5px',
                  maxWidth: '70%',
                }}
                // className={message?.user_id !== user?.id ? 'comment-user' : ''}
              >
                <Text size={13}>{message?.context}</Text>
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
            <Input
              placeholder='Add Comment'
              value={value}
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
        <div
          style={{
            marginTop: '1rem',
            width: '93%',
            display: 'flex',
            justifyContent: 'end',
          }}
        >
          <Button onClick={handleUpadate} variant='light'>
            Save changes
          </Button>
        </div>
      </Dialog>
    </>
  )
}
