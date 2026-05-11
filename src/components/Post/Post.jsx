import React, { useState } from "react";
import PostHeader from "../PostCard/PostHeader";
import PostBody from "../PostCard/PostBody";
import PostFooter from "../PostCard/PostFooter";
// const data = {
//   _id:'dummy-post',
//   body:'Just had an a mazing weekend at the lake! So grateful for good weather and great company.',
//   image:'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=80&h=80&fit=crop&crop=face',
//   user: {
//     _id:'dummy-user',
//     photo:'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face',
//   },
//   createdAt:new Date().toISOString(),
//   comments:[
//     {
//       _id:'dummy-comment',
//       content:'Looks like you had a great time!',
//       commentCreator:{
//         name:'John Doe',
//         photo:'',
//     },
//     createdAt:new Date().toISOString(),
// },
//    {
//       _id:'dummy-comment',
//       content:'Wish I was there!',
//       commentCreator:{
//         name:'Jane Smith',
//         photo:'',
//     },
//     createdAt:new Date().toISOString(),
// },
// ]
// }
export default function Post({post,bookmarks,fetchBookmarks,fetchAllPosts,fetchProfilePosts = () => {}}) {
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
  return (
    <article className="bg-white rounded-lg shadow border w-full border-gray-200 overflow-hidden">
      <PostHeader
        photo={post.user?.photo}
        name={post.user?.name}
        createdAt={post.createdAt}
        id={post.id}
        image={post?.image}
        body={post.body}
        fetchAllPosts={fetchAllPosts}
        fetchProfilePosts={fetchProfilePosts}
        userId={post.user._id}
      />
      <PostBody
        image={post.image}
        body={post.body}
        id={post.id}
        handlePostWithoutImage={handlePostWithoutImage}
        setComments={setComments}
        bookmarks ={bookmarks}
        fetchBookmarks ={fetchBookmarks}
        postLikes={post.likes}
        isShare={post.isShare}
        sharesCount={post.sharesCount}
        fetchAllPosts={fetchAllPosts}
      />
      <PostFooter topComment={post.topComment}  comments={comments} setComments={setComments} id={post.id}/>
    </article>
  );
}
