// lib
import { BrowserRouter, Routes, Route }     from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';

// components
import { Add }                              from './pages/add/Add';
import { Books }                            from './pages/Books/Books';
import { Update }                           from './pages/update/Update';

// CSS
import './index.css';

const client = new QueryClient();

function App() {
  return (
    <>
        <QueryClientProvider client={client}>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Books />}/> 
                    <Route path='/add' element={<Add />}/>
                    <Route path='/book/update/:bookId' element={<Update />}/>
                </Routes>
            </BrowserRouter>
        </QueryClientProvider>
      </>
  )
}

export default App;