import React, { useEffect, useState } from 'react'
import { getNotifications, markAllAsRead, markNotificationAsRead } from '../../services/NotificationsServices'
import { commentTime } from '../../lib/HelperFunctions/fn'
import { GoDotFill } from "react-icons/go";
import { IoNotifications , IoCheckmarkDone } from "react-icons/io5";
import { toast } from 'react-toastify';
import { FaSpinner } from "react-icons/fa6";

export default function Notifications() {
    const[notifications,setNotifications] =useState([]);
    const[isLoading,setIsLoading] = useState(false);
    const[isLoadingAll,setIsLoadingAll] = useState(false); 
    const[makNotificationId,setMakNotificationId] = useState("");
    async function fetchAllNotifications(){
         const response = await getNotifications();
         setNotifications(response.data.data.notifications);
      }
       useEffect(()=>{
        fetchAllNotifications();
       },[]);

       async function setNotificationAsRead(notificationId){
         try {
          setIsLoading(true);
          setMakNotificationId(notificationId);
          const response = await markNotificationAsRead(notificationId);
         toast.success(response.data.message);
         fetchAllNotifications();
         }catch (error) {
          toast.error("Action failed");
         }finally{
            setIsLoading(false);
            setMakNotificationId("");
       }
      }
   
      async function setAllAsRead(){
         try {
          setIsLoadingAll(true);
          const response = await markAllAsRead(notificationId);
         toast.success(response.data.message);
         fetchAllNotifications();
         }catch (error) {
          toast.error("Action failed");
         }finally{
           setIsLoadingAll(false);
       }
      }

  return (   
<div className="bg-gray-200 pt-5 pb-5 mb-10">
<div className="container max-w-5xl p-4 border border-gray-200 rounded-lg mt-14 bg-white">
   <div className="flex items-center justify-between">
     <h1 className="text-2xl font-bold mb-6">Notifications</h1>
     {isLoadingAll ? <FaSpinner  className="w-5 h-5"/> : <button className="bg-blue-500 text-white p-1  rounded-lg cursor-pointer flex items-center gap-3" onClick={()=>{setAllAsRead()}}>
      All <IoCheckmarkDone className="w-5 h-5"/> 
    </button>}
   </div>

{notifications.length > 0 && 
notifications.map((notification)=>(
<div className="space-y-4">
    <div className="flex items-start gap-3 p-3 mb-3  rounded-xl border border-gray-200 hover:bg-gray-50 transition">
      <img key={notification._id}
        src={notification?.actor?.photo}
        alt=""
        className="w-12 h-12 rounded-full object-cover"
      />
      <div className="flex-1">
        <p className="text-sm">
          <span className="font-semibold">
           {notification?.actor?.name}
          </span>{" "}
          {notification.type}
        </p>
        <span className="text-xs text-gray-500">
          {commentTime(notification.createdAt)}
        </span>
      </div>
      <div className="flex item-center gap-3">
       
        {!notification.isRead && <><GoDotFill  className="w-5 h-5 mt-2 text-blue-500"/>
        {(makNotificationId === notification._id && isLoading) ? <FaSpinner  className="w-4 h-4"/> :<button className="bg-blue-500 text-white p-1  rounded-lg cursor-pointer" onClick={()=>{setNotificationAsRead(notification._id)}}>
          <IoCheckmarkDone className="w-4 h-4"/>
           </button>}
         
           </>  }
      </div>
    </div>
  </div>
))}
</div>
</div>
  )
}
