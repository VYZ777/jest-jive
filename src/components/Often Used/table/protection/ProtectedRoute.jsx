import { useEffect, useState } from 'react'
import { useUser, useAuth } from '@clerk/clerk-react'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { readSecuredInfo } from './protection-slice'

export const ProtectedRoute = ({ children }) => {
  const [renderCount, setRenderCount] = useState(0)

  const { token } = useParams()
  const { user, isSignedIn } = useUser()
  const { userId } = useAuth()
  const protection = useSelector((state) => state.protection.protection)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const secondCheck = () => {
    try {
      if (
        renderCount === 2 &&
        (protection === null || protection.length === 0)
      ) {
        navigate('/not-found')
      }
    } catch {
      navigate('/not-found')
    }
  }
  useEffect(() => {
    if (isSignedIn) {
      dispatch(readSecuredInfo({ token, userId }))
      setRenderCount((prevCount) => prevCount + 1)
    } else {
      navigate('/sign-in', {
        state: location.pathname,
      })
    }
  }, [])

  useEffect(() => {
    secondCheck()
  }, [renderCount])

  return children
}
