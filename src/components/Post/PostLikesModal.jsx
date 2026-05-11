import React, { useEffect, useState } from 'react'
import {Button, Modal} from "@heroui/react";
import { getPostLikes } from '../../services/postServices';

export default function PostLikesModal({ isOpen, onOpen, onOpenChange ,postId,userPostLikes}) {
    const[postLikes,setPostLikes]= useState([]);
   async function fetchPostLikes(){
    const response = await getPostLikes(postId);
      setPostLikes(response.data.data.likes);
   }
   useEffect(()=>{
    fetchPostLikes();
   },[userPostLikes]);
  return (
     <Modal isOpen={isOpen}  onOpenChange={onOpenChange}>
      <Modal.Backdrop>
        <Modal.Container>
          <Modal.Dialog className="sm:max-w-90">
            <Modal.CloseTrigger />
            <Modal.Header>
              <Modal.Heading>Post Likes</Modal.Heading>
            </Modal.Header>
            <Modal.Body>
          {postLikes.map((postLike) => (
              <div
                key={postLike._id}
                className="flex items-center justify-between bg-white border border-gray-400 rounded-xl p-4 shadow-sm mb-3"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={postLike.photo || "https://via.placeholder.com/40"}
                    alt={postLike.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-800">
                      {postLike.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {postLike.username}
                    </p>
                    <div className="flex gap-3 text-xs text-gray-600 mt-1">
                      <span>{postLike.followersCount} followers</span>
                      <span>{postLike.followingCount} following</span>
                      <span>{postLike.bookmarksCount} bookmarks</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            </Modal.Body>
            <Modal.Footer>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  )
}
