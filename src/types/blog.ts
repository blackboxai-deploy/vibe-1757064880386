export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  author: string;
  publishedAt: string;
  updatedAt: string;
  status: 'draft' | 'published';
  categories: string[];
  tags: string[];
  featuredImage?: string;
  viewCount: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  postCount: number;
}

export interface Comment {
  id: string;
  postId: string;
  author: string;
  email: string;
  content: string;
  createdAt: string;
  approved: boolean;
}

export interface BlogStats {
  totalPosts: number;
  totalCategories: number;
  totalComments: number;
  totalViews: number;
}