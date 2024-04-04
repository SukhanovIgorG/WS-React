import {
  QueryClient,
  QueryClientProvider,
} from 'react-query';
import { Header } from './components'
import { MessengerPage } from './pages'
import { useConnectSocket } from './hooks/useConnectSocket';

import './App.css'

const queryClient = new QueryClient();

function App() {
  useConnectSocket();
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
