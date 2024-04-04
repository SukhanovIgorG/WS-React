import { Header } from './components'
import { MessengerPage } from './pages'
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query';

import './App.css'

const queryClient = new QueryClient();

function App() {

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Header />
        <main className='main'>
          <MessengerPage />
        </main>
      </QueryClientProvider>
    </>
  )
}

export default App
