import {
  createStyles,
  Navbar,
  UnstyledButton,
  Badge,
  Text,
  Group,
  rem,
  Avatar,
  Space,
  NavLink,
  Button,
} from '@mantine/core'
import { IconCheckbox, IconInbox, IconUsers } from '@tabler/icons-react'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { readWorkspaceData } from '../../../pages/workspace-slice'
import { ModalCreateTask } from './tasks/ModalCreateTask'
import { WorkspaceButton } from './WorkspaceButton'
import { useDisclosure } from '@mantine/hooks'
import { readCategoryData } from './categories/category-slice'

const useStyles = createStyles((theme) => ({
  navbar: {
    paddingTop: 0,
    height: '50rem',
  },

  section: {
    marginLeft: `calc(${theme.spacing.md} * -1)`,
    marginRight: `calc(${theme.spacing.md} * -1)`,
    marginBottom: theme.spacing.md,

    '&:not(:last-of-type)': {
      borderBottom: `${rem(1)} solid ${
        theme.colorScheme === 'dark'
          ? theme.colors.dark[4]
          : theme.colors.gray[3]
      }`,
    },
  },

  searchCode: {
    fontWeight: 700,
    fontSize: rem(10),
    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[7]
        : theme.colors.gray[0],
    border: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[2]
    }`,
  },

  mainLinks: {
    paddingLeft: `calc(${theme.spacing.md} - ${theme.spacing.xs})`,
    paddingRight: `calc(${theme.spacing.md} - ${theme.spacing.xs})`,
    paddingBottom: theme.spacing.md,
  },

  mainLink: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    fontSize: theme.fontSizes.xs,
    padding: `${rem(8)} ${theme.spacing.xs}`,
    borderRadius: theme.radius.sm,
    fontWeight: 500,
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[0]
        : theme.colors.gray[7],

    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
      color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    },
  },

  mainLinkInner: {
    display: 'flex',
    alignItems: 'center',
    flex: 1,
  },

  mainLinkIcon: {
    marginRight: theme.spacing.sm,
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[2]
        : theme.colors.gray[6],
  },

  mainLinkBadge: {
    padding: 0,
    width: rem(20),
    height: rem(20),
    pointerEvents: 'none',
  },

  collections: {
    paddingLeft: `calc(${theme.spacing.md} - ${rem(6)})`,
    paddingRight: `calc(${theme.spacing.md} - ${rem(6)})`,
    paddingBottom: theme.spacing.md,
  },

  collectionsHeader: {
    paddingLeft: `calc(${theme.spacing.md} + ${rem(2)})`,
    paddingRight: theme.spacing.md,
    marginBottom: rem(5),
  },

  collectionLink: {
    display: 'block',
    padding: `${rem(8)} ${theme.spacing.xs}`,
    textDecoration: 'none',
    borderRadius: theme.radius.sm,
    fontSize: theme.fontSizes.xs,
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    lineHeight: 1,
    fontWeight: 500,

    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
      color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    },
  },
}))

const collections = [
  { emoji: '👍', label: 'Sales' },
  { emoji: '🚚', label: 'Deliveries' },
  { emoji: '💸', label: 'Discounts' },
  { emoji: '💰', label: 'Profits' },
  { emoji: '✨', label: 'Reports' },
  { emoji: '🛒', label: 'Orders' },
  { emoji: '📅', label: 'Events' },
  { emoji: '🙈', label: 'Debts' },
  { emoji: '💁‍♀️', label: 'Customers' },
]

export const Menu = ({
  token,
  setLinkData,
  allUsers,
  setSelectedCategory,
  selectedCategory,
  openWorkspaceModal,
}) => {
  const { classes } = useStyles()
  const dispatch = useDispatch()
  const workspace = useSelector((state) => state.workspace.workspace)
  const tasks = useSelector((state) => state.tasks.tasks)
  const categories = useSelector((state) => state.category.categories)
  const unread = useSelector((state) => state.message.unread)
  const filteredUsers = allUsers.filter((user) => !user.blocked)
  const [opened, { open, close }] = useDisclosure(false)

  const handleChooseCategory = (value) => {
    setSelectedCategory([value])
  }

  useEffect(() => {
    dispatch(readWorkspaceData({ token })).then((response) => {
      if (response.payload) {
        dispatch(readCategoryData({ token }))
      }
    })
  }, [])

  const links = [
    {
      icon: IconCheckbox,
      label: 'Tasks',
      notifications: tasks?.length,
      path: 'tasks',
    },
    {
      icon: IconInbox,
      label: 'Inbox',
      notifications: unread ? unread.length : 0,
      path: 'inbox',
    },
    {
      icon: IconUsers,
      label: 'Users',
      notifications: filteredUsers?.length,
      path: 'users',
    },
  ]

  const mainLinks = links.map((link) => (
    <UnstyledButton
      onClick={() => setLinkData(link.path)}
      key={link.label}
      className={classes.mainLink}
    >
      <div className={classes.mainLinkInner}>
        <link.icon size={20} className={classes.mainLinkIcon} stroke={1.5} />
        <span>{link.label}</span>
      </div>
      {link.notifications && (
        <Badge size='sm' variant='filled' className={classes.mainLinkBadge}>
          {link.notifications}
        </Badge>
      )}
    </UnstyledButton>
  ))
  const collectionLinks =
    categories !== null
      ? categories.map((collection) => (
          <div
            style={{ cursor: 'pointer' }}
            onClick={() => handleChooseCategory(collection?.id)}
            key={collection?.name}
            className={classes.collectionLink}
          >
            {collection?.name}
          </div>
        ))
      : null
  return (
    <Navbar
      width={{ sm: 300 }}
      p='md'
      className={classes.navbar}
      style={{ marginTop: '-1.87rem', marginBottom: '-5rem' }}
    >
      <Navbar.Section className={classes.section}>
        <WorkspaceButton
          workspace={workspace}
          openWorkspaceModal={openWorkspaceModal}
        />
      </Navbar.Section>
      <Navbar.Section className={classes.section}>
        <div className={classes.mainLinks}>{mainLinks}</div>
      </Navbar.Section>

      <Navbar.Section className={classes.section}>
        <Group className={classes.collectionsHeader} position='apart'>
          <Text size='xs' weight={500} color='dimmed'>
            Collections
          </Text>
        </Group>
        <NavLink label='Categories' childrenOffset={28} defaultOpened>
          {selectedCategory.length > 0 && (
            <Button
              h={20}
              size='xs'
              onClick={() => {
                setSelectedCategory([])
              }}
              variant='light'
            >
              Reset filter
            </Button>
          )}
          <div className={classes.collections}>{collectionLinks}</div>
        </NavLink>
      </Navbar.Section>
      <Navbar.Section>
        {allUsers && <ModalCreateTask allUsers={allUsers} token={token} />}
      </Navbar.Section>
    </Navbar>
  )
}
