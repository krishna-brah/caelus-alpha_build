import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import { Layout } from '../components/layout/Layout';

// 🔹 Fallback images (used if API fails)
const placeholderImages = [
  "/images/fallback1.jpg",
  "/images/fallback2.jpg",
  "/images/fallback3.jpg",
  "/images/fallback4.jpg"
];

// 🔹 Fetch AI-Generated Images (Pexels API)
const generateImage = async (interest: string) => {
  try {
    console.log(`Fetching image for: ${interest}`);
    const response = await fetch(
      `https://api.pexels.com/v1/search?query=${encodeURIComponent(interest + " fashion")}&per_page=1`,
      {
        headers: {
          'Authorization': 'SGSwVbUEUb6bu4cUfAO6N3HGHfeLyDdIAF1bwnLBaA4vUbLRDsnMAQKD'
        }
      }
    );

    const data = await response.json();
    console.log("API Response:", data);

    return data.photos?.[0]?.src?.large || data.photos?.[0]?.src?.medium || placeholderImages[Math.floor(Math.random() * placeholderImages.length)];
  } catch (error) {
    console.error("Error fetching images:", error);
    return placeholderImages[Math.floor(Math.random() * placeholderImages.length)];
  }
};

// 🔹 Initial Interests (Adjust based on user behavior)
const initialInterests = ['sustainable', 'streetwear', 'vintage', 'minimalist'];

const Discover = () => {
  const [images, setImages] = useState<{ id: number; url: string; label: string }[]>([]);
  const [userInterests, setUserInterests] = useState(initialInterests);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const maxPages = 5; // Prevents endless scrolling
  const observer = useRef<IntersectionObserver | null>(null);
  const lastImageRef = useRef<HTMLDivElement | null>(null);

  // 🔹 Fetch Initial Images (Runs on Mount)
  useEffect(() => {
    fetchImages();
  }, []);

  // 🔹 Fetch Images (Triggered on Scroll)
  const fetchImages = useCallback(async () => {
    if (!hasMore || loading) return;
    
    setLoading(true);
    console.log("Loading more images...");

    const newImages = await Promise.all(
      userInterests.map(async (interest, index) => {
        const imgUrl = await generateImage(interest);
        return { id: images.length + index, url: imgUrl, label: interest };
      })
    );

    setImages((prev) => [...prev, ...newImages]);
    setLoading(false);

    if (page >= maxPages) {
      setHasMore(false);
    } else {
      setPage((prev) => prev + 1);
    }
  }, [userInterests, images, page, loading, hasMore]);

  // 🔹 Auto-Load More (When Last Image Is in View)
  useEffect(() => {
    if (!hasMore || images.length === 0) return;

    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          console.log("Last image in view - Loading more...");
          fetchImages();
        }
      },
      { threshold: 0.5 }
    );

    if (lastImageRef.current) {
      observer.current.observe(lastImageRef.current);
    }

    return () => observer.current?.disconnect();
  }, [fetchImages, hasMore, images]);

  // 🔹 Handle User Interaction (Refines Recommendations)
  const handleInteraction = (label: string) => {
    setUserInterests((prev) => [...new Set([...prev, label])]);
    fetchImages();
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-cosmic-900 to-cosmic-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16">
          {/* Header */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }} className="text-center mb-12">
            <h1 className="text-4xl font-bold text-white font-space-grotesk">
              Discover Sustainable Fashion
            </h1>
            <p className="text-lg text-cosmic-100 mt-2">
              Get AI-powered inspiration based on your interests.
            </p>
          </motion.div>

          {/* 🔹 Masonry Grid Layout */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
            {images.map((img, index) => (
              <motion.div
                key={img.id}
                className="relative cursor-pointer group"
                whileHover={{ scale: 1.05 }}
                onClick={() => handleInteraction(img.label)}
                ref={index === images.length - 1 ? lastImageRef : null} // Observe last image
              >
                <img src={img.url} alt={`Fashion ${img.id}`} className="w-full h-full object-cover rounded-lg" />
                <div className="absolute bottom-2 left-2 bg-black/50 text-white px-2 py-1 text-xs rounded">
                  {img.label}
                </div>
                {/* ❤️ Like Button */}
                <button className="absolute top-2 right-2 bg-white/20 p-2 rounded-full opacity-0 group-hover:opacity-100 transition"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleInteraction(img.label);
                  }}
                >
                  ❤️
                </button>
              </motion.div>
            ))}
          </div>

          {/* 🔹 Loading Indicator */}
          {loading && (
            <div className="mt-12 text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-cosmic-500 border-t-transparent" />
              <p className="text-cosmic-100 mt-4">Loading more fashion ideas...</p>
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
