import React, { useState } from 'react';
import type { ReactElement } from 'react';
import type { NextPageWithLayout } from './_app';
import { Layout } from '../components/layout/Layout';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/Button';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

// Social Media Icons Mapping
const socialIcons: { [key: string]: React.ReactNode } = {
  Facebook: <FaFacebook className="w-5 h-5 text-blue-500" />,
  Twitter: <FaTwitter className="w-5 h-5 text-blue-400" />,
  Instagram: <FaInstagram className="w-5 h-5 text-pink-500" />,
};

// Dummy User Profile Data
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

// Social Media Component
const SocialMediaLinks = ({ socials }: { socials: { platform: string; url: string }[] }) => {
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

// Specialization Tags Component
const SpecializationTags = ({ tags }: { tags: { name: string; color: string }[] }) => {
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

const ProfilePage: NextPageWithLayout = () => {
  const [socialLinks, setSocialLinks] = useState(userProfile.socials);
  const [tags, setTags] = useState(userProfile.tags);

  const [openSocialsModal, setOpenSocialsModal] = useState(false);
  const [openTagsModal, setOpenTagsModal] = useState(false);

  const [newSocial, setNewSocial] = useState({ platform: 'Facebook', url: '' });
  const [newTag, setNewTag] = useState({ name: '', color: '#ff6b6b' });

  // Social Media Handlers
  const handleAddSocial = () => {
    if (newSocial.url.trim() !== '') {
      setSocialLinks([...socialLinks, newSocial]);
      setNewSocial({ platform: 'Facebook', url: '' });
    }
  };

  const handleRemoveSocial = (index: number) => {
    setSocialLinks(socialLinks.filter((_, i) => i !== index));
  };

  // Specialization Tags Handlers
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
                <div className="md:col-span-4 text-center">
                  <div className="w-48 h-48 rounded-full bg-cosmic-800/50 mx-auto mb-4 border border-white/10" />
                  <button className="px-4 py-2 bg-white/5 rounded-lg border border-white/10 text-cosmic-100 hover:bg-white/10 transition-colors duration-200">
                    Change Photo
                  </button>
                </div>
                <div className="md:col-span-8">
                  <h1 className="text-3xl font-bold text-white mb-2">{userProfile.name}</h1>
                  <p className="text-cosmic-100 mb-2">{userProfile.email}</p>
                  <p className="text-cosmic-200 mb-4">
                    Account Type: <span className="text-cosmic-100">{userProfile.type}</span>
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
                  <h3 className="text-xl text-white font-semibold mt-6">Specializations</h3>
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

      {/* Social Media Edit Modal */}
      {openSocialsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-lg font-semibold text-black mb-4">Edit Social Media Links</h3>
            {socialLinks.map((social, index) => (
              <div key={index} className="flex items-center gap-2 mb-3">
                <select
                  value={social.platform}
                  onChange={(e) => {
                    const updated = [...socialLinks];
                    updated[index].platform = e.target.value;
                    setSocialLinks(updated);
                  }}
                  className="px-3 py-2 border rounded-lg"
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
                  className="flex-1 px-3 py-2 border rounded-lg"
                />
                <button
                  onClick={() => handleRemoveSocial(index)}
                  className="text-red-500 hover:text-red-600"
                >
                  &times;
                </button>
              </div>
            ))}

            {/* Add New Social Media */}
            <div className="flex items-center gap-2 mb-4">
              <select
                value={newSocial.platform}
                onChange={(e) => setNewSocial({ ...newSocial, platform: e.target.value })}
                className="px-3 py-2 border rounded-lg"
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
                className="flex-1 px-3 py-2 border rounded-lg"
              />
              <button
                onClick={handleAddSocial}
                className="px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
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

      {/* Specialization Tags Edit Modal */}
      {openTagsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-lg font-semibold text-black mb-4">Edit Specializations</h3>
            {tags.map((tag, index) => (
              <div key={index} className="flex items-center gap-2 mb-3">
                <input
                  type="text"
                  value={tag.name}
                  onChange={(e) => {
                    const updated = [...tags];
                    updated[index].name = e.target.value;
                    setTags(updated);
                  }}
                  className="flex-1 px-3 py-2 border rounded-lg"
                />
                <input
                  type="color"
                  value={tag.color}
                  onChange={(e) => {
                    const updated = [...tags];
                    updated[index].color = e.target.value;
                    setTags(updated);
                  }}
                  className="w-10 h-10"
                />
                <button
                  onClick={() => handleRemoveTag(index)}
                  className="text-red-500 hover:text-red-600"
                >
                  &times;
                </button>
              </div>
            ))}

            {/* Add New Tag */}
            <div className="flex items-center gap-2 mb-4">
              <input
                type="text"
                placeholder="New Tag"
                value={newTag.name}
                onChange={(e) => setNewTag({ ...newTag, name: e.target.value })}
                className="flex-1 px-3 py-2 border rounded-lg"
              />
              <input
                type="color"
                value={newTag.color}
                onChange={(e) => setNewTag({ ...newTag, color: e.target.value })}
                className="w-10 h-10"
              />
              <button
                onClick={handleAddTag}
                className="px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
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

// Layout Wrapper
const getLayout = (page: ReactElement) => <Layout>{page}</Layout>;
ProfilePage.getLayout = getLayout;

export default ProfilePage;
