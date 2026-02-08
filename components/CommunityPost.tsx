import React, { useState } from 'react';
import { Heart, MessageSquare, Share2 } from 'lucide-react';
import { Post } from '../types';

interface CommunityPostProps {
  post: Post;
}

const CommunityPost: React.FC<CommunityPostProps> = ({ post }) => {
  const [liked, setLiked] = useState(false);
  
  const categoryColors = {
    'Tips': 'bg-blue-100 text-blue-700',
    'Pengalaman': 'bg-emerald-100 text-emerald-700',
    'Doa': 'bg-purple-100 text-purple-700',
    'Tanya': 'bg-amber-100 text-amber-700'
  };

  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <img src={post.avatar} alt={post.author} className="w-10 h-10 rounded-full border-2 border-emerald-100" />
          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-bold text-gray-900 text-sm">{post.author}</h4>
              <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${categoryColors[post.category]}`}>
                {post.category}
              </span>
            </div>
            <p className="text-[10px] text-gray-500">{post.time}</p>
          </div>
        </div>
        <button className="text-gray-400 hover:text-emerald-600 transition-colors"><Share2 className="w-4 h-4" /></button>
      </div>
      <p className="text-gray-700 text-sm leading-relaxed mb-4 whitespace-pre-line">{post.content}</p>
      {post.image && (
        <div className="rounded-2xl overflow-hidden mb-4 h-56 border border-gray-50">
          <img src={post.image} alt="post content" className="w-full h-full object-cover" />
        </div>
      )}
      <div className="flex items-center gap-6 pt-4 border-t border-gray-50">
        <button onClick={() => setLiked(!liked)} className={`flex items-center gap-2 text-sm transition-all active:scale-95 ${liked ? 'text-red-500' : 'text-gray-500'}`}>
          <Heart className={`w-4 h-4 ${liked ? 'fill-red-500' : ''}`} /> {post.likes + (liked ? 1 : 0)}
        </button>
        <button className="flex items-center gap-2 text-sm text-gray-500 hover:text-emerald-600 transition-colors">
          <MessageSquare className="w-4 h-4" /> {post.comments}
        </button>
      </div>
    </div>
  );
};

export default CommunityPost;
