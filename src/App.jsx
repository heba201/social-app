import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router'
import MainLayout from'./Layouts/MainLayout/MainLayout'
import AuthLayout from'./Layouts/AuthLayout/AuthLayout'
import NewsFeed from './pages/NewsFeed/NewsFeed';
import UserPosts from './pages/UserPosts/UserPosts';
import NotFound from './pages/NotFound/NotFound';
import Login from './pages/Auth/Login/Login';
import Register from './pages/Auth/Register/Register';
import { Button } from '@heroui/react';
import { ToastContainer } from 'react-toastify';
import AppProtectedRoutes from './components/ProtectedRoutes/AppProtectedRoutes';
import AuthProtectedRoutes from './components/ProtectedRoutes/AuthProtectedRoutes';
import PostDetails from './pages/PostDetails/PostDetails';
import Saved from './pages/Saved/Saved';
import ProfilePosts from './pages/ProfilePosts/ProfilePosts';
import Notifications from './pages/Notifications/Notifications';
import UserProfile from './pages/UserProfile/UserProfile';
import FollowSuggestions from './pages/FollowSuggestions/FollowSuggestions';
export default function App() {
  const routes = createBrowserRouter([
    {path:"",element:<MainLayout/>,children:[
    {index:true,element:<AppProtectedRoutes><NewsFeed/></AppProtectedRoutes>},
    {path:"/post/:id",element:<AppProtectedRoutes><PostDetails/></AppProtectedRoutes>},
    {path:"profile",element:<AppProtectedRoutes><ProfilePosts/></AppProtectedRoutes>},
    {path:"user-posts/:userId",element:<AppProtectedRoutes><UserPosts/></AppProtectedRoutes>},
    {path:"saved",element:<AppProtectedRoutes><Saved/></AppProtectedRoutes>},
    {path:"notifications",element:<AppProtectedRoutes><Notifications/></AppProtectedRoutes>},
    {path:"user-profile",element:<AppProtectedRoutes><UserProfile/></AppProtectedRoutes>},
    {path:"follow-suggestions",element:<AppProtectedRoutes><FollowSuggestions/></AppProtectedRoutes>},
    {path:"*",element:<NotFound/>},
   
  ]},
   {path:"",element:<AuthLayout/>,children:[
   {path:"login",element:<AuthProtectedRoutes><Login/></AuthProtectedRoutes>},
   {path:"register",element:<AuthProtectedRoutes><Register/></AuthProtectedRoutes>},
   ]},
  ]);
  return (
   <>
   <RouterProvider router={routes}>
   </RouterProvider>
    <ToastContainer position='top-center'/>
   </>
  )
}
