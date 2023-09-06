import { SignUp } from '@clerk/clerk-react'

export const SignUpPage = () => {
  return (
    <div
      style={{
        width: '100%',
        height: '50rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <SignUp />
    </div>
  )
}
