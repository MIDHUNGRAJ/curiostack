'use client'

import { useState, useEffect } from 'react'
import { BlogPost } from '@/lib/types'
import Navbar from '@/components/Navbar'
// Ads removed
import { LogOut, Plus, Search, Edit, Trash2, Eye, BarChart3, Settings, Users, FileText, DollarSign, Target, Layers } from 'lucide-react'

export default function AdminPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null)
  const [adsEnabled, setAdsEnabled] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [authLoading, setAuthLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('posts')
  const [stats, setStats] = useState({
    totalPosts: 0,
    featuredPosts: 0,
    categories: 0,
    recentPosts: 0
  })
  const [newPost, setNewPost] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: 'Technology',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop',
    date: '',
    readTime: '5 min read',
    author: 'Tech Team',
    tags: ['Technology'],
    featured: false,
    source: 'CurioStack',
    aiVersion: '2.0'
  })

  useEffect(() => {
    // Check authentication on component mount
    const checkAuth = async () => {
      try {
        console.log('Checking authentication...')
        const response = await fetch('/api/admin/test-auth?_t=' + Date.now(), { credentials: 'include' })
        console.log('Auth response status:', response.status)
        
        if (response.ok) {
          const authData = await response.json()
          console.log('Auth successful:', authData)
          setIsAuthenticated(true)
          console.log('Fetching posts and stats...')
          fetchPosts()
          fetchStats()
          // Ads removed: fetchAdSettings()
        } else {
          console.log('Auth failed, status:', response.status)
          setIsAuthenticated(false)
          window.location.href = '/admin/login'
        }
      } catch (error) {
        console.error('Auth check error:', error)
        setIsAuthenticated(false)
        window.location.href = '/admin/login'
      } finally {
        console.log('Setting authLoading to false')
        setAuthLoading(false)
      }
    }
    
    checkAuth()
  }, [])

  const handleLogout = async () => {
    try {
      console.log('Logging out...')
      await fetch('/api/admin/login', { method: 'DELETE' })
      console.log('Logout successful, redirecting...')
      window.location.href = '/admin/login'
    } catch (error) {
      console.error('Logout error:', error)
      // Force redirect even if logout fails
      window.location.href = '/admin/login'
    }
  }

  const fetchStats = async () => {
    try {
      console.log('Fetching stats...')
      // Add cache-busting parameter to ensure fresh data
      const response = await fetch(`/api/admin/stats?_t=${Date.now()}`)
      console.log('Stats response status:', response.status)
      if (response.ok) {
        const data = await response.json()
        console.log('Stats data:', data)
        setStats(data)
      }
    } catch (error) {
      console.error('Error fetching stats:', error)
    }
  }

  // Ads removed

  const fetchPosts = async () => {
    try {
      console.log('Fetching posts...')
      // Add cache-busting parameter to force fresh request
      const response = await fetch('/api/admin/posts?_t=' + Date.now())
      console.log('Posts response status:', response.status)
      
      if (response.ok) {
        const data = await response.json()
        console.log('Posts data:', data)
        setPosts(data.posts || [])
        setFilteredPosts(data.posts || [])
      } else {
        const errorData = await response.json()
        console.error('Failed to fetch posts:', response.status, errorData)
        setPosts([])
        setFilteredPosts([])
      }
    } catch (error) {
      console.error('Error fetching posts:', error)
      setPosts([])
      setFilteredPosts([])
    } finally {
      console.log('Setting loading to false')
      setLoading(false)
    }
  }

  // Search functionality
  useEffect(() => {
    if (!posts) return
    const filtered = posts.filter(post =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilteredPosts(filtered)
  }, [searchTerm, posts])

  const handleEdit = (post: BlogPost) => {
    setEditingPost(post)
  }

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingPost) return

    try {
      const response = await fetch(`/api/admin/posts/${editingPost.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editingPost),
      })
      
      if (response.ok) {
        alert('Post updated successfully!')
        setEditingPost(null)
        fetchPosts()
        fetchStats() // Refresh stats after updating post
      } else {
        const error = await response.json()
        alert(`Error: ${error.error}`)
      }
    } catch (error) {
      console.error('Error updating post:', error)
      alert('Error updating post')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/admin/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPost),
      })
      
      if (response.ok) {
        alert('Post created successfully!')
        setNewPost({
          title: '',
          excerpt: '',
          content: '',
          category: 'Technology',
          image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop',
          date: '',
          readTime: '5 min read',
          author: 'Tech Team',
          tags: ['Technology'],
          featured: false,
          source: 'CurioStack',
          aiVersion: '2.0'
        })
        fetchPosts()
        fetchStats() // Refresh stats after creating post
      } else {
        const error = await response.json()
        alert(`Error: ${error.error}`)
      }
    } catch (error) {
      console.error('Error creating post:', error)
      alert('Error creating post')
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this post?')) return

    try {
      const response = await fetch(`/api/admin/posts/${id}`, {
        method: 'DELETE',
      })
      
      if (response.ok) {
        alert('Post deleted successfully!')
        fetchPosts()
        fetchStats() // Refresh stats after deleting post
      } else {
        const error = await response.json()
        alert(`Error: ${error.error}`)
      }
    } catch (error) {
      console.error('Error deleting post:', error)
      alert('Error deleting post')
    }
  }

  const getAuthorByCategory = (category: string): string => {
    switch (category) {
      case 'Technology':
        return 'Tech Team'
      case 'Cybersecurity':
        return 'Security Team'
      case 'Business':
        return 'Business Team'
      case 'AI':
        return 'AI Team'
      case 'Startups':
        return 'Startup Team'
      default:
        return 'Tech Team'
    }
  }

  // Ads removed

  if (authLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!isAuthenticated) {
    console.log('Not authenticated, redirecting to login...')
    // Force redirect to login
    if (typeof window !== 'undefined') {
      window.location.href = '/admin/login'
    }
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Admin Access Required</h1>
          <p className="text-muted-foreground mb-6">Redirecting to login...</p>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Admin Header */}
      <div className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Admin Dashboard</h1>
              <p className="text-sm text-muted-foreground">Manage your content and settings</p>
            </div>
            <div className="flex items-center gap-4">
              {/* Ads removed */}

              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-muted text-muted-foreground hover:bg-muted/80 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
          
          {/* Navigation Tabs */}
          <div className="mt-6 border-b border-border">
            <nav className="flex space-x-8">
              <button
                onClick={() => setActiveTab('posts')}
                className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'posts'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground'
                }`}
              >
                <FileText className="w-4 h-4 inline mr-2" />
                Posts
              </button>
              {/* Ads removed: Advertisers tab */}
              {/* Ads removed: Campaigns tab */}
              {/* Ads removed: Advanced Ads tab */}
              <button
                onClick={() => setActiveTab('analytics')}
                className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'analytics'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground'
                }`}
              >
                <BarChart3 className="w-4 h-4 inline mr-2" />
                Analytics
              </button>
            </nav>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Dashboard - Only show on posts tab */}
        {activeTab === 'posts' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-card rounded-xl p-6 border border-border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Posts</p>
                  <p className="text-2xl font-bold text-foreground">{stats.totalPosts}</p>
                </div>
                <FileText className="w-8 h-8 text-primary" />
              </div>
            </div>
            
            <div className="bg-card rounded-xl p-6 border border-border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Featured Posts</p>
                  <p className="text-2xl font-bold text-foreground">{stats.featuredPosts}</p>
                </div>
                <BarChart3 className="w-8 h-8 text-green-500" />
              </div>
            </div>
            
            <div className="bg-card rounded-xl p-6 border border-border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Categories</p>
                  <p className="text-2xl font-bold text-foreground">{stats.categories}</p>
                </div>
                <Settings className="w-8 h-8 text-blue-500" />
              </div>
            </div>
            
            <div className="bg-card rounded-xl p-6 border border-border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Recent Posts</p>
                  <p className="text-2xl font-bold text-foreground">{stats.recentPosts}</p>
                </div>
                <Users className="w-8 h-8 text-purple-500" />
              </div>
            </div>
          </div>
        )}
          
        {/* Posts Tab Content */}
        {activeTab === 'posts' && (
          <>
            {/* Create New Post Form */}
            <div className="bg-card rounded-xl shadow-sm border border-border p-6 mb-8">
              <div className="flex items-center gap-2 mb-6">
                <Plus className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-semibold text-foreground">Create New Post</h2>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-foreground">Title</label>
                <input
                  type="text"
                  value={newPost.title}
                  onChange={(e) => setNewPost({...newPost, title: e.target.value})}
                  className="w-full p-2 border border-input rounded bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-foreground">Category</label>
                <select
                  value={newPost.category}
                  onChange={(e) => {
                    const category = e.target.value
                    setNewPost({
                      ...newPost, 
                      category: category,
                      author: getAuthorByCategory(category)
                    })
                  }}
                  className="w-full p-2 border border-input rounded bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="Technology">Technology</option>
                  <option value="Business">Business</option>
                  <option value="AI">AI</option>
                  <option value="Startups">Startups</option>
                  <option value="Cybersecurity">Cybersecurity</option>
                </select>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1 text-foreground">Excerpt</label>
              <textarea
                value={newPost.excerpt}
                onChange={(e) => setNewPost({...newPost, excerpt: e.target.value})}
                className="w-full p-2 border border-input rounded bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                rows={3}
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1 text-foreground">Content (Markdown)</label>
              <textarea
                value={newPost.content}
                onChange={(e) => setNewPost({...newPost, content: e.target.value})}
                className="w-full p-2 border border-input rounded bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                rows={10}
                required
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-foreground">Image URL</label>
                <input
                  type="url"
                  value={newPost.image}
                  onChange={(e) => setNewPost({...newPost, image: e.target.value})}
                  className="w-full p-2 border border-input rounded bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-foreground">Date</label>
                <input
                  type="date"
                  value={newPost.date}
                  onChange={(e) => setNewPost({...newPost, date: e.target.value})}
                  className="w-full p-2 border border-input rounded bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="Select publication date"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-foreground">Read Time</label>
                <input
                  type="text"
                  value={newPost.readTime}
                  onChange={(e) => setNewPost({...newPost, readTime: e.target.value})}
                  className="w-full p-2 border border-input rounded bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  required
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-foreground">Author</label>
                <input
                  type="text"
                  value={newPost.author}
                  onChange={(e) => setNewPost({...newPost, author: e.target.value})}
                  className="w-full p-2 border border-input rounded bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-foreground">Tags (comma-separated)</label>
                <input
                  type="text"
                  value={newPost.tags.join(', ')}
                  onChange={(e) => setNewPost({...newPost, tags: e.target.value.split(',').map(t => t.trim())})}
                  className="w-full p-2 border border-input rounded bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  required
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <label className="flex items-center text-foreground">
                <input
                  type="checkbox"
                  checked={newPost.featured}
                  onChange={(e) => setNewPost({...newPost, featured: e.target.checked})}
                  className="mr-2"
                />
                Featured Post
              </label>
            </div>
            
                <button
                  type="submit"
                  className="bg-primary text-primary-foreground px-6 py-2 rounded hover:bg-primary/90 transition-colors"
                >
                  Create Post
                </button>
              </form>
            </div>
        
        {/* Posts List */}
        <div className="bg-card rounded-xl shadow-sm border border-border">
          <div className="p-6 border-b border-border">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-semibold text-foreground">Existing Posts</h2>
              </div>
              <span className="text-sm text-muted-foreground">
                {filteredPosts?.length || 0} of {posts?.length || 0} posts
              </span>
            </div>
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search posts by title, category, or excerpt..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
                />
              </div>
            </div>
          </div>
          <div className="overflow-x-auto">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            ) : (
              <table className="w-full">
                <thead className="bg-muted">
                  <tr>
                    <th className="p-4 text-left text-foreground">Title</th>
                    <th className="p-4 text-left text-foreground">Category</th>
                    <th className="p-4 text-left text-foreground">Date</th>
                    <th className="p-4 text-left text-foreground">Featured</th>
                    <th className="p-4 text-left text-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPosts?.map((post) => (
                    <tr key={post.id} className="border-b border-border">
                      <td className="p-4">
                        <div className="font-medium text-foreground">{post.title}</div>
                        <div className="text-sm text-muted-foreground">{post.excerpt.substring(0, 50)}...</div>
                      </td>
                      <td className="p-4 text-foreground">{post.category}</td>
                      <td className="p-4 text-foreground">{new Date(post.date).toLocaleDateString()}</td>
                      <td className="p-4">
                        {post.featured ? (
                          <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm dark:bg-green-900 dark:text-green-200">Featured</span>
                        ) : (
                          <span className="bg-muted text-muted-foreground px-2 py-1 rounded text-sm">Regular</span>
                        )}
                      </td>
                      <td className="p-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => window.open(`/blog/${post.id}`, '_blank')}
                            className="flex items-center gap-1 bg-blue-600 text-white px-3 py-1 rounded-lg text-sm hover:bg-blue-700 transition-colors"
                            title="View post"
                          >
                            <Eye className="w-3 h-3" />
                            View
                          </button>
                          <button
                            onClick={() => handleEdit(post)}
                            className="flex items-center gap-1 bg-primary text-primary-foreground px-3 py-1 rounded-lg text-sm hover:bg-primary/90 transition-colors"
                            title="Edit post"
                          >
                            <Edit className="w-3 h-3" />
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(post.id)}
                            className="flex items-center gap-1 bg-destructive text-destructive-foreground px-3 py-1 rounded-lg text-sm hover:bg-destructive/90 transition-colors"
                            title="Delete post"
                          >
                            <Trash2 className="w-3 h-3" />
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
          </>
        )}

        {/* Ads removed */}

        {/* Ads removed */}

        {/* Ads removed */}

        {/* Analytics Tab Content */}
        {activeTab === 'analytics' && (
          <div className="bg-card rounded-xl p-6 border border-border">
            <h2 className="text-xl font-semibold text-foreground mb-4">Analytics Dashboard</h2>
            <p className="text-muted-foreground">Coming soon...</p>
          </div>
        )}

        {/* Edit Post Modal */}
        {editingPost && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-card rounded-lg shadow-lg p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto border border-border">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-foreground">Edit Post</h2>
                <button
                  onClick={() => setEditingPost(null)}
                  className="text-muted-foreground hover:text-foreground text-2xl transition-colors"
                >
                  ×
                </button>
              </div>
              
              <form onSubmit={handleUpdate} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1 text-foreground">Title</label>
                    <input
                      type="text"
                      value={editingPost.title}
                      onChange={(e) => setEditingPost({...editingPost, title: e.target.value})}
                      className="w-full p-2 border border-input rounded bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1 text-foreground">Category</label>
                    <select
                      value={editingPost.category}
                      onChange={(e) => {
                        const category = e.target.value
                        setEditingPost({
                          ...editingPost, 
                          category: category,
                          author: getAuthorByCategory(category)
                        })
                      }}
                      className="w-full p-2 border border-input rounded bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    >
                      <option value="Technology">Technology</option>
                      <option value="Business">Business</option>
                      <option value="AI">AI</option>
                      <option value="Startups">Startups</option>
                      <option value="Cybersecurity">Cybersecurity</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1 text-foreground">Excerpt</label>
                  <textarea
                    value={editingPost.excerpt}
                    onChange={(e) => setEditingPost({...editingPost, excerpt: e.target.value})}
                    className="w-full p-2 border border-input rounded bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    rows={3}
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1 text-foreground">Content (Markdown)</label>
                  <textarea
                    value={editingPost.content}
                    onChange={(e) => setEditingPost({...editingPost, content: e.target.value})}
                    className="w-full p-2 border border-input rounded bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    rows={10}
                    required
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1 text-foreground">Image URL</label>
                    <input
                      type="url"
                      value={editingPost.image}
                      onChange={(e) => setEditingPost({...editingPost, image: e.target.value})}
                      className="w-full p-2 border border-input rounded bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1 text-foreground">Date</label>
                    <input
                      type="date"
                      value={editingPost.date ? (editingPost.date.includes('T') ? editingPost.date.split('T')[0] : editingPost.date) : ''}
                      onChange={(e) => setEditingPost({...editingPost, date: e.target.value})}
                      className="w-full p-2 border border-input rounded bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1 text-foreground">Read Time</label>
                    <input
                      type="text"
                      value={editingPost.readTime}
                      onChange={(e) => setEditingPost({...editingPost, readTime: e.target.value})}
                      className="w-full p-2 border border-input rounded bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1 text-foreground">Author</label>
                    <input
                      type="text"
                      value={editingPost.author}
                      onChange={(e) => setEditingPost({...editingPost, author: e.target.value})}
                      className="w-full p-2 border border-input rounded bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1 text-foreground">Tags (comma-separated)</label>
                    <input
                      type="text"
                      value={Array.isArray(editingPost.tags) ? editingPost.tags.join(', ') : editingPost.tags}
                      onChange={(e) => setEditingPost({...editingPost, tags: e.target.value.split(',').map(t => t.trim())})}
                      className="w-full p-2 border border-input rounded bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                      required
                    />
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <label className="flex items-center text-foreground">
                    <input
                      type="checkbox"
                      checked={editingPost.featured}
                      onChange={(e) => setEditingPost({...editingPost, featured: e.target.checked})}
                      className="mr-2"
                    />
                    Featured Post
                  </label>
                </div>
                
                <div className="flex gap-4 pt-4">
                  <button
                    type="submit"
                    className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition-colors"
                  >
                    Update Post
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditingPost(null)}
                    className="bg-muted text-muted-foreground px-6 py-2 rounded hover:bg-muted/80 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 