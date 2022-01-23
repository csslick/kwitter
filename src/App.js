import AppRouter from './componens/Router'
import { useState } from 'react';
import { auth } from './firebase';

function App() {
  console.log(auth.currentUser)
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
      <AppRouter isLoggedIn={isLoggedIn} />
      <footer>&copy; Kwitter {new Date().getFullYear()}</footer>
    </>
  );
}

export default App;
