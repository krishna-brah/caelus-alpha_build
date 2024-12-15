import React from 'react';
import { Star } from 'lucide-react';
import { useReviews } from '../contexts/ReviewsContext';

interface ReviewsProps {
  productId: number;
}

const Reviews: React.FC<ReviewsProps> = ({ productId }) => {
  const { reviews } = useReviews();
  const productReviews = reviews[productId] || [];

  const averageRating = productReviews.length
    ? (productReviews.reduce((sum, review) => sum + review.rating, 0) / productReviews.length).toFixed(1)
    : '0.0';

  return (
    <div className="space-y-6">
      {/* Average Rating */}
      <div className="flex items-center gap-4">
        <div className="text-3xl font-bold text-white">{averageRating}</div>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((value) => (
            <Star
              key={value}
              className={`w-5 h-5 ${
                value <= Number(averageRating)
                  ? 'text-yellow-500 fill-yellow-500'
                  : 'text-cosmic-100'
              }`}
            />
          ))}
        </div>
        <div className="text-cosmic-100">
          ({productReviews.length} {productReviews.length === 1 ? 'review' : 'reviews'})
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {productReviews.map((review) => (
          <div
            key={review.id}
            className="bg-white/5 rounded-lg p-4 border border-white/10"
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <div className="font-medium text-white">{review.userName}</div>
                <div className="flex gap-1 mt-1">
                  {[1, 2, 3, 4, 5].map((value) => (
                    <Star
                      key={value}
                      className={`w-4 h-4 ${
                        value <= review.rating
                          ? 'text-yellow-500 fill-yellow-500'
                          : 'text-cosmic-100'
                      }`}
                    />
                  ))}
                </div>
              </div>
              <div className="text-sm text-cosmic-100">
                {new Date(review.createdAt).toLocaleDateString()}
              </div>
            </div>
            <p className="text-cosmic-100 mt-2">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;