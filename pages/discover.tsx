import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { Layout } from '../components/layout/Layout';

// 🔹 Placeholder profile data (only using temporary images)
const placeholderProfiles = [
  { id: 1, name: "Alex Rivera", image: "/images/profile/profile1.jpg", username: "@alexrivera" },
  { id: 2, name: "Parth Manoharan", image: "/images/profile/profile2.jpg", username: "@sophiachen" },
  { id: 3, name: "Jordan Smith", image: "/images/profile/profile3.jpg", username: "@jordanlee" },
  { id: 4, name: "Mia Gonzalez", image: "/images/profile/profile4.jpg", username: "@miagonzalez" },
];

// 🔹 Fetch People’s Profiles (Mock API - Commented out)
// const fetchProfiles = async () => {
//   try {
//     console.log("Fetching profiles...");
//     const response = await fetch("https://api.example.com/profiles"); // Replace with actual API
//     const data = await response.json();
//     console.log("API Response:", data);
//     return data.profiles || placeholderProfiles;
//   } catch (error) {
//     console.error("Error fetching profiles:", error);
//     return placeholderProfiles;
//   }
// };

const Discover = () => {
  const [profiles, setProfiles] = useState(placeholderProfiles);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const maxPages = 5; // Prevent endless scrolling
  const observer = useRef<IntersectionObserver | null>(null);
  const lastProfileRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  // 🔹 Fetch Initial Profiles (Now using static data)
  useEffect(() => {
    // setProfiles(placeholderProfiles); // No API call needed
  }, []);

  // 🔹 Fetch More Profiles (Simulating Lazy Loading)
  const fetchMoreProfiles = useCallback(() => {
    if (!hasMore || loading) return;

    setLoading(true);
    console.log("Loading more profiles...");

    setTimeout(() => {
      setProfiles((prev) => [...prev, ...placeholderProfiles]); // Just appending the same data for now
      setLoading(false);

      if (page >= maxPages) {
        setHasMore(false);
      } else {
        setPage((prev) => prev + 1);
      }
    }, 1000); // Simulating network delay
  }, [page, loading, hasMore]);

  // 🔹 Auto-Load More (When Last Profile Is in View)
  useEffect(() => {
    if (!hasMore || profiles.length === 0) return;

    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          console.log("Last profile in view - Loading more...");
          fetchMoreProfiles();
        }
      },
      { threshold: 0.5 }
    );

    if (lastProfileRef.current) {
      observer.current.observe(lastProfileRef.current);
    }

    return () => observer.current?.disconnect();
  }, [fetchMoreProfiles, hasMore, profiles]);

  // 🔹 Navigate to Profile
  const visitProfile = (id: number) => {
    router.push(`/profile/${id}`);
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-cosmic-900 to-cosmic-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16">
          {/* Header */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }} className="text-center mb-12">
            <h1 className="text-4xl font-bold text-white font-space-grotesk">
              Discover People & Creators
            </h1>
            <p className="text-lg text-cosmic-100 mt-2">
              Find interesting people and check out their profiles.
            </p>
          </motion.div>

          {/* 🔹 Grid Layout */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {profiles.map((profile, index) => (
              <motion.div
                key={profile.id}
                className="relative cursor-pointer group p-4 bg-cosmic-800 rounded-xl shadow-lg"
                whileHover={{ scale: 1.05 }}
                onClick={() => visitProfile(profile.id)}
                ref={index === profiles.length - 1 ? lastProfileRef : null} // Observe last profile
              >
                <img src={profile.image} alt={profile.name} className="w-full h-48 object-cover rounded-lg" />
                <div className="mt-4 text-center">
                  <h3 className="text-lg font-bold text-white">{profile.name}</h3>
                  <p className="text-sm text-cosmic-100">{profile.username}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* 🔹 Loading Indicator */}
          {loading && (
            <div className="mt-12 text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-cosmic-500 border-t-transparent" />
              <p className="text-cosmic-100 mt-4">Loading more profiles...</p>
            </div>
          )}

          {/* 🔹 No More Content Message */}
          {!hasMore && !loading && (
            <div className="mt-12 text-center text-cosmic-100">
              <p>🎉 You've reached the end of the feed!</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Discover;
