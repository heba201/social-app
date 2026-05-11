import React, { useContext, useState } from 'react'
import { commentTime, getAvatar } from '../../lib/HelperFunctions/fn'
import { FaEllipsisH } from 'react-icons/fa'
import {Button, ButtonGroup, Dropdown, Label} from "@heroui/react";
import { useDisclosure } from "@heroui/use-disclosure";
import { FomModal } from '../CreatePost/FormModal';
import { toast } from "react-toastify";
import { deletePost } from '../../services/postServices';
import { Link as RouterLink } from "react-router-dom";
import { UserContext } from '../../context/UserContext';
import { followUser } from '../../services/UserServices';
import { FaSpinner } from "react-icons/fa6";

export default function PostHeader({photo,name,createdAt,fetchAllPosts,image,body,id,fetchProfilePosts,userId=null}) {
  const[isLoadingFollow,setIsLoadingFollow] = useState(false);
  const[followUserId,setFollowUserId] = useState("");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const {profileData,getUserProfile}   = useContext(UserContext);
  const toUrl = userId === profileData?._id ?  '/profile' :`/user-posts/${userId}`;

  
  async function handleDeletePost(){
    try {
    const response = await deletePost(id);
    console.log(response);
    toast.success(response.data.message);
    fetchAllPosts();
    fetchProfilePosts();
    } catch (error) {
       toast.error('Failed to delete post');
    }         
  }

 async function handleFollowUser(){
    try {
      setIsLoadingFollow(true);
      setFollowUserId(userId);
    const response = await followUser(userId);
    toast.success(response.data.message);
    getUserProfile();
    } catch (error) {
      toast.error("Failed to follow user");
    }finally{
      setIsLoadingFollow(false);
      setFollowUserId("");
    }
    
  }
  return (
    <>
    <div className='p-4 flex items-center gap-3'>
<img src={getAvatar(photo)} alt='post-image' className='w-10 h-10 rounded-full object-cover' />
<div className='min-w-0 flex-1'>
 <div className="flex gap-3">
<RouterLink  to={toUrl}><h3 className='font-semibold text-gray-900'>{name || 'unkown'}</h3></RouterLink>
{isLoadingFollow && followUserId === userId ? <FaSpinner/> :   <button className='text-blue-500 font-semibold cursor-pointer' onClick={()=>{handleFollowUser()}}> {profileData?.following?.includes(userId) ? 'Un follow': 'Follow'}</button>}
 </div>
  
<p className='text-gray-500 text-sm'>{commentTime(createdAt)}</p>
</div>
<div className='p-2'>
   <Dropdown>
      <Button aria-label="Menu" variant='transparent'>
        <FaEllipsisH />
      </Button>
      <Dropdown.Popover>
        <Dropdown.Menu onAction={(key) => console.log(`Selected: ${key}`)}>
          <Dropdown.Item id="edit-file" textValue="Edit file">
            <button onClick={onOpen}>Edit Post</button>
          </Dropdown.Item>
          <Dropdown.Item id="delete-file" textValue="Delete file" variant="danger">
            <button  onClick={()=>handleDeletePost()}>Delete Post</button>
            
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown>


<FomModal isOpen={isOpen} onOpenChange={onOpenChange} callBack={fetchAllPosts} action="edit" id={id} image={image} body={body}/>
</div>
</div>
    </>
  )
}
