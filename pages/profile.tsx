import React, { useState } from 'react';
import type { ReactElement } from 'react';
import type { NextPageWithLayout } from './_app';
import { Layout } from '../components/layout/Layout';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/Button';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

// === SOCIAL ICONS & USER PROFILE DATA (Same as Before) ===
const socialIcons: { [key: string]: React.ReactNode } = {
  Facebook: <FaFacebook className="w-5 h-5 text-blue-500" />,
  Twitter: <FaTwitter className="w-5 h-5 text-blue-400" />,
  Instagram: <FaInstagram className="w-5 h-5 text-pink-500" />,
};

const userProfile = {
  name: 'John Doe',
  email: 'john@example.com',
  type: 'Designer',
  socials: [
    { platform: 'Facebook', url: 'https://facebook.com/johndoe' },
    { platform: 'Twitter', url: 'https://twitter.com/johndoe' },
    { platform: 'Instagram', url: 'https://instagram.com/johndoe' },
  ],
  tags: [
    { name: 'Cotton', color: '#ff6b6b' },
    { name: 'Linen', color: '#1e90ff' },
    { name: 'Denim', color: '#4caf50' },
  ],
};

// === COMPONENTS: SocialMediaLinks, SpecializationTags (Same as Before) ===
const SocialMediaLinks = ({
  socials,
}: {
  socials: { platform: string; url: string }[];
}) => {
  return (
    <div className="flex gap-4 mt-4">
      {socials.map((social) => (
        <a
          key={social.platform}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-3 py-2 bg-white/10 rounded-lg border border-white/10 text-cosmic-100 hover:bg-white/20 transition-colors duration-200"
        >
          {socialIcons[social.platform] || <span>{social.platform}</span>}
          <span className="hidden sm:inline">{social.platform}</span>
        </a>
      ))}
    </div>
  );
};

const SpecializationTags = ({
  tags,
}: {
  tags: { name: string; color: string }[];
}) => {
  return (
    <div className="flex flex-wrap gap-2 mt-4">
      {tags.map((tag, index) => (
        <span
          key={index}
          style={{ backgroundColor: tag.color }}
          className="px-3 py-1 text-white rounded-full text-sm font-semibold"
        >
          {tag.name}
        </span>
      ))}
    </div>
  );
};

// Move the IPost interface and PostType type before the ProfilePage component
type PostType = 'Sketch' | 'Previous Creation' | 'Inspiration';

interface IPost {
  id: string;
  type: PostType;
  fileUrl: string;   // local URL created from file
  title: string;
  caption: string;
}

