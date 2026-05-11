import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { getBookmarks, getPostById } from '../../services/postServices';
import PostHeader from '../../components/PostCard/PostHeader';
import PostBody from '../../components/PostCard/PostBody';
import PostFooter from '../../components/PostCard/PostFooter';
import PostSkeleton from '../../components/skeletons/PostSkeleton';

export default function PostDetails() {
  const[bookmarks,setBookmarks] = useState([]);
  const[posts,setPosts] = useState([]);
  const[post,setPost] = useState("");
  const [comments, setComments] = useState([]);
   function handlePostWithoutImage(image, post) {
    if (!image) {
      return (
        <>
          <div className="w-full h-50 bg-blue-400 text-white flex items-center justify-center">
            <p className="text-3xl capitalize">{post}</p>
          </div>
        </>
      );
    }
  }

  const {id} = useParams(); 

  async function fetchBookmarks() {
            try {
             const response = await getBookmarks();
              setBookmarks(response.data.data.bookmarks);
              } catch (error) {
            }
           }

      async function fetchPostDetails(postId){
     const response = await getPostById(postId);
     setPost(response.data.data.post);
    }

    async function fetchAllPosts(){
         const response = await getAllPosts();
         setPosts(response.data.data.posts);
      }

  useEffect(()=>{
    fetchPostDetails(id);
    fetchBookmarks();
  },[id]);

  

  return (
    <>
    {post ? <><div className=" bg-gray-200 w-full p-5"><article className="mx-auto bg-white rounded-lg shadow border  w-full md:w-1/2 border-gray-200 overflow-hidden">
          <PostHeader
            photo={post.user?.photo}
            name={post.user?.name}
            createdAt={post.createdAt}
            image={post.image}
            body={post.body}
            id={post.id}
          />
          <PostBody
            image={post.image}
            body={post.body}
            id={post.id}
            handlePostWithoutImage={handlePostWithoutImage}
            setComments={setComments}
            bookmarks={bookmarks}
            fetchBookmarks={fetchBookmarks}
            postLikes={post.likes}
            isShare={post.isShare}
            sharesCount={post.sharesCount}
            fetchAllPosts={fetchAllPosts}
          />
          <PostFooter topComment={post.topComment} comments={comments} setComments={setComments} id={post.id}/>
        </article></div></>:<PostSkeleton/>}
     
    </>
  )
}
