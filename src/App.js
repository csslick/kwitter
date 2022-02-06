import AppRouter from './componens/Router'
import { useState, useEffect } from 'react';
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';

function App() {
  const [init, setInit] = useState(false); // 접속상태
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    // 접속?
    onAuthStateChanged(auth, user => {
      // 사용자 접속?
      if(user) {
        setIsLoggedIn(true);
        setUserObj(user);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true)
    })
  }, []);
  // console.log(auth.currentUser)
  return (
    <>
      {
        init ? <AppRouter isLoggedIn={isLoggedIn} userObj={userObj} /> : '접속중...'
      }  
      <footer>&copy; Kwitter {new Date().getFullYear()}</footer>
    </>
  );
}

export default App;
