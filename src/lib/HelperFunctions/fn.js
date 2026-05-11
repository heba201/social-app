export function commentTime(iso){
  if(!iso) return '';
  const d = new Date(iso);
  const mins = Math.floor((Date.now() - d)/60000);
  if(mins< 1) return 'Just now';
  if(mins<60) return `${mins}m`;
  if(mins<1440) return `${Math.floor(mins/60)}h`;
  return `${Math.floor(mins/1440)}d`;
}

export const DEFAULT_AVATAR = "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face";

export function getAvatar(photo){
return photo && !String(photo).includes('undefined') ? photo : DEFAULT_AVATAR;
}

