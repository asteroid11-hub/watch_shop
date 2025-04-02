import { useState } from 'react';
import RouterProvider from './routes/routerProvider';
import { BrowserRouter } from 'react-router';

function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <RouterProvider />
    </BrowserRouter>
  );
}

export default App;
