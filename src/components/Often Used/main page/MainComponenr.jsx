import { useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useUser } from '@clerk/clerk-react'
import { Button, Divider } from '@mantine/core'

export const MainComponent = () => {
  const tutorialRef = useRef(null)
  const { isSignedIn } = useUser()
  const location = useLocation()

  const scrollToTutorial = () => {
    tutorialRef.current.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }

  const navigate = useNavigate()

  const handleNavigate = () => {
    if (isSignedIn) {
      navigate('/workspace')
    } else {
      navigate('/sign-in', {
        state: '/workspace',
      })
    }
  }
  return (
    <div
      style={{ flexWrap: 'wrap', display: 'flex', justifyContent: 'center' }}
    >
      <div
        style={{
          width: '100%',
          height: '50rem',
          backgroundColor: '#0c0d21',
          flexWrap: 'wrap',
        }}
      >
        <h1
          style={{
            marginTop: '10rem',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          New generation of Height
        </h1>
        <div
          style={{
            marginBottom: '15rem',
            marginTop: '10rem',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Button
            style={{ marginRight: '5rem' }}
            onClick={handleNavigate}
            variant='light'
          >
            Get Started
          </Button>
          <Button
            style={{ marginLeft: '5rem' }}
            onClick={scrollToTutorial}
            variant='light'
          >
            See Tutorial
          </Button>
        </div>
      </div>

      <div id='tutorial' ref={tutorialRef} style={{ display: 'flex' }}>
        <div
          style={{
            width: '40rem',
            height: '40rem',
            borderRadius: '5%',
            backgroundColor: '#0c0d21',
            marginRight: '40rem',
            marginTop: '5rem',
          }}
        ></div>
        <div
          style={{
            flexWrap: 'wrap',
            width: '30rem',
            marginLeft: '-30rem',
            marginTop: '5rem',
          }}
        >
          <h1>Some Text</h1>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptate
            placeat iure distinctio? Quaerat autem atque dolor laboriosam
            doloribus eaque! Inventore quia animi nulla! Dolorem, ab. Pariatur
            eius est cum placeat.
          </p>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptate
            placeat iure distinctio? Quaerat autem atque dolor laboriosam
            doloribus eaque! Inventore quia animi nulla! Dolorem, ab. Pariatur
            eius est cum placeat.
          </p>
        </div>
      </div>
      <div style={{ display: 'flex' }}>
        <div
          style={{
            flexWrap: 'wrap',
            width: '30rem',
            marginRight: '-30rem',
            marginTop: '5rem',
          }}
        >
          <h1>Some Text</h1>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptate
            placeat iure distinctio? Quaerat autem atque dolor laboriosam
            doloribus eaque! Inventore quia animi nulla! Dolorem, ab. Pariatur
            eius est cum placeat.
          </p>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptate
            placeat iure distinctio? Quaerat autem atque dolor laboriosam
            doloribus eaque! Inventore quia animi nulla! Dolorem, ab. Pariatur
            eius est cum placeat.
          </p>
        </div>
        <div
          style={{
            width: '40rem',
            height: '40rem',
            borderRadius: '5%',
            backgroundColor: '#0c0d21',
            marginLeft: '40rem',
            marginTop: '5rem',
          }}
        ></div>
      </div>
      <div style={{ display: 'flex' }}>
        <div
          style={{
            width: '40rem',
            height: '40rem',
            borderRadius: '5%',
            backgroundColor: '#0c0d21',
            marginTop: '5rem',
          }}
        ></div>

        <div
          style={{
            flexWrap: 'wrap',
            width: '30rem',
            marginLeft: '10rem',
            marginTop: '5rem',
          }}
        >
          <h1>Some Text</h1>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptate
            placeat iure distinctio? Quaerat autem atque dolor laboriosam
            doloribus eaque! Inventore quia animi nulla! Dolorem, ab. Pariatur
            eius est cum placeat.
          </p>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptate
            placeat iure distinctio? Quaerat autem atque dolor laboriosam
            doloribus eaque! Inventore quia animi nulla! Dolorem, ab. Pariatur
            eius est cum placeat.
          </p>
        </div>
      </div>
      <div style={{ flexWrap: 'wrap' }}>
        <h1
          style={{
            marginTop: '5rem',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          Some Text
        </h1>
        <div
          style={{
            width: '55rem',
            height: '40rem',
            borderRadius: '5%',
            backgroundColor: '#0c0d21',
            marginTop: '2rem',
            marginBottom: '5rem',
          }}
        ></div>
      </div>
    </div>
  )
}
