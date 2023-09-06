import { SignIn } from '@clerk/clerk-react'
import { useLocation } from 'react-router-dom'

export const SignInPage = () => {
  const location = useLocation()
  return (
    <div
      style={{
        width: '100rem',
        height: '50rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <SignIn redirectUrl={location?.state || '/'} />
    </div>
  )
}
