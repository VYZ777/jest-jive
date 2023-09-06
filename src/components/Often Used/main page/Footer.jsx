import { Link } from 'react-router-dom'

export const Footer = () => {
  return (
    <div style={{ width: '100%', height: '20rem' }}>
      <Link to='/about-us'>
        <p>About Us</p>
      </Link>
      <Link>
        <p>Support</p>
      </Link>
    </div>
  )
}
