import { useState } from 'react'
import viteLogo from '/vite.svg'
import './App.css'
import { Routes, Route, Navigate } from 'react-router'
import Login from './pages/Login'
import Home from './pages/Home'
import Register from './pages/register'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { checkAuth } from './redux/authslice'

function App() {
  const dispatch = useDispatch();
  const { isauthenticated, loading } = useSelector((state) => state.auth)

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (loading) return <div className="min-h-screen bg-gray-50 flex items-center justify-center text-indigo-600 font-medium animate-pulse">Loading Workspace...</div>;

  return (
    <>
      <Routes>
        <Route
          path='/Login'
          element={isauthenticated ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path='/register'
          element={isauthenticated ? <Navigate to="/" /> : <Register />}
        />
        <Route
          path='/'
          element={isauthenticated ? <Home /> : <Navigate to="/Login" />}
        />
      </Routes>
    </>
  )
}

export default App
