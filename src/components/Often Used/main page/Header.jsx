import { Link } from 'react-router-dom'
import { Button } from '@mantine/core'

export const Header = () => {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '5rem',
        backgroundColor: '#1d1e30',
        zIndex: 5,
      }}
    >
      <Link to='/'>
        <img
          src='../../../../public/JetJiveLogo.png'
          alt=''
          style={{ width: '50px', height: '50px', marginLeft: '0.5rem' }}
        />
      </Link>
      <div>
        <Link to='/sign-in'>
          <Button style={{ marginRight: '2rem' }} variant='light'>
            Sign In
          </Button>
        </Link>
        <Link to='/sign-up'>
          <Button style={{ marginRight: '1rem' }} variant='light'>
            Sign Up
          </Button>
        </Link>
      </div>
    </div>
  )
}
