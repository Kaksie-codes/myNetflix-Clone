import { useEffect, useState ,lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
// import ErrorPage from './Pages/error/ErrorPage';
import HomePage from './Pages/homepage/HomePage';
// import MoviesPage from './Pages/moviespage/MoviesPage';
// import SignUpPage from './Pages/signuppage/SignUpPage';
import { auth } from './firebase';
import { login, logout } from './features/userSlice';
import { useSelector, useDispatch } from 'react-redux'
import './App.css';
// import ProfilePage from './Pages/profilepage/ProfilePage';
import { useNavigate } from 'react-router';

const MoviesPage = lazy(() => import("./Pages/moviespage/MoviesPage"))
const SignUpPage = lazy(() => import("./Pages/signuppage/SignUpPage"))
const ProfilePage = lazy(() => import("./Pages/profilepage/ProfilePage"))
const ErrorPage = lazy(() => import("./Pages/error/ErrorPage"))

function App() {     
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.user);
    const navigate = useNavigate()

    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged(userAuth => {
        if(userAuth){
          // console.log(userAuth)
          dispatch(login({
            userId: userAuth.uid,
            email: userAuth.email            
          }))
          navigate('/movies')
        }else{
            dispatch(logout())
            navigate("/"); 
        }
      });
      return unsubscribe;
    },[dispatch])

    const signUp = () => {
      setSignUp(true)
    }

    
  return (   
    <Suspense fallback={<h2>Loading...</h2>}>
        <Routes>
          {!user ? (
            <>
              <Route index element={<HomePage signUp={signUp}/>}/>
              <Route path="signin" element={<SignUpPage/>}/>
            </>
          ) : (
            <>
              <Route path="/movies" element={
               <Suspense fallback={<h2>Loading...</h2>}>
                 <MoviesPage/>
               </Suspense>
               }
              />
              <Route path="/profile" element={<ProfilePage/>}/>
            </>        
          )}
        </Routes>      
    </Suspense> 
    
  )
}

export default App;
