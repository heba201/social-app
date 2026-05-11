import React, { useEffect, useState } from 'react'
import SideBar from '../../components/SideBar/SideBar';
import FriendReq from '../../components/FriendReq/FriendReq';
import { getAllPosts,getBookmarks, getProfilePosts, getUserPosts } from '../../services/postServices';
import PostSkeleton from '../../components/skeletons/postSkeleton';
import Post from '../../components/Post/Post';
import CreatePost from '../../components/CreatePost/CreatePost';
import { useParams } from 'react-router'
import { getUserProfileById } from '../../services/UserServices';

export default function UserPosts() {
 const[userPosts,setUserPosts] = useState([]);
 const[bookmarks,setBookmarks] = useState([]);
 const[userProfileData,setUserProfileData] = useState(null);
 const {userId} = useParams();

 async function fetchUserPosts(){
      const response = await getUserPosts(userId);
      setUserPosts(response.data.data.posts);
   }
 
 async function fetchAllPosts(){
     const response = await getAllPosts();
    setUserPosts(response.data.data.posts);
  }
   useEffect(()=>{
    fetchUserPosts();
    fetchUserProfileById();
   },[]);

      async function fetchBookmarks() {
          try {
           const response = await getBookmarks();
          setBookmarks(response.data.data.bookmarks);
          } catch (error) {
          }
         }


         async function fetchUserProfileById() {
          try {
           const response = await getUserProfileById(userId);
          setUserProfileData(response.data.data.user);
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

  {/* user profile */}
 <div className="bg-white p-5 text-center border rounded-lg ">
<div className="h-40 w-full mb-3">
          <img
            src={userProfileData?.cover ? userProfileData?.cover : "https://images.unsplash.com/photo-1506744038136-46273834b3fb"}
            alt="cover"
            className="w-full h-full object-cover border rounded-lg"
          />
        </div>
        <div className="flex justify-center">
          <img 
            src={userProfileData?.photo}
            alt="profile"
            className="w-24 h-24 rounded-full border-4 border-blue-500"
          />
        </div>
        <h1 className="mt-4 text-xl font-bold text-gray-800">
           {userProfileData?.name}
        </h1>
        <p className="text-gray-500 text-sm">
          {userProfileData?.email}
        </p>


        
          <div className="mt-5 space-y-3 text-sm text-gray-700 w-3/4 text-center mx-auto">
            <div className="flex justify-between border-b pb-2">
              <span className="font-medium">Username</span>
              <span>{userProfileData?.username}</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="font-medium">Gender</span>
              <span>{userProfileData?.gender}</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="font-medium">Date of Birth</span>
              <span>{userProfileData?.dateOfBirth?.split("T")[0]}</span>
            </div>

            <div className="flex justify-between">
              <span className="font-medium">Email</span>
              <span>{userProfileData?.email}</span>
            </div>
          </div>


          <div className="flex justify-around mt-6 border-t pt-4">
          <div>
            <p className="font-bold text-lg">{userProfileData?.followersCount}</p>
            <span className="text-gray-500 text-sm">Followers Count</span>
          </div>

          <div>
            <p className="font-bold text-lg">{userProfileData?.followingCount}</p>
            <span className="text-gray-500 text-sm">Following Count</span>
          </div>

          <div>
            <p className="font-bold text-lg">{userProfileData?.bookmarksCount}</p>
            <span className="text-gray-500 text-sm">Bookmarks Count</span>
          </div>
        </div>
 </div>


  {userPosts.length === 0 ? [...Array(10)].map((_,index)=><PostSkeleton key={index}/>)  : <>
   {userPosts && userPosts.map((post)=><Post key={post.id} post={post} bookmarks={bookmarks} fetchBookmarks={fetchBookmarks} fetchAllPosts={fetchAllPosts}/>)}  
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
