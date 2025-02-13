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

// ------------------------------------------------------------------
// UPDATED: "Instagram-like" posts section with a detail popup
// ------------------------------------------------------------------
type PostType = 'Sketch' | 'Previous Creation' | 'Inspiration';

interface IPost {
  id: string;
  type: PostType;
  fileUrl: string;   // local URL created from file
  title: string;
  caption: string;
}

const PostsSection = () => {
  const [posts, setPosts] = useState<IPost[]>([]);

  // Controls for the "Create new post" modal
  const [showModal, setShowModal] = useState(false);
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [postType, setPostType] = useState<PostType>('Sketch');
  const [title, setTitle] = useState('');
  const [caption, setCaption] = useState('');

  // For viewing an individual post's detail
  const [selectedPost, setSelectedPost] = useState<IPost | null>(null);

  // Handle file change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setUploadFile(e.target.files[0]);
    }
  };

  // Called when the user hits “Share” in the modal
  const handleCreatePost = () => {
    if (!uploadFile) return; // no file selected

    const newPost: IPost = {
      id: String(Date.now()),
      type: postType,
      fileUrl: URL.createObjectURL(uploadFile),
      title: title.trim(),
      caption: caption.trim(),
    };

    setPosts([...posts, newPost]);
    // reset
    setShowModal(false);
    setUploadFile(null);
    setTitle('');
    setCaption('');
    setPostType('Sketch');
  };

  // Renders the “Share Photos” placeholder if no posts
  if (posts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4">
        {/* Left-aligned by removing items-center */}
        <div className="text-4xl mb-4">📷</div>
        <h2 className="text-2xl font-semibold mb-2 text-white">Share Photos</h2>
        <p className="text-white text-sm mb-4">
          When you share photos, they will appear on your profile.
        </p>
        <button
          onClick={() => setShowModal(true)}
          className="text-blue-500 font-semibold"
        >
          Share your first photo
        </button>

        {/* "Create New Post" Modal */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white p-6 rounded-lg w-[400px] relative">
              <h3 className="text-lg font-semibold text-black text-center mb-4">
                Create new post
              </h3>

              <div className="border border-dashed border-gray-300 p-6 text-center mb-4 rounded">
                <p className="text-gray-500 text-sm">Drag photos and videos here</p>
                <p className="text-sm mt-2">or</p>
                <input type="file" onChange={handleFileChange} className="mt-2" />
              </div>

              {/* Post Type, Title, Caption */}
              <select
                className="block w-full mb-2 p-2 border rounded"
                value={postType}
                onChange={(e) => setPostType(e.target.value as PostType)}
              >
                <option value="Sketch">Sketch</option>
                <option value="Previous Creation">Previous Creation</option>
                <option value="Inspiration">Inspiration</option>
              </select>

              <input
                className="block w-full mb-2 p-2 border rounded"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <textarea
                className="block w-full mb-2 p-2 border rounded"
                placeholder="Caption"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
              />

              <div className="flex justify-end gap-2 mt-4">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-200 text-black rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreatePost}
                  className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                  Share
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // If we have posts, show grid
  return (
    <div className="py-8 px-4">
      {/* Left aligned by removing mx-auto */}
      <div className="grid grid-cols-3 gap-4">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-white/5 rounded-lg p-2 cursor-pointer hover:bg-white/10 transition"
            onClick={() => setSelectedPost(post)}
          >
            <img
              src={post.fileUrl}
              alt="post"
              className="w-full h-48 object-cover rounded"
            />
            <p className="mt-2 text-sm font-semibold text-white">{post.title}</p>
            <p className="text-xs text-gray-300">{post.caption}</p>
            <p className="text-xs text-gray-500 italic mt-1">{post.type}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 items-center justify-center text-center">
        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 bg-cosmic-500 hover:bg-cosmic-600 text-white rounded-lg mt-4"
        >
          Add another post
        </button>
      </div>

      {/* The "Create New Post" Modal (same code, reused) */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white p-6 rounded-lg w-[400px] relative">
            <h3 className="text-lg font-semibold text-black text-center mb-4">
              Create new post
            </h3>
            <div className="border border-dashed border-gray-300 p-6 text-center mb-4 rounded">
              <p className="text-gray-500 text-sm">Drag photos and videos here</p>
              <p className="text-sm mt-2">or</p>
              <input type="file" onChange={handleFileChange} className="mt-2" />
            </div>

            <select
              className="block w-full mb-2 p-2 border rounded"
              value={postType}
              onChange={(e) => setPostType(e.target.value as PostType)}
            >
              <option value="Sketch">Sketch</option>
              <option value="Previous Creation">Previous Creation</option>
              <option value="Inspiration">Inspiration</option>
            </select>

            <input
              className="block w-full mb-2 p-2 border rounded"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              className="block w-full mb-2 p-2 border rounded"
              placeholder="Caption"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
            />
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-200 text-black rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleCreatePost}
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                Share
              </button>
            </div>
          </div>
        </div>
      )}

      {/* The "View Post" Modal for a larger preview & details */}
      {selectedPost && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50"
          onClick={() => setSelectedPost(null)}
        >
          {/* Click outside closes modal */}
          <div
            className="flex flex-col md:flex-row bg-cosmic-800 max-w-4xl w-full rounded-lg overflow-hidden"
            onClick={(e) => e.stopPropagation()} // prevent close when clicking inside
          >
            {/* Left side: the bigger image */}
            <div className="md:w-1/2 w-full bg-black flex items-center justify-center">
              <img
                src={selectedPost.fileUrl}
                alt="selected"
                className="max-h-[80vh] object-contain"
              />
            </div>

            {/* Right side: text info, comments, close button */}
            <div className="md:w-1/2 w-full p-4 relative text-white flex flex-col">
              <button
                onClick={() => setSelectedPost(null)}
                className="absolute right-4 top-2 text-2xl leading-none"
              >
                &times;
              </button>

              <h3 className="font-bold text-lg mb-1">{selectedPost.title}</h3>
              <p className="text-sm text-gray-200 mb-4">{selectedPost.caption}</p>
              <p className="text-xs text-gray-500 italic mb-2">
                {selectedPost.type}
              </p>
              <hr className="border-gray-600 mb-4" />

              {/* Placeholder comments */}
              <div className="flex-1 overflow-y-auto text-sm">
                <p className="text-gray-400">Comments go here...</p>
              </div>

              {/* Post a comment bar (just a placeholder) */}
              <div className="mt-4 flex gap-2">
                <input
                  type="text"
                  placeholder="Add a comment..."
                  className="flex-1 px-2 py-1 rounded bg-cosmic-900 border border-gray-600"
                />
                <button className="px-3 py-1 bg-blue-500 rounded text-white">
                  Post
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ------------------------------------------------------------------
// EXISTING PAGE COMPONENT
// ------------------------------------------------------------------
const ProfilePage: NextPageWithLayout = () => {
  const [socialLinks, setSocialLinks] = useState(userProfile.socials);
  const [tags, setTags] = useState(userProfile.tags);

  const [openSocialsModal, setOpenSocialsModal] = useState(false);
  const [openTagsModal, setOpenTagsModal] = useState(false);

  const [newSocial, setNewSocial] = useState({ platform: 'Facebook', url: '' });
  const [newTag, setNewTag] = useState({ name: '', color: '#ff6b6b' });

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
      <div className="border-t border-white/10 mt-8" />

      {/* NEW: Instagram-like Posts Section */}
      <PostsSection />

      {/* MODALS for Socials & Tags (unchanged) */}
      {openSocialsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white p-6 rounded-lg w-[700px]">
            <h3 className="text-lg font-semibold text-black mb-4">
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
                  className="px-4 py-3 border rounded-lg w-[150px]"
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
                  className="flex-1 px-4 py-3 border rounded-lg"
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
                className="px-4 py-3 border rounded-lg w-[150px]"
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
                className="flex-1 px-4 py-3 border rounded-lg"
              />
              <button
                onClick={handleAddSocial}
                className="px-4 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600"
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
          <div className="bg-white p-6 rounded-lg w-[700px]">
            <h3 className="text-lg font-semibold text-black mb-4">
              Edit Specializations
            </h3>
            {tags.map((tag, index) => (
              <div key={index} className="flex items-center gap-3 mb-3">
                <input
                  type="text"
                  value={tag.name}
                  onChange={(e) => {
                    const updated = [...tags];
                    updated[index].name = e.target.value;
                    setTags(updated);
                  }}
                  className="flex-1 px-4 py-3 border rounded-lg"
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
                className="flex-1 px-4 py-3 border rounded-lg"
              />
              <input
                type="color"
                value={newTag.color}
                onChange={(e) => setNewTag({ ...newTag, color: e.target.value })}
                className="w-12 h-12"
              />
              <button
                onClick={handleAddTag}
                className="px-4 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600"
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
