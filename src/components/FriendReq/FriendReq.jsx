import React from 'react';
import { FaSearch ,FaEllipsisV } from "react-icons/fa";

const friendRequests = [
  {
    id: 1,
    name: "Sarah Johnson",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face",
    time: "6d"
  }
];
const contacts =[
  {
  id:1,
  name: "Michael Smith",
  avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face",
  online: true
  },

  {
  id:2,
  name: "Emily Davis",
  avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face",
  online: false
  },
  {
  id:3,
  name: "Michael Smith",
  avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face",
  online: true
  },
  {
  id:4,
  name: "kate williams",
  avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&h=80&fit=crop&crop=face",
  online: true
  },
  {
  id:5,
  name: "alex johnson",
  avatar: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=80&h=80&fit=crop&crop=face",
  online: false
  },
  {
  id:6,
  name: "david lee",
  avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&h=80&fit=crop&crop=face",
  online: true
  },

]

export default function FriendReq() {
  return (
  <aside className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden min-h-[calc(100vh-6rem)] w-80 mx-auto flex flex-col max-h-[calc(100vh-6rem)] ">
 <section className="p-4 border-b border-gray-100">
  <div className='flex items-center justify-between mb-3'>
 <h2 className="font-semibold text-gray-800 text-[15px]">Friend Requests</h2>
    <a href="#" className=" text-[13px] text-blue-600 font-medium hover:underline">See All</a>
  </div>
  <ul className='space-y-3'>
    {friendRequests.map((req) => (
      <li key={req.id} className='flex gap-3'>
        <img src={req.avatar} alt={req.name} className='w-12 h-12 rounded-full object-cover shrink-0'/>
        <div className='flex-1 min-w-0'>
          <div className="flex items-start justify-between gap-2">
              <span className='font-medium text-gray-900 text-[14px]'>
              {req.name}
              </span>

               <span className='text-gray-400 text-[12px] shrink-0'>
              {req.time}
              </span>

          </div>

<div className="flex gap-2 mt-2">
<button type='button' className='px-3 py-1.5 bg-blue-600 text-white text-[13px] font-medium rounded-md hover:bg-blue-700 transition-colors'>
confirm
</button>

<button type='button' className='px-3 py-1.5 bg-gray-200 text-gray-700 text-[13px] font-medium rounded-md hover:bg-gray-300 transition-colors'>
Delete
</button>

</div>
        </div>
      </li>
    ))}

  </ul>
 </section>
 
 <section className='flex-1 flex flex-col min-h-0'>
  <div className='p-4 pb-2 flex items-center justify-between'>
    <h2 className='font-semibold text-gray-800 text-[15px]'>Contacts</h2>
<div className="flex items-center gap-2">
<button type='button' className='p-1.5 text-gray-500 hover:bg-gray-100 rounded-full transition-colors' aria-label='Search contacts'>
  <FaSearch  className="w-4 h-4"/>
</button>

<button type='button' className='p-1.5 text-gray-500 hover:bg-gray-100 rounded-full transition-colors' aria-label='More options'>
  <FaEllipsisV   className="w-4 h-4"/>
</button>

</div>
  </div>
<ul className='over-flow-y-auto flex-1 px-4 pb-4 space-y-1'>
{contacts.map((contact) => (
  <li key={contact.id}>
  <button type='button' className='w-full flex items-cener gap-3 py-2 px-2 rounded-lg hover:bg-gray-50 transition-colors text-left'>
<span className='relative shrink-0'>
<img src={contact.avatar} alt={contact.name} className='w-10 h-10 rounded-full object-cover'/>
 {contact.online && (
    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
  )}
</span>
 <span className='font-medium text-gray-900 text-[14px]'>
              {contact.name}
              </span>
  </button>
  </li>
))}
</ul>
 </section>
  </aside>

   
  )
}
