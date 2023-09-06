import { Link } from 'react-router-dom'
import { Autocomplete } from '@mantine/core'
import '../../../index.css'

export const HeaderPanel = () => {
  return (
    <div
      style={{
        width: '100%',
        height: '2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Link style={{ textDecoration: 'none' }} to='/'>
        <div
          style={{
            display: 'flex',
            width: '5rem',
            height: '2rem',
            justifyContent: 'start',
            alignItems: 'center',
            marginRight: '1.5rem',
          }}
        >
          <img
            src='../../../../public/JetJiveLogo.png'
            alt='Go to the main page'
            style={{ width: '2rem', height: '2rem' }}
          />
          <p style={{ fontSize: '1rem', marginTop: '0' }}>JestJive</p>
        </div>
      </Link>
      <Autocomplete
        placeholder='Search in DOCs'
        radius='xl'
        size='xs'
        data={['React', 'Angular', 'Svelte', 'Vue']}
        style={{ width: '40rem' }}
      />
    </div>
  )
}
