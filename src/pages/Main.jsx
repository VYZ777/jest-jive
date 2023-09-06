import { Header } from '../components/Often Used/main page/Header'
import { MainComponent } from '../components/Often Used/main page/MainComponenr'
import { Footer } from '../components/Often Used/main page/Footer'

export const Main = () => {
  return (
    <div>
      <Header />
      <div
        style={{
          height: '0.02rem',
          backgroundColor: '#CCCCCC',
          marginTop: '5rem',
        }}
      ></div>
      <MainComponent />
      <div style={{ height: '0.02rem', backgroundColor: '#CCCCCC' }}></div>
      <Footer />
    </div>
  )
}
