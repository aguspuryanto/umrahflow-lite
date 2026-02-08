import React, { useState } from 'react';
import { PlusCircle, MessageSquare } from 'lucide-react';
import { Post } from '../types';
import { databaseService } from '../services/database';
import CommunityPost from './CommunityPost';

interface CommunityViewProps {
  posts: Post[];
}

const CommunityView: React.FC<CommunityViewProps> = ({ posts }) => {
  const [localPosts, setLocalPosts] = useState<Post[]>(posts);
  const [newPost, setNewPost] = useState('');
  const [activeCategory, setActiveCategory] = useState<Post['category'] | 'Semua'>('Semua');

  const handleAddPost = async () => {
    if (!newPost.trim()) return;
    
    try {
      const postData = {
        nama_jamaah: 'Jamaah UmrahFlow',
        message: newPost,
        tipe_community: 'Pengalaman' as const,
        likes: 0,
        comments: 0
      };

      const newDbPost = await databaseService.insertKomunitas(postData);
      
      const formattedPost: Post = {
        id: newDbPost.commu_id,
        author: postData.nama_jamaah,
        avatar: 'https://i.pravatar.cc/150?u=current_user',
        content: postData.message,
        likes: postData.likes,
        comments: postData.comments,
        time: 'Baru saja',
        category: postData.tipe_community
      };

      setLocalPosts([formattedPost, ...localPosts]);
      setNewPost('');
    } catch (error) {
      console.error('Error adding post:', error);
      // Fallback to local state update
      const post: Post = {
        id: Date.now().toString(),
        author: 'Jamaah UmrahFlow',
        avatar: 'https://i.pravatar.cc/150?u=current_user',
        content: newPost,
        likes: 0,
        comments: 0,
        time: 'Baru saja',
        category: 'Pengalaman'
      };
      setLocalPosts([post, ...localPosts]);
      setNewPost('');
    }
  };

  const filteredPosts = activeCategory === 'Semua' ? localPosts : localPosts.filter(p => p.category === activeCategory);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Komunitas Jamaah</h1>
        <p className="text-gray-500">Berbagi pengalaman, tips perjalanan, dan inspirasi ibadah.</p>
      </div>

      <div className="flex gap-2 mb-8 overflow-x-auto pb-2 custom-scrollbar no-scrollbar">
        {['Semua', 'Tips', 'Pengalaman', 'Doa', 'Tanya'].map((cat) => (
          <button 
            key={cat}
            onClick={() => setActiveCategory(cat as any)}
            className={`px-6 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap ${activeCategory === cat ? 'bg-emerald-600 text-white shadow-lg' : 'bg-white text-gray-600 border border-gray-100 hover:border-emerald-200'}`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 mb-8">
        <div className="flex gap-4">
          <img src="https://i.pravatar.cc/150?u=current_user" className="w-12 h-12 rounded-full border-2 border-emerald-50" alt="avatar" />
          <div className="flex-1">
            <textarea 
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              placeholder="Bagikan tips atau cerita perjalanan Anda..."
              className="w-full bg-gray-50 border-none rounded-2xl p-4 text-sm focus:ring-2 focus:ring-emerald-500 outline-none resize-none h-24"
            />
            <div className="flex justify-between items-center mt-3">
              <div className="flex gap-2">
                <button className="p-2 text-gray-400 hover:bg-emerald-50 hover:text-emerald-600 rounded-xl transition-all"><PlusCircle className="w-5 h-5" /></button>
              </div>
              <button 
                onClick={handleAddPost}
                disabled={!newPost.trim()}
                className="px-6 py-2 bg-emerald-600 text-white rounded-xl font-bold text-sm shadow-md hover:bg-emerald-700 disabled:opacity-50 disabled:hover:bg-emerald-600 transition-all"
              >
                Posting
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6">
        {filteredPosts.map(post => <CommunityPost key={post.id} post={post} />)}
        {filteredPosts.length === 0 && (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
            <MessageSquare className="w-12 h-12 text-gray-200 mx-auto mb-4" />
            <p className="text-gray-400 font-medium">Belum ada postingan di kategori ini.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommunityView;
