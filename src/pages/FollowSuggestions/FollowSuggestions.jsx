import React, { useEffect, useState } from 'react'
import { followUser, getFollowSuggestions } from '../../services/UserServices';
import { toast } from 'react-toastify';
import { FaSpinner } from "react-icons/fa6";

export default function FollowSuggestions() {
const[followSuggestions,setFollowSuggestions] = useState([]);
const [isLoading, setIsLoading] = useState(false);
const [followUserId, setFollowUserId] = useState("");
  async function fetchFollowSuggestions(){
       const response = await getFollowSuggestions();
       setFollowSuggestions(response.data.data.suggestions);
    }
     useEffect(()=>{
      fetchFollowSuggestions();
     },[]);

     async function handleFollowUser(userId){
         try {
          setIsLoading(true);
          setFollowUserId(userId);
         const response = await followUser(userId);
         toast.success(response.data.message);
         fetchFollowSuggestions();
         } catch (error) {
          console.log(error);
           toast.error("Failed to follow user");
         }finally{
            setIsLoading(false);
            setFollowUserId("");
         }
       }

  return (
   <div className="bg-gray-200 pt-5 pb-5 mb-10">
<div className="container max-w-5xl p-4 border border-gray-200 rounded-lg mt-14 bg-white">
  
  <div className="flex items-center justify-between mb-4">
    <h2 className="text-lg font-semibold text-gray-800">
      Follow Suggestions
    </h2>

    <button className="text-sm text-blue-500 hover:text-blue-600">
      See all
    </button>
  </div>

  <div className="space-y-4">

    {followSuggestions.map((item, index) => (
      <div
        key={item}
        className= {`flex items-center justify-between mb-3 ${
  index < followSuggestions.length - 1 ? "border-b" : ""
}`}
      >

        <div className="flex items-center gap-3">

          <img
            src={item.photo}
            alt=""
            className="w-12 h-12 rounded-full object-cover"
          />

          <div>
            <h3 className="font-medium text-gray-800">
              {item.name}
            </h3>

            <p className="text-sm text-gray-500">
                {item.mutualFollowersCount} mutual followers
            </p>

            <p className="text-sm text-gray-500">
                {item.followersCount}  followers
            </p>

          </div>

        </div>
{isLoading && followUserId === item._id ? <FaSpinner/> :<button onClick={()=>{handleFollowUser(item._id)}}
          className="
            px-4 py-1.5
            bg-blue-500
            hover:bg-blue-600
            text-white
            text-sm
            rounded-full
            transition
            cursor-pointer
          "
        >
          Follow
        </button> }
      </div>
    ))}

  </div>
</div>
</div>
  )
}
