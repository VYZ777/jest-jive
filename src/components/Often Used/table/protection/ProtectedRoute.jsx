import { useEffect } from 'react'
import { useUser, useAuth } from '@clerk/clerk-react'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { readSecuredInfo } from './protection-slice'

export const ProtectedRoute = ({ children }) => {
  const { token } = useParams()
  const { user, isSignedIn } = useUser()
  const { userId } = useAuth()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const fetchData = () => {
      if (isSignedIn) {
        dispatch(readSecuredInfo({ token, userId })).then((response) => {
          if (response?.payload?.length === 0) {
            navigate('/not-found')
          }
          if (response?.payload?.[0]?.blocked === true) {
            navigate('/not-found')
          }
        })
      } else {
        navigate('/sign-in', {
          state: location.pathname,
        })
      }
    }

    fetchData()
  }, [])

  return children
}