const ProfilePage: NextPageWithLayout = () => {
  // Move all useState declarations here
  const [activeTab, setActiveTab] = useState<'favorites' | 'sketchbook' | 'designs' | 'orders'>('favorites');
  const [favoritePosts, setFavoritePosts] = useState<IPost[]>([]);
  const [sketchbookPosts, setSketchbookPosts] = useState<IPost[]>([]);
  const [designPosts, setDesignPosts] = useState<IPost[]>([]);
  const [socialLinks, setSocialLinks] = useState(userProfile.socials);
  const [tags, setTags] = useState(userProfile.tags);
  const [openSocialsModal, setOpenSocialsModal] = useState(false);
  const [openTagsModal, setOpenTagsModal] = useState(false);
  const [newSocial, setNewSocial] = useState({ platform: 'Facebook', url: '' });
  const [newTag, setNewTag] = useState({ name: '', color: '#ff6b6b' });

  // Handles toggling posts into favorites
  const toggleFavorite = (post: IPost) => {
    setFavoritePosts((prev) => {
      if (prev.some((fav) => fav.id === post.id)) {
        return prev.filter((fav) => fav.id !== post.id);
      }
      return [...prev, post];
    });
  };

  // Function to upload posts to Sketchbook or Designs
  const handleCreateSketchbookPost = (newPost: IPost) => {
    setSketchbookPosts([...sketchbookPosts, newPost]);
  };
  const handleCreateDesignPost = (newPost: IPost) => {
    setDesignPosts([...designPosts, newPost]);
  };

  const renderTabs = () => {
    return (
      <div className="">
        {/* Navigation Buttons */}
        <div className="flex gap-6 justify-center mb-10">
          <button
            className={`px-24 py-3 rounded-lg text-xl ${activeTab === 'favorites' ? 'bg-cosmic-500 text-white' : 'bg-gray-700 text-gray-300'}`}
            onClick={() => setActiveTab('favorites')}
          >
            Favorites
          </button>
          <button
            className={`px-24 py-3 rounded-lg text-xl ${activeTab === 'sketchbook' ? 'bg-cosmic-500 text-white' : 'bg-gray-700 text-gray-300'}`}
            onClick={() => setActiveTab('sketchbook')}
          >
            Sketchbook
          </button>
          <button
            className={`px-24 py-3 rounded-lg text-xl ${activeTab === 'designs' ? 'bg-cosmic-500 text-white' : 'bg-gray-700 text-gray-300'}`}
            onClick={() => setActiveTab('designs')}
          >
            Designs
          </button>
          <button
            className={`px-24 py-3 rounded-lg text-xl ${activeTab === 'orders' ? 'bg-cosmic-500 text-white' : 'bg-gray-700 text-gray-300'}`}
            onClick={() => setActiveTab('orders')}
          >
            Orders
          </button>
        </div>

        {/* Conditional Rendering for Sections */}
        {activeTab === 'favorites' && (
          <div>
            {favoritePosts.length > 0 ? (
              <div className="grid grid-cols-3 gap-4">
                {favoritePosts.map((post) => (
                  <div key={post.id} className="bg-white/5 rounded-lg p-2">
                    <img src={post.fileUrl} alt="favorite" className="w-full h-48 object-cover rounded" />
                    <p className="text-sm font-semibold text-white mt-2">{post.title}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-white text-center mt-20 mb-20">No favorites yet.</p>
            )}
          </div>
        )}

        {activeTab === 'sketchbook' && (
          <PostsSection handleCreatePost={handleCreateSketchbookPost} posts={sketchbookPosts} />
        )}

        {activeTab === 'designs' && (
          <PostsSection handleCreatePost={handleCreateDesignPost} posts={designPosts} />
        )}

        {activeTab === 'orders' && (
          <div className="text-white text-center mt-20 mb-20">
            <p>No orders at this moment.</p>
          </div>
        )}
      </div>
    );
  };

  // ------------------------------------------------------------------
  // UPDATED: "Instagram-like" posts section with a detail popup
  // ------------------------------------------------------------------
  const PostsSection = ({ handleCreatePost, posts }: { handleCreatePost: (post: IPost) => void; posts: IPost[] }) => {
    const [showModal, setShowModal] = useState(false);
    const [uploadFile, setUploadFile] = useState<File | null>(null);
    const [postType, setPostType] = useState<PostType>('Sketch');
    const [title, setTitle] = useState('');
    const [caption, setCaption] = useState('');

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        setUploadFile(e.target.files[0]);
      }
    };

    const handleCreateNewPost = () => {
      if (!uploadFile) return;
      const newPost: IPost = {
        id: String(Date.now()),
        type: postType,
        fileUrl: URL.createObjectURL(uploadFile),
        title: title.trim(),
        caption: caption.trim(),
      };
      handleCreatePost(newPost);
      setShowModal(false);
      setUploadFile(null);
      setTitle('');
      setCaption('');
      setPostType('Sketch');
    };

    return (
      <div className="py-8 px-4">
        {posts.length === 0 ? (
          <div className="text-center">
            <p className="text-white text-center mt-10 mb-10">No posts yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-4">
            {posts.map((post) => (
              <div key={post.id} className="bg-white/5 rounded-lg p-2">
                <img src={post.fileUrl} alt="post" className="w-full h-48 object-cover rounded" />
                <p className="text-sm font-semibold text-white mt-2">{post.title}</p>
              </div>
            ))}
          </div>
        )}
        <div className="mt-0 mb-10 text-center">
          <button onClick={() => setShowModal(true)} className="px-4 py-2 bg-cosmic-500 text-white rounded-lg">
            Upload New Post
          </button>
        </div>

        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-gradient-to-b from-cosmic-900 to-cosmic-800 p-6 rounded-lg w-[400px] relative">
              <h3 className="text-lg font-semibold text-white text-center mb-4">Create new post</h3>
              <div className="border border-dashed border-gray-300 p-6 text-center mb-4 rounded">
                <p className="text-gray-500 text-sm">Drag photos and videos here</p>
                <p className="text-sm mt-2">or</p>
                <input type="file" onChange={handleFileChange} className="mt-2" />
              </div>
              <input
                className="block w-full mb-2 p-2 border rounded text-black"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <textarea
                className="block w-full mb-2 p-2 border rounded text-black"
                placeholder="Caption"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
              />
              <div className="flex justify-end gap-2 mt-4">
                <button onClick={() => setShowModal(false)} className="px-4 py-2 bg-gray-200 text-black rounded">
                  Cancel
                </button>
                <button onClick={handleCreateNewPost} className="px-4 py-2 bg-blue-500 text-white rounded">
                  Share
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  // Social & Tag handlers (same as your original code)
  const handleAddSocial = () => {
    if (newSocial.url.trim() !== '') {
      setSocialLinks([...socialLinks, newSocial]);
      setNewSocial({ platform: 'Facebook', url: '' });
    }
  };
  const handleRemoveSocial = (index: number) => {
    setSocialLinks(socialLinks.filter((_, i) => i !== index));
  };
  const handleAddTag = () => {
    if (newTag.name.trim() !== '') {
      setTags([...tags, newTag]);
      setNewTag({ name: '', color: '#ff6b6b' });
    }
  };
  const handleRemoveTag = (index: number) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-cosmic-900 to-cosmic-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16">
        <motion.div className="space-y-8">
          <motion.div>
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                {/* LEFT: Profile Picture */}
                <div className="md:col-span-4 text-center">
                  <div className="w-48 h-48 rounded-full bg-cosmic-800/50 mx-auto mb-4 border border-white/10" />
                  <button className="px-4 py-2 bg-white/5 rounded-lg border border-white/10 text-cosmic-100 hover:bg-white/10 transition-colors duration-200">
                    Change Photo
                  </button>
                </div>

                {/* RIGHT: Name, email, socials, tags */}
                <div className="md:col-span-8">
                  <h1 className="text-3xl font-bold text-white mb-2">
                    {userProfile.name}
                  </h1>
                  <p className="text-cosmic-100 mb-2">{userProfile.email}</p>
                  <p className="text-cosmic-200 mb-4">
                    Account Type:{' '}
                    <span className="text-cosmic-100">{userProfile.type}</span>
                  </p>

                  {/* Social Media Links */}
                  <SocialMediaLinks socials={socialLinks} />
                  <button
                    onClick={() => setOpenSocialsModal(true)}
                    className="px-4 py-2 bg-cosmic-500 hover:bg-cosmic-600 text-white rounded-lg mt-4"
                  >
                    Edit Social Media Links
                  </button>

                  {/* Specialization Tags */}
                  <h3 className="text-xl text-white font-semibold mt-6">
                    Specializations
                  </h3>
                  <SpecializationTags tags={tags} />
                  <button
                    onClick={() => setOpenTagsModal(true)}
                    className="px-4 py-2 bg-cosmic-500 hover:bg-cosmic-600 text-white rounded-lg mt-4"
                  >
                    Edit Specializations
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Divider */}
      {/* <div className="border-t border-white/10 mt-8" /> */}

      {renderTabs()}

      {/* MODALS for Socials & Tags (unchanged) */}
      {openSocialsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-gradient-to-b from-cosmic-900 to-cosmic-800 p-6 rounded-lg w-[700px]">
            <h3 className="text-lg font-semibold text-white mb-4">
              Edit Social Media Links
            </h3>
            {socialLinks.map((social, index) => (
              <div key={index} className="flex items-center gap-3 mb-3">
                <select
                  value={social.platform}
                  onChange={(e) => {
                    const updated = [...socialLinks];
                    updated[index].platform = e.target.value;
                    setSocialLinks(updated);
                  }}
                  className="px-4 py-3 border rounded-lg w-[150px] text-black"
                >
                  <option>Facebook</option>
                  <option>Twitter</option>
                  <option>Instagram</option>
                </select>
                <input
                  type="url"
                  value={social.url}
                  onChange={(e) => {
                    const updated = [...socialLinks];
                    updated[index].url = e.target.value;
                    setSocialLinks(updated);
                  }}
                  className="flex-1 px-4 py-3 border rounded-lg text-black"
                />
                <button
                  onClick={() => handleRemoveSocial(index)}
                  className="text-red-500 hover:text-red-600 text-lg"
                >
                  &times;
                </button>
              </div>
            ))}

            {/* Add new social link */}
            <div className="flex items-center gap-3 mb-4">
              <select
                value={newSocial.platform}
                onChange={(e) =>
                  setNewSocial({ ...newSocial, platform: e.target.value })
                }
                className="px-4 py-3 border rounded-lg w-[150px] text-black"
              >
                <option>Facebook</option>
                <option>Twitter</option>
                <option>Instagram</option>
              </select>
              <input
                type="url"
                placeholder="Enter URL"
                value={newSocial.url}
                onChange={(e) => setNewSocial({ ...newSocial, url: e.target.value })}
                className="flex-1 px-4 py-3 border rounded-lg text-black"
              />
              <button
                onClick={handleAddSocial}
                className="px-4 py-3 bg-green-500 text-black rounded-lg hover:bg-green-600"
              >
                Add
              </button>
            </div>

            <div className="mt-4 flex justify-end gap-2">
              <Button variant="outline" onClick={() => setOpenSocialsModal(false)}>
                Cancel
              </Button>
              <Button onClick={() => setOpenSocialsModal(false)}>Save</Button>
            </div>
          </div>
        </div>
      )}

      {openTagsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-gradient-to-b from-cosmic-900 to-cosmic-800 p-6 rounded-lg w-[700px]">
            <h3 className="text-lg font-semibold text-white mb-4">
              Edit Specializations
            </h3>
            {tags.map((tag, index) => (
              <div key={index} className="flex items-center gap-3 mb-3 text-black">
                <input
                  type="text"
                  value={tag.name}
                  onChange={(e) => {
                    const updated = [...tags];
                    updated[index].name = e.target.value;
                    setTags(updated);
                  }}
                  className="flex-1 px-4 py-3 border rounded-lg text-black"
                />
                <input
                  type="color"
                  value={tag.color}
                  onChange={(e) => {
                    const updated = [...tags];
                    updated[index].color = e.target.value;
                    setTags(updated);
                  }}
                  className="w-12 h-12"
                />
                <button
                  onClick={() => handleRemoveTag(index)}
                  className="text-red-500 hover:text-red-600 text-lg"
                >
                  &times;
                </button>
              </div>
            ))}

            {/* Add new tag */}
            <div className="flex items-center gap-3 mb-4">
              <input
                type="text"
                placeholder="New Tag"
                value={newTag.name}
                onChange={(e) => setNewTag({ ...newTag, name: e.target.value })}
                className="flex-1 px-4 py-3 border rounded-lg text-black"
              />
              <input
                type="color"
                value={newTag.color}
                onChange={(e) => setNewTag({ ...newTag, color: e.target.value })}
                className="w-12 h-12"
              />
              <button
                onClick={handleAddTag}
                className="px-4 py-3 bg-green-500 text-black rounded-lg hover:bg-green-600"
              >
                Add
              </button>
            </div>

            <div className="mt-4 flex justify-end gap-2">
              <Button variant="outline" onClick={() => setOpenTagsModal(false)}>
                Cancel
              </Button>
              <Button onClick={() => setOpenTagsModal(false)}>Save</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Layout
const getLayout = (page: ReactElement) => <Layout>{page}</Layout>;
ProfilePage.getLayout = getLayout;

export default ProfilePage;
