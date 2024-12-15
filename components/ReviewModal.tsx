import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import { Star } from 'lucide-react';
import { useReviews } from '../contexts/ReviewsContext';

interface ReviewModalProps {
  productId: number;
  onClose: () => void;
  isOpen: boolean;
}

const ReviewModal: React.FC<ReviewModalProps> = ({ productId, onClose, isOpen }) => {
  const { data: session } = useSession();
  const { addReview } = useReviews();
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [hoveredRating, setHoveredRating] = useState<number | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!session?.user) return;

    addReview({
      productId,
      userId: session.user.id || '',
      userName: session.user.name || 'Anonymous',
      rating,
      comment,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-cosmic-800 rounded-2xl p-8 w-full max-w-md border border-white/10">
        <h2 className="text-2xl font-bold text-white mb-6">Write a Review</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Rating Stars */}
          <div>
            <label className="block text-sm font-medium text-cosmic-100 mb-2">Rating</label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setRating(value)}
                  onMouseEnter={() => setHoveredRating(value)}
                  onMouseLeave={() => setHoveredRating(null)}
                  className="focus:outline-none"
                >
                  <Star
                    className={`w-8 h-8 ${
                      value <= (hoveredRating || rating)
                        ? 'text-yellow-500 fill-yellow-500'
                        : 'text-cosmic-100'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Comment */}
          <div>
            <label htmlFor="comment" className="block text-sm font-medium text-cosmic-100 mb-2">
              Your Review
            </label>
            <textarea
              id="comment"
              rows={4}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full px-4 py-3 bg-cosmic-900/50 border border-white/10 rounded-lg text-white placeholder-cosmic-100/50 focus:outline-none focus:ring-2 focus:ring-cosmic-500"
              placeholder="Share your thoughts about this product..."
              required
            />
          </div>

          {/* Submit Button */}
          <div className="flex gap-4">
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-cosmic-500 to-cosmic-600 text-white px-6 py-3 rounded-lg font-medium hover:from-cosmic-600 hover:to-cosmic-700 transition-all duration-200"
            >
              Submit Review
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 text-cosmic-100 hover:text-white border border-white/10 rounded-lg hover:bg-white/5 transition-all duration-200"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReviewModal;