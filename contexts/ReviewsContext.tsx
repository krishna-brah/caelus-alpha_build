import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Review {
  id: string;
  productId: number;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: Date;
}

interface ReviewsContextType {
  reviews: { [key: number]: Review[] };
  addReview: (review: Omit<Review, 'id' | 'createdAt'>) => void;
}

const ReviewsContext = createContext<ReviewsContextType | undefined>(undefined);

export const ReviewsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [reviews, setReviews] = useState<{ [key: number]: Review[] }>({});

  const addReview = (review: Omit<Review, 'id' | 'createdAt'>) => {
    const newReview: Review = {
      ...review,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date(),
    };

    setReviews(prev => ({
      ...prev,
      [review.productId]: [...(prev[review.productId] || []), newReview],
    }));
  };

  return (
    <ReviewsContext.Provider value={{ reviews, addReview }}>
      {children}
    </ReviewsContext.Provider>
  );
};

export const useReviews = () => {
  const context = useContext(ReviewsContext);
  if (context === undefined) {
    throw new Error('useReviews must be used within a ReviewsProvider');
  }
  return context;
};