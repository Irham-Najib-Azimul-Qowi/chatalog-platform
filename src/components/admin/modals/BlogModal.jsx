import React, { useState, useEffect } from 'react';
import { useToko } from '../../../hooks/useToko';
import { saveBlogPost, deleteBlogPost } from '../../../services/firebaseFunctions';
import { collection, query, onSnapshot } from 'firebase/firestore';
// eslint-disable-next-line import/no-unresolved
import { db } from '../../../services/firebase'; 

const defaultNewPost = { 
    title: '', 
    content: '', 
    slug: '',
    isPublished: true, 
};

const BlogModal = () => {
    // Kita perlu state lokal untuk posts karena posts tidak ada di TokoContext secara default
    const { info, closeAdminModal, settings } = useToko();
    const [posts, setPosts] = useState([]);
    
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [currentPost, setCurrentPost] = useState(null); 
    const [isFormOpen, setIsFormOpen] = useState(false); 

    const tokoId = info?.tokoId; 
    const primaryColor = settings?.colors?.primary;

    // Ambil data Blog Posts secara real-time (Mirip dengan logic TokoContext, tetapi untuk posts)
    useEffect(() => {
        if (!tokoId) return;

        // Path: tokos/{tokoId}/blog_posts
        const postsCollectionRef = collection(db, 'tokos', tokoId, 'blog_posts');
        const q = query(postsCollectionRef); 

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const postsList = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setPosts(postsList);
        }, (error) => {
            console.error("Error fetching blog posts:", error);
            setMessage("Gagal memuat postingan blog.");
        });

        return () => unsubscribe();
    }, [tokoId]);

    // --- LOGIKA FORM ---
    const handleSelectPost = (post) => {
        setCurrentPost(post);
        setIsFormOpen(true);
        setMessage('');
    };

    const handleNewPost = () => {
        setCurrentPost(defaultNewPost);
        setIsFormOpen(true);
        setMessage('');
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setCurrentPost(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
            // Otomatisasi slug
            slug: name === 'title' ? value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-*|-*$/g, '') : prev.slug
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (loading || !tokoId || !currentPost?.title) return;

        setLoading(true);
        setMessage('');

        try {
            const result = await saveBlogPost(tokoId, currentPost); 
            setMessage(result.message);
        } catch (error) {
            setMessage(`Gagal menyimpan post: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };
    
    const handleDelete = async () => {
        if (!currentPost?.id || !window.confirm(`Yakin ingin menghapus post "${currentPost.title}"?`)) return;

        setLoading(true);
        setMessage('Menghapus post...');
        try {
            await deleteBlogPost(tokoId, currentPost.id); 
            setMessage('Postingan berhasil dihapus.');
            setIsFormOpen(false);
            setCurrentPost(null);
        } catch (error) {
            setMessage(`Gagal menghapus: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
            <div className="bg-white rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto flex">
                
                {/* 1. Panel Daftar Post (Kiri) */}
                <div className="w-full md:w-1/3 border-r p-4 flex flex-col">
                    <h2 className="text-xl font-bold mb-4" style={{ color: primaryColor }}>Daftar Post Blog ({posts.length})</h2>
                    <button 
                        onClick={handleNewPost} 
                        className="w-full py-2 mb-4 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition"
                    >
                        + Tulis Post Baru
                    </button>
                    
                    <ul className="space-y-2 flex-grow overflow-y-auto pr-2">
                        {posts.map((p) => (
                            <li 
                                key={p.id} 
                                onClick={() => handleSelectPost(p)}
                                className={`p-3 text-sm rounded-lg cursor-pointer transition 
                                            ${currentPost?.id === p.id ? 'bg-gray-200 font-semibold' : 'hover:bg-gray-100'}`}
                            >
                                {p.title} 
                            </li>
                        ))}
                    </ul>

                    <div className="mt-4 pt-2 border-t">
                        <button onClick={closeAdminModal} className="w-full py-2 text-gray-600 hover:text-gray-800 rounded-lg">
                            Tutup Modal
                        </button>
                    </div>
                </div>

                {/* 2. Panel Form CRUD (Kanan) */}
                <div className="w-full md:w-2/3 p-6">
                    {message && (
                        <div className={`p-3 rounded-lg mb-4 text-sm ${message.startsWith('Gagal') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                            {message}
                        </div>
                    )}

                    {currentPost && isFormOpen && (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <h3 className="text-2xl font-bold mb-4">
                                {currentPost.id ? 'Edit Post' : 'Postingan Baru'}
                            </h3>

                            {/* Judul */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Judul Post</label>
                                <input type="text" name="title" value={currentPost.title} onChange={handleInputChange} 
                                    className="mt-1 block w-full border border-gray-300 rounded-md p-2" required />
                            </div>

                            {/* Slug (ReadOnly) */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Slug URL (Otomatis)</label>
                                <input type="text" name="slug" value={currentPost.slug} readOnly
                                    className="mt-1 block w-full border border-gray-300 bg-gray-50 rounded-md p-2 text-sm" />
                            </div>

                            {/* Konten */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Konten Blog</label>
                                <textarea name="content" value={currentPost.content} onChange={handleInputChange} rows="8"
                                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"></textarea>
                            </div>

                            {/* Published Checkbox */}
                            <div className="flex items-center pt-2">
                                <input id="isPublished" type="checkbox" name="isPublished" checked={currentPost.isPublished} onChange={handleInputChange} 
                                    className="h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                                <label htmlFor="isPublished" className="ml-2 block text-sm font-medium text-gray-700">
                                    Publikasikan
                                </label>
                            </div>

                            {/* Tombol Aksi */}
                            <div className="flex justify-between pt-4">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="py-2 px-6 font-bold text-white rounded-lg transition-colors hover:opacity-90 disabled:opacity-50"
                                    style={{ backgroundColor: currentPost.id ? primaryColor : '#10b981' }} 
                                >
                                    {loading ? 'Memproses...' : (currentPost.id ? 'Simpan Perubahan' : 'Terbitkan Post')}
                                </button>
                                
                                {currentPost.id && (
                                    <button
                                        type="button"
                                        onClick={handleDelete}
                                        disabled={loading}
                                        className="py-2 px-6 font-bold text-white rounded-lg transition-colors bg-red-600 hover:bg-red-700 disabled:opacity-50"
                                    >
                                        Hapus
                                    </button>
                                )}
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BlogModal;
