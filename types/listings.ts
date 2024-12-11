import { Tag } from './tags';

export interface ListingScore {
  designQuality: number;
  materialUse: number;
  sustainability: number;
  totalReviews: number;
}

export interface ListingMaterial {
  id: string;
  name: string;
  quality: number;
  sustainability: number;
  origin: string;
  supplier: string;
  certifications: string[];
}

export interface DesignerListingData {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  materials: ListingMaterial[];
  sustainabilityNotes: string;
  score: ListingScore;
  designer: {
    id: string;
    name: string;
    tags: Tag[];
  };
  createdAt: string;
  updatedAt: string;
}

export interface ListingReview {
  id: string;
  listingId: string;
  reviewerId: string;
  reviewerName: string;
  isDesignerReview: boolean;
  designQuality: number;
  materialUse: number;
  sustainability: number;
  comment: string;
  createdAt: string;
}