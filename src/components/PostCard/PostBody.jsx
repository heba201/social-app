import React, { useContext, useEffect,useState } from "react";
import { FaSmile } from "react-icons/fa";
import { FaCamera, FaComment, FaShare, FaThumbsUp } from "react-icons/fa6";
import { FaBookmark } from "react-icons/fa";
import { CiBookmark } from "react-icons/ci";
import { Link } from "react-router";
import { createComment, getAllComments } from "../../services/commentsServices";
import { FaSpinner } from "react-icons/fa6";
import { IoMdSend } from "react-icons/io";
import { toast } from "react-toastify";
import { FaHourglassEnd } from "react-icons/fa";
import { bookmarkPost, getPostLikes, likePost } from "../../services/postServices";
import { UserContext } from "../../context/UserContext";
import { ShareFormModal } from "../CreatePost/ShareFormModal";
import { useDisclosure } from "@heroui/use-disclosure";
import { FaRegHeart  } from "react-icons/fa";
import PostLikesModal from "../Post/PostLikesModal";

export default function PostBody({
  image,
  id,
  body,
  handlePostWithoutImage,
  setComments,
  bookmarks,
  fetchBookmarks,
  postLikes,
  isShare,
  sharesCount,
  fetchAllPosts
}) {
  
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingComment, setIsLoadingComment] = useState(false);
  const [isLoadingBookmark, setIsLoadingBookmark] = useState(false);
  const [commentBody, setCommentBody] = useState("");
  const exists = bookmarks?.find?.(item => item._id === id) ? true : false;
  const bookmarkIcon = exists ? <FaBookmark className="w-5 h-5" />:<CiBookmark className="w-5 h-5" />;
  const[postLikesCount,setPostLikesCount] = useState(postLikes?.length);
  const[userPostLikes,setUserPostLikes]= useState(postLikes);
  const {profileData}   = useContext(UserContext);
  const[likeIconColor,setLikeIconColor] = useState(postLikes?.includes(profileData?._id) ? 'text-blue-500':'text-gray-500');
  const {
      isOpen: isOpenOne,
      onOpen: onOpenOne,
      onOpenChange: onOpenChangeOne,
      } = useDisclosure();
        
      const {
     isOpen: isOpenTwo,
     onOpen: onOpenTwo,
     onOpenChange: onOpenChangeTwo, 
     } = useDisclosure()
 
  async function fetchAllComments(postId) {
    try {
      setIsLoading(true);
      const response = await getAllComments(postId);
      setComments(response.data.data.comments);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }
  async function handleAddComment(postId) {
    try {
      setIsLoadingComment(true);
      const formData = new FormData();
      formData.append("content", commentBody);
      const response = await createComment(postId, formData);
      setCommentBody("");
      fetchAllComments(id);
      toast.success(response.data.message);
    } catch (error) {
      toast.error("Comment failed");
    } finally {
      setIsLoadingComment(false);
    }
  }
  async function handleBookmark(postId) {
    try {
      setIsLoadingBookmark(true);
      const response = await bookmarkPost(postId);
      fetchBookmarks();
      toast.success(response.data.message);
    } catch (error) {
      console.log(error.response);
      toast.error("Bookmark post failed");
    }finally{
      setIsLoadingBookmark(false);
    }
  }
 async function handleLike(postId) {
    try {
      const response = await likePost(postId);
      toast.success(response.data.message);
      fetchPostLikes(postId);  
    } catch (error) {
      toast.error("Like post failed");
    }finally{
      
    }
  }
  async function fetchPostLikes(postId) {
            try {
             const response = await getPostLikes(postId);
             const fetchedPostLikes = response.data.data.likes;
             setPostLikesCount(fetchedPostLikes.length);
             setUserPostLikes(fetchedPostLikes);
             const userIds = fetchedPostLikes.map(like => like._id);
             setUserPostLikes(userIds);
             const likeFound = userIds.includes(profileData?._id);
             if(likeFound){
              setLikeIconColor('text-blue-500');
             }
             else{
              setLikeIconColor('text-gray-500');
             }
            } catch (error) {
              console.log(error.response);
            }
           }
          
  return (
    <>
      {image && (
        <div className="px-4 pb-3">
          <p className="text-gray-900 text-[15px] whitespace-pre-line">
            {body}
          </p>
        </div>
      )}
      <Link to={`/post/${id}`}>
        {image ? (
          <img
            src={image}
            alt="Post image"
            className="w-full max-h-125 object-cover"
          />
        ) : (
          handlePostWithoutImage(image, body)
        )}
      </Link>

      <div className="px-4 py-2 flex items-center justify-between gap-4 text-gray-500 text-sm border-t border-gray-100">
        
        <button className="inline-flex items-center gap-1.5 cursor-pointer" onClick={()=>handleLike(id)}>
          <FaRegHeart  className={`{w-3.5 h-3.5 ${likeIconColor}`}/>
        </button>
       
        <button className="inline-flex items-center gap-1.5 cursor-pointer" onClick={onOpenTwo}>
          <FaThumbsUp className={`{w-3.5 h-3.5 ${likeIconColor}`}/>
          {postLikesCount} likes
        </button>

          <PostLikesModal isOpen={isOpenTwo} onOpenChange={onOpenChangeTwo} postId={id} userPostLikes={userPostLikes}/>
        <button
          className="inline-flex items-center gap-1.5 cursor-pointer"
          onClick={() => fetchAllComments(id)}
        >
          {isLoading ? (
            <FaSpinner className="w-3.5 h-3.5" />
          ) : (
            <FaComment className="w-3.5 h-3.5" />
          )}
          comments
        </button>

        <button disabled={isLoading}
           onClick={() => handleBookmark(id)} className="inline-flex items-center cursor-pointer gap-1.5 p-2.5 text-gray-500 rounded-full"
        >
          {isLoadingBookmark ?  <FaSpinner className="w-5 5" /> : bookmarkIcon }
          
          {exists ? 'Un Bookmark':'Bookmark'}
        </button>

        <button className="inline-flex items-center gap-1.5 cursor-pointer" onClick={onOpenOne}>
          <FaShare className="w-3.5 h-3.5" />{sharesCount} shares
        </button>
        
        <ShareFormModal isOpen={isOpenOne} onOpenChange={onOpenChangeOne} callBack={fetchAllPosts} id={id}/>
      </div>
      <div className="flex items-center gap-2">
        <input
          onChange={(e) => setCommentBody(e.target.value)}
          type="text" value={commentBody}
          placeholder="Write a comment..."
          className="flex-1 rounded-full border border-gray-200 bg-white px-4 py-2.5 text-[15px]"
        />
        <button
          disabled={!commentBody}
          onClick={() => handleAddComment(id)}
          className="p-2.5 text-blue-400  hover:text-blue-600 rounded-full hover:bg-blue-200 disabled:cursor-not-allowed"
          aria-label="Attach Photo"
        >
          {isLoadingComment ? (
            <FaHourglassEnd className="w-5 h-5" />
          ) : (
            <IoMdSend className="w-5 h-5" />
          )}
        </button>


          


        <button
          className="p-2.5 text-gray-400  hover:text-gray-600 rounded-full hover:bg-gray-200"
          aria-label="Attach Photo"
        >
          <FaCamera className="w-5 h-5" />
        </button>

        <button
          className="p-2.5 text-gray-400  hover:text-gray-600 rounded-full hover:bg-gray-200"
          aria-label="Attach Photo"
        >
          <FaSmile className="w-5 h-5" />
        </button>
      </div>
    </>
  );
}
