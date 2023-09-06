import { useState } from 'react'
import {
  IconGauge,
  IconFingerprint,
  IconActivity,
  IconSettings,
  IconNotification,
  IconPuzzle,
  IconHelp,
} from '@tabler/icons-react'
import { Box, NavLink } from '@mantine/core'

const data = [
  { icon: IconFingerprint, label: 'Security', link: 'security' },
  { icon: IconPuzzle, label: 'Integrations', link: 'integrations' },
  { icon: IconActivity, label: 'Analytics', link: 'analitycs' },
  { icon: IconNotification, label: 'Notification', link: 'notifications' },
  { icon: IconHelp, label: 'Help/Support', link: 'help' },
  { icon: IconSettings, label: 'Settings', link: 'settings' },
]

export const RightNavigationBar = ({ setLinkData }) => {
  const [active, setActive] = useState(0)

  const items = data.map((item, index) => (
    <NavLink
      key={item.label}
      active={index === active}
      label={item.label}
      description={item.description}
      rightSection={item.rightSection}
      icon={<item.icon size='1rem' stroke={1.5} />}
      onClick={() => {
        setActive(index)
        setLinkData(item.link)
      }}
      variant='subtle'
    />
  ))

  return <Box w={230}>{items}</Box>
}
