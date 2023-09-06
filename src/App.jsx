import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Main } from './pages/Main'
import { Workspace } from './pages/Workspace'
import { InvitePage } from './pages/InvitePage'
import { About } from './pages/About'
import { SignInPage } from './pages/SignInPage'
import { SignUpPage } from './pages/SignUpPage'
import { NotFound } from './pages/NotFound'
import { Protect } from './pages/Protect'

const router = createBrowserRouter([
  {
    path: '/',
    Component: Main,
  },
  {
    path: '/workspace',
    Component: Workspace,
  },
  {
    path: '/workspace/:token',
    Component: Protect,
  },
  {
    path: '/workspace/:token/invite/:inviteToken',
    Component: InvitePage,
  },
  {
    path: '/about-us',
    Component: About,
  },
  {
    path: '/sign-in/*',
    Component: SignInPage,
  },
  {
    path: '/sign-up/*',
    Component: SignUpPage,
  },
  {
    path: '/not-found',
    Component: NotFound,
  },
])

function App() {
  return (
    <div>
      <RouterProvider
        router={router}
        fallbackElement={<div>Unknown page</div>}
      />
    </div>
  )
}

export default App
