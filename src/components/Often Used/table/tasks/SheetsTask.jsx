import { useEffect, useState } from 'react'
import {
  createStyles,
  Table,
  Checkbox,
  ScrollArea,
  Group,
  Avatar,
  Text,
  rem,
  Button,
  ActionIcon,
  Badge,
} from '@mantine/core'
import { useSelector, useDispatch } from 'react-redux'
import { IconTrash } from '@tabler/icons-react'
import { deleteTaskData } from './tasks-slice'
import { useNavigate } from 'react-router-dom'

const useStyles = createStyles((theme) => ({
  rowSelected: {
    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.fn.rgba(theme.colors[theme.primaryColor][7], 0.2)
        : theme.colors[theme.primaryColor][0],
  },
}))

export function SheetsTask({
  toggle,
  setSelectedTask,
  openTaskModal,
  selectedCategory,
}) {
  const { classes, cx } = useStyles()
  const [selection, setSelection] = useState([])
  const dispatch = useDispatch()
  const tasks = useSelector((state) => state.tasks.tasks)
  const navigate = useNavigate()
  const data = tasks

  const toggleRow = (id) =>
    setSelection((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    )

  const toggleAll = () =>
    setSelection((current) =>
      current.length === data.length ? [] : data.map((item) => item.id)
    )

  const deleteSelectedTasksById = () => {
    dispatch(deleteTaskData({ selection }))
    setSelectedTask(null)
  }

  const rows = data.map((item) => {
    const selected = selection.includes(item.id)
    const shouldShowTask =
      selectedCategory.length === 0 ||
      item.categories?.id === selectedCategory[0]

    return shouldShowTask ? (
      <tr key={item.id} className={cx({ [classes.rowSelected]: selected })}>
        <td>
          <Checkbox
            checked={selected}
            onChange={() => toggleRow(item.id)}
            transitionDuration={0}
          />
        </td>
        <td style={{ cursor: 'pointer' }} onClick={() => openTaskModal(item)}>
          <Group spacing='sm'>
            <Text size='sm' weight={500}>
              {item?.name}
            </Text>
          </Group>
        </td>
        <td style={{ cursor: 'pointer' }} onClick={() => openTaskModal(item)}>
          <Badge
            color={
              item?.status === 'done'
                ? 'green'
                : item?.status === 'expired'
                ? 'red'
                : item?.status === 'nottodo'
                ? 'yellow'
                : 'blue'
            }
          >
            {item?.status}
          </Badge>
        </td>
        <td
          style={{ cursor: 'pointer', display: 'flex' }}
          onClick={() => openTaskModal(item)}
        >
          {item?.user_data?.name ? (
            <>
              <Avatar
                radius={50}
                size={20}
                src={item?.user_data?.logo_img}
                style={{ marginRight: '0.5rem' }}
              />
              {item?.user_data?.name}
            </>
          ) : (
            'Nobody assigned'
          )}
        </td>
        <td style={{ cursor: 'pointer' }} onClick={() => openTaskModal(item)}>
          {item?.categories?.name}
        </td>
        <td style={{ cursor: 'pointer' }} onClick={() => openTaskModal(item)}>
          {item?.created_at}
        </td>
        <td style={{ cursor: 'pointer' }} onClick={() => openTaskModal(item)}>
          {item?.due_date}
        </td>
      </tr>
    ) : null
  })

  return (
    <ScrollArea>
      <Table miw={1230} verticalSpacing='sm'>
        <thead>
          <tr>
            <th style={{ width: rem(40) }}>
              <Checkbox
                onChange={toggleAll}
                checked={selection.length === data.length}
                indeterminate={
                  selection.length > 0 && selection.length !== data.length
                }
                transitionDuration={0}
              />
            </th>
            <th>
              <div
                style={{
                  gap: '0.75rem',
                  height: '100%',
                  display: 'flex',
                }}
              >
                {selection.length > 0 && (
                  <ActionIcon
                    onClick={deleteSelectedTasksById}
                    style={{
                      backgroundColor: '#1971c2',
                      position: 'absolute',
                      scale: '0.75',
                    }}
                    variant='light'
                  >
                    <IconTrash style={{ boxSizing: 'border-box' }} />
                  </ActionIcon>
                )}
                <div style={{ marginLeft: '3rem' }}>Task</div>
              </div>
            </th>
            <th>Status</th>
            <th>Assigned</th>
            <th>Category</th>
            <th>Created At</th>
            <th>Due Date</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </ScrollArea>
  )
}
