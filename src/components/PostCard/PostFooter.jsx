import React, { useContext, useEffect, useState } from 'react'
import { commentTime, getAvatar } from '../../lib/HelperFunctions/fn'
import { Button } from '@heroui/react';
import { FaChevronDown, FaThumbsUp } from 'react-icons/fa';
import { UserContext } from '../../context/UserContext';
import { CiEdit } from "react-icons/ci";
import { createCommentReply, getAllComments, getCommentReplies, likeComment, updateComment } from '../../services/commentsServices';
import { toast } from 'react-toastify';
import { FaSpinner } from "react-icons/fa6";
import { RiReplyFill , RiArrowDropDownLine  } from "react-icons/ri";

export default function PostFooter({topComment,comments,id,setComments}) {
 const [showMoreComments, setShowMoreComments] = useState(2);
 const [show, setShow] = useState(false);
 const [showUpdateComment,setShowUpdateComment] = useState(false);
 const {profileData}   = useContext(UserContext);
 const [updateCommentBody, setUpdateCommentBody] = useState("");
 const [commentsArr, setCommentsArr] = useState([]);
 const otherComments = comments?.filter((comment)=>comment._id !== topComment?._id);
 const [editcommentId, setEditcommentId] = useState(null);
 const [editCommentValue, setEditCommentValue] = useState("");
 const [isLoadingLike, setIsLoadingLike] = useState(false);
const [replyCommentId, setReplyCommentId] = useState(null);
const [replyCommentInput, setReplyCommentInput] = useState("");
const [commentReplies, setCommentReplies] = useState([]);
const [showCommentReplies, setShowCommentReplies] = useState(false);
const [commentRepliesId, setCommentRepliesId] = useState("");

function handleShowUpdate(commentText){
   setShow(!show);
   setEditcommentId(null);
   setUpdateCommentBody(commentText);
}

async function handleUpdateComment(){
  try {
    const formData = new FormData();
    formData.append("content", updateCommentBody);
     const response = await updateComment(id,formData);
     toast.success(response.data.message);
     } catch (error) {
      toast.error("Update comment failed");
  }finally{
     setUpdateCommentBody("");
     setShow(false);
     setEditcommentId(null);
  }
}

function handleShowUpdateComment(commentText,commentId){
setShowUpdateComment(!showUpdateComment);
setShow(false);
if (commentId === editcommentId) {
    setEditcommentId(null);
  } else {
    setEditcommentId(commentId);
    setEditCommentValue(commentText);
  }
}
async function handleLikeComment(commentId){
  try {
      setIsLoadingLike(true);
      const response = await likeComment(id,commentId);
      toast.success(response.data.message);
      retrieveAllComments();
  } catch (error) {
     console.log(error.response);
    toast.error("Comment like/unlike failed");
  }finally{
     setIsLoadingLike(false);
  }
}

async function retrieveAllComments() {
    try {
      const response = await getAllComments(id);
      console.log(response);
      setComments(response.data.data.comments);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleCreateCommentReply(commentId) {
    try {
      const formData = new FormData();
      formData.append("content", replyCommentInput);
      const response = await createCommentReply(id,commentId,formData);
      toast.success(response.data.message);
      setReplyCommentId(null);
      setReplyCommentInput("");
      fetchCommentReplies(commentId);
    } catch (error) {
       toast.error("Comment reply failed");
    }
  }

function handleShowCommentReply(commentId){
setShowUpdateComment(!showUpdateComment);
setShow(false);
if (commentId === replyCommentId) {
    setReplyCommentId(null);
  } else {
    setReplyCommentId(commentId);
  }
}

async function fetchCommentReplies(commentId) {
    try {
        const response = await getCommentReplies(id,commentId);
        setCommentReplies(response.data.data.replies);
        if(commentRepliesId === commentId){
          setCommentRepliesId(null);
          setShowCommentReplies(false);
        }else{
          setCommentRepliesId(commentId);
          setShowCommentReplies(true);
        }
      }catch (error) {
       console.log(error);
    }
  }

  return (
    <>
    <div className='px-4 py-3 bg-gray-50 border-t border-gray-100 space-y-3'>
 {(topComment) && (
  <div    className='flex items-start gap-3 bg-gray-300'>
<img src={getAvatar(topComment?.commentCreator?.photo)} alt={topComment?.commentCreator?.name} className='w-8 h-8 rounded-full object-cover' />
  
  <div className='min-w-0 flex-1'>
<div className='bg-gray-100 rounded-2xl rounded-tl-sm-px-3 py-2 inline-block'>
<p className='text-gray-900 text-[15px] font-semibold'>
{topComment?.commentCreator?.name ?? 'unknown'}
</p>
<p className='text-gray-800 text-[15px] mt-0.5 '>
{topComment?.content}
</p>
<div className="flex items-center justify-between gap-3">
  
{profileData?._id === topComment?.commentCreator?._id && (
<button className='cursor-pointer' onClick={() => handleShowUpdate(topComment?.content)}>
<CiEdit className='text-blue-500'/>
</button>
)}

{show && (
        <div className='flex gap-2 items-center'>
          <input type='text' value={updateCommentBody} onChange={(e) => setUpdateCommentBody(e.target.value)} className="flex-1 rounded-full border border-gray-200 bg-white px-4 py-2.5 text-[15px]"/>
          <button  disabled={!updateCommentBody} className="bg-blue-500 text-white px-4 py-2 rounded-lg cursor-pointer disabled:cursor-not-allowed" onClick={()=>(handleUpdateComment(topComment?._id))}>Save</button>
        </div> 
  )}



<button className="inline-flex items-center gap-1.5 cursor-pointer" onClick={()=>handleLikeComment(topComment._id)}>
      {topComment?.likes?.includes(profileData?._id) ? (isLoadingLike ? <FaSpinner className="w-3.5 h-3.5" /> : <FaThumbsUp className={`{w-3.5 h-3.5 text-blue-500`}/>):(isLoadingLike ? <FaSpinner className="w-3.5 h-3.5" />: <FaThumbsUp className={`{w-3.5 h-3.5`}/>) }    
          {topComment?.likes.length} likes
        </button>

        
<button   className='cursor-pointer' onClick={() => handleShowCommentReply(topComment._id)}>
<RiReplyFill />
</button>


{topComment._id === replyCommentId && (
<div className='flex gap-2 items-center'>
  <input type='text' value={topComment._id === replyCommentId ? replyCommentInput:''} onChange={(e) => setReplyCommentInput(e.target.value)} className="flex-1 rounded-full border border-gray-200 bg-white px-4 py-2.5 text-[15px]"/>
  <button disabled={!replyCommentInput} className="bg-blue-500 text-white px-4 py-2 rounded-lg cursor-pointer disabled:cursor-not-allowed" onClick={()=>(handleCreateCommentReply(topComment?._id))}>Save</button>
</div> 
 )}

</div>
<p className='text-gray-500 text-[12px] mt-1 ml-1'>
{commentTime(topComment?.createdAt) }{topComment.repliesCount}
</p>
</div>


{/* replies */}
{topComment._id === commentRepliesId && commentReplies.length> 0  &&
  <div className="flex items-center">
    <p className="text-black">Show {commentReplies.length} of replies</p>
    <button className="inline-flex items-center gap-1.5 cursor-pointer text-blue-500" onClick={()=>fetchCommentReplies(topComment._id)}>
    <RiArrowDropDownLine />
    </button>
  </div>
}
   {topComment._id === commentRepliesId && commentReplies.length> 0 && commentReplies.map((reply)=><>
  <div className="p-4 flex items-center gap-3">
<img src={reply?.commentCreator?.photo} alt='user-image' className='w-10 h-10 rounded-full object-cover' />
<h3 className='font-semibold text-gray-900'>{reply?.commentCreator?.name || 'unkown'}</h3>
  </div>
   <div className="px-4 pb-3">
<p className='text-gray-500 text-sm'>{reply?.content}</p>
  </div>
  </>
)}
  </div>
  </div>
 )}
 
 {otherComments && otherComments.slice(0,showMoreComments).map((comment)=><div key={comment._id} className='flex items-start gap-3'>
<img src={getAvatar(comment.commentCreator?.photo)} alt={comment.commentCreator.name} className='w-8 h-8 rounded-full object-cover' />
  
  <div className='min-w-0 flex-1'>
<div className='bg-gray-100 rounded-2xl rounded-tl-sm-px-3 py-2 inline-block'>
<p className='text-gray-900 text-[15px] font-semibold'>
{topComment.commentCreator?.name ?? 'unknown'}
</p>
<p className='text-gray-800 text-[15px] mt-0.5'>
{comment?.content}
</p>
<div className="flex items-center justify-between gap-3">

{profileData?._id === comment?.commentCreator?._id && (
<button key={`btn${comment._id}`} className='cursor-pointer' onClick={() => handleShowUpdateComment(comment?.content,comment._id)}>
<CiEdit className='text-blue-500'/>
</button>
)}

<button className="inline-flex items-center gap-1.5 cursor-pointer" onClick={()=>handleLikeComment(comment._id)}>
      {comment?.likes?.includes(profileData?._id) ? (isLoadingLike ? <FaSpinner className="w-3.5 h-3.5" /> : <FaThumbsUp className={`{w-3.5 h-3.5 text-blue-500`}/>):(isLoadingLike ? <FaSpinner className="w-3.5 h-3.5" />: <FaThumbsUp className={`{w-3.5 h-3.5`}/>) }    
          {comment?.likes.length} likes
        </button>


{comment._id === editcommentId && (
        <div className='flex gap-2 items-center'>
          <input type='text' value={comment._id === editcommentId ? editCommentValue:''} onChange={(e) => setEditCommentValue(e.target.value)} className="flex-1 rounded-full border border-gray-200 bg-white px-4 py-2.5 text-[15px]"/>
          <button disabled={!editCommentValue} className="bg-blue-500 text-white px-4 py-2 rounded-lg cursor-pointer disabled:cursor-not-allowed" onClick={()=>(handleUpdateComment(comment?._id))}>Save</button>
        </div> 
  )}

<button key={`replyBtn${comment._id}`} className='cursor-pointer' onClick={() => handleShowCommentReply(comment._id)}>
<RiReplyFill />
</button>

{comment._id === replyCommentId && (
<div className='flex gap-2 items-center'>
  <input type='text' value={comment._id === replyCommentId ? replyCommentInput:''} onChange={(e) => setReplyCommentInput(e.target.value)} className="flex-1 rounded-full border border-gray-200 bg-white px-4 py-2.5 text-[15px]"/>
  <button disabled={!replyCommentInput} className="bg-blue-500 text-white px-4 py-2 rounded-lg cursor-pointer disabled:cursor-not-allowed" onClick={()=>(handleCreateCommentReply(comment?._id))}>Save</button>
</div> 
 )}
  
</div>

{/* replies */}
{comment.repliesCount> 0 &&
  <div className="flex items-center">
    <p>Show {comment.repliesCount} of replies</p>
    <button className="inline-flex items-center gap-1.5 cursor-pointer" onClick={()=>fetchCommentReplies(comment._id)}>
    <RiArrowDropDownLine />
    </button>
  </div>
}
   {comment._id === commentRepliesId && commentReplies.length> 0 && commentReplies.map((reply)=><>
  <div className="p-4 flex items-center gap-3">
<img src={reply?.commentCreator?.photo} alt='user-image' className='w-10 h-10 rounded-full object-cover' />
<h3 className='font-semibold text-gray-900'>{reply?.commentCreator?.name || 'unkown'}</h3>
  </div>
   <div className="px-4 pb-3">
<p className='text-gray-500 text-sm'>{reply?.content}</p>
  </div>
  </>
)}

<p className='text-gray-500 text-[12px] mt-1 ml-1'>
{commentTime(comment.createdAt)}
</p>
</div>
  </div>
  </div>)}
{otherComments.length > showMoreComments && <>
 <div className="text-center">
 <Button type='button' onClick={()=>setShowMoreComments(showMoreComments+2)} className='bg-transparent flex items-center justify-center gap-1 text-gray-600 hover:text-gray-700 text-sm font-medium w-full py-1'>
  Show More Comments
  <FaChevronDown className='w-3.5 h-3.5'/>
  </Button>
  </div>
</>}
 
  </div>
    </>
  )
}
