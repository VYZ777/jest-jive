import {
  Modal,
  useMantineTheme,
  ActionIcon,
  Input,
  Select,
  Textarea,
  MultiSelect,
  Button,
  Tooltip,
  Avatar,
  Group,
} from '@mantine/core'
import { DateTimePicker } from '@mantine/dates'
import { useDisclosure } from '@mantine/hooks'
import { IconPlus } from '@tabler/icons-react'
import { useEffect, useState, forwardRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useAuth } from '@clerk/clerk-react'
import { insertTaskData } from './tasks-slice'
import {
  readCategoryData,
  insertCategoryData,
} from '../categories/category-slice'

export const ModalCreateTask = ({ token, allUsers }) => {
  // states
  const [opened, { open, close }] = useDisclosure(false)
  const [selectedStatus, setSelectedStatus] = useState('')
  const [assigned, setAssigned] = useState(null)
  const [date, setDate] = useState(null)
  const [inputValue, setInputValue] = useState('')
  const [category, setCategory] = useState([])
  const { userId } = useAuth()
  const [descriptionValue, setDescriptionValue] = useState('')
  const categoryData = useSelector((state) => state.category.categories)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(readCategoryData({ token }))
  }, [])
  const theme = useMantineTheme()

  const handleStatusChange = (value) => {
    setSelectedStatus(value)
    if (selectedStatus !== 'todo') {
      setDate(null)
    }
  }

  const handleDateChange = (value) => {
    setDate(value)
  }

  const handleInputChange = (event) => {
    setInputValue(event.target.value)
  }

  const handleCategoryChange = (value) => {
    setCategory(value)
  }

  const handleDescriptionChange = (event) => {
    setDescriptionValue(event.target.value)
  }
  const handleSubmit = () => {
    if (inputValue && selectedStatus && category) {
      dispatch(
        insertTaskData({
          token,
          selectedStatus,
          inputValue,
          descriptionValue,
          date,
          category,
          assigned,
        })
      )
      close()
    }
  }

  const data = [
    { value: 'done', label: 'Done' },
    { value: 'todo', label: 'ToDo' },
    { value: 'expired', label: 'Expired' },
    { value: 'nottodo', label: 'Not To Do' },
  ]

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title='Creating task'
        overlayProps={{
          color:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[9]
              : theme.colors.gray[2],
          opacity: 0.55,
          blur: 3,
        }}
      >
        <Input
          onChange={handleInputChange}
          required={true}
          placeholder='Task name'
          maxLength={30}
          size='xs'
        />
        <div style={{ marginBottom: '1rem' }}></div>
        <Select
          label='Status'
          placeholder='Pick one'
          size='xs'
          value={selectedStatus}
          onChange={handleStatusChange}
          required={true}
          data={data}
        />
        <div style={{ marginBottom: '1rem' }}></div>
        <div
          style={{
            display: selectedStatus === 'todo' ? 'block' : 'none',
          }}
        >
          <DateTimePicker
            label='Pick date and time'
            placeholder='Pick date and time'
            maw={400}
            size='xs'
            mx='auto'
            onChange={handleDateChange}
          />
          <div style={{ marginBottom: '1rem' }}></div>
        </div>
        <Select
          label='Category'
          size='xs'
          placeholder='Select or create category'
          nothingFound='Nothing found'
          searchable
          onChange={handleCategoryChange}
          data={categoryData?.map((nameData) => ({
            value: nameData?.name,
            label: nameData?.name,
          }))}
          creatable
          required={true}
          getCreateLabel={(query) => `+ Create ${query}`}
          onCreate={(query) => {
            const item = { value: query, label: query }
            setCategory((current) => [...current, item])
            dispatch(insertCategoryData({ item, token }))
            return item
          }}
        />
        <div style={{ marginBottom: '1rem' }}></div>
        <Select
          size='xs'
          data={allUsers.map((user) => ({
            value: user?.id,
            label: user?.name,
          }))}
          label='Assigned'
          placeholder='Pick members'
          onChange={setAssigned}
          value={assigned}
        />
        <div style={{ marginBottom: '1rem' }}></div>
        <Textarea
          label='Description'
          onChange={handleDescriptionChange}
          placeholder='Type description'
          autosize
          minRows={2}
          maxLength={400}
          size='xs'
          style={{ height: '100%' }}
        />
        <div
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'end',
            alignItems: 'center',
            marginTop: '1rem',
          }}
        >
          <Button
            onClick={handleSubmit}
            variant='light'
            disabled={!inputValue || !selectedStatus || category.length === 0}
          >
            SUBMIT
          </Button>
        </div>
      </Modal>
      <Button
        onClick={open}
        variant='light'
        size='xs'
        compact
        rightIcon={<IconPlus size='0.8rem' stroke={1.5} />}
      >
        Create task
      </Button>
    </>
  )
}
