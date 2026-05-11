import React, { useContext, useEffect, useState } from 'react'
import SideBar from '../../components/SideBar/SideBar';
import FriendReq from '../../components/FriendReq/FriendReq';
import { getAllPosts,getBookmarks } from '../../services/postServices';
import PostSkeleton from '../../components/skeletons/PostSkeleton';
import Post from '../../components/Post/Post';
import CreatePost from '../../components/CreatePost/CreatePost';
import { UserContext } from '../../context/UserContext';
 

export default function NewsFeed() {
 const[posts,setPosts] = useState([]);
 const[bookmarks,setBookmarks] = useState([]);
 const {profileData} = useContext(UserContext);
 async function fetchAllPosts(){
     const response = await getAllPosts();
     setPosts(response.data.data.posts);
  }
   useEffect(()=>{
    fetchAllPosts();
   },[]);

      async function fetchBookmarks() {
          try {
           const response = await getBookmarks();
           setBookmarks(response.data.data.bookmarks);
          } catch (error) {
          }
         }

  return (
    <>
    <div className="bg-gray-200">
    <div className="container pt-5">
      <div className="grid grid-cols-4">
        <div className="col-span-1 hidden lg:block">
          <SideBar/>
      </div>
 
<div className="col-span-4 lg:col-span-2 space-y-5 mb-10">
  <CreatePost fetchAllPosts={fetchAllPosts}/>
  {posts.length === 0 ? [...Array(10)].map((_,index)=><PostSkeleton key={index}/>)  : <>
   {posts && posts.map((post)=><Post key={post.id} post={post} bookmarks={bookmarks} fetchBookmarks={fetchBookmarks} fetchAllPosts={fetchAllPosts}/>)}  
  </> }
   
      </div>

      <div className="col-span-1 hidden lg:block">
          <FriendReq/>
      </div>

    </div>
   </div>
    </div>
    </> 
  )
}
