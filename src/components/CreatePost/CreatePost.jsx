import { Card, Input, Skeleton  } from '@heroui/react';
import { useDisclosure } from "@heroui/use-disclosure";
import React, { useContext } from 'react'
import { DEFAULT_AVATAR } from '../../lib/HelperFunctions/fn'
import { FomModal } from './FormModal'
import { UserContext } from '../../context/UserContext';

export default function CreatePost({fetchAllPosts}) {
     const { isOpen, onOpen, onOpenChange } = useDisclosure();
     const {profileData}   = useContext(UserContext);
  return (
    <>
    <Card className='p-7 space-y-5'>
        <h3 className='text-lg font-semibold'>Create Post</h3>
        <div className="flex items-center gap-5">
            

        {profileData?.photo ? <img alt='user-img' src={profileData?.photo} className='w-15 h-15 rounded-full shrink-0'/>:<Skeleton className="rounded-full w-15 h-15 shrink-0" />}
            <Input  onClick={onOpen}  type='text' placeholder='What on Your Mind ?' className='w-full'/>
            </div> 
    </Card>
    <FomModal isOpen={isOpen} onOpenChange={onOpenChange} callBack={fetchAllPosts} action="create"/>
    </>
  )
}
