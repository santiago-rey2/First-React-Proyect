import Routing from './Routing'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

function App() {
  return (
    <div className="app">
      <QueryClientProvider client={queryClient}>
        <Routing />
      </QueryClientProvider>
    </div>
  )
}

export default App
