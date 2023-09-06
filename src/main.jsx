import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ClerkProvider, SignedIn, SignedOut } from '@clerk/clerk-react'
import { store } from './store/index.js'
import { Provider } from 'react-redux'
import { MantineProvider } from '@mantine/core'
import { Notifications } from '@mantine/notifications'

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

ReactDOM.createRoot(document.getElementById('root')).render(
  <Suspense fallback='loading'>
    <ClerkProvider publishableKey={clerkPubKey}>
      <SignedIn>
        <Provider store={store}>
          <MantineProvider
            withGlobalStyles
            theme={{
              colorScheme: 'dark',
              colors: {
                dark: [
                  '#d5d7e0',
                  '#acaebf',
                  '#8c8fa3',
                  '#666980',
                  '#4d4f66',
                  '#34354a',
                  '#2b2c3d',
                  '#1d1e30',
                  '#0c0d21',
                  '#01010a',
                ],
              },
            }}
          >
            <Notifications />
            <App />
          </MantineProvider>
        </Provider>
      </SignedIn>
      <SignedOut>
        <Provider store={store}>
          <MantineProvider
            withGlobalStyles
            theme={{
              colorScheme: 'dark',
              colors: {
                dark: [
                  '#d5d7e0',
                  '#acaebf',
                  '#8c8fa3',
                  '#666980',
                  '#4d4f66',
                  '#34354a',
                  '#2b2c3d',
                  '#1d1e30',
                  '#0c0d21',
                  '#01010a',
                ],
              },
            }}
          >
            <Notifications />
            <App />
          </MantineProvider>
        </Provider>
      </SignedOut>
    </ClerkProvider>
  </Suspense>
)
