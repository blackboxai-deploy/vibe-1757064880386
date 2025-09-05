import { writeFile, readFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';
import { BlogPost, Category, Comment } from '@/types/blog';

const DATA_DIR = path.join(process.cwd(), 'data');

// Ensure data directory exists
export async function ensureDataDir() {
  if (!existsSync(DATA_DIR)) {
    await mkdir(DATA_DIR, { recursive: true });
  }
}

// Generic file operations
async function readJsonFile<T>(filename: string, defaultValue: T): Promise<T> {
  try {
    await ensureDataDir();
    const filePath = path.join(DATA_DIR, filename);
    const data = await readFile(filePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return defaultValue;
  }
}

async function writeJsonFile<T>(filename: string, data: T): Promise<void> {
  await ensureDataDir();
  const filePath = path.join(DATA_DIR, filename);
  await writeFile(filePath, JSON.stringify(data, null, 2));
}

// Blog posts operations
export async function getAllPosts(): Promise<BlogPost[]> {
  return readJsonFile('posts.json', []);
}

export async function savePosts(posts: BlogPost[]): Promise<void> {
  return writeJsonFile('posts.json', posts);
}

export async function getPostById(id: string): Promise<BlogPost | null> {
  const posts = await getAllPosts();
  return posts.find(post => post.id === id) || null;
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const posts = await getAllPosts();
  return posts.find(post => post.slug === slug) || null;
}

// Categories operations
export async function getAllCategories(): Promise<Category[]> {
  return readJsonFile('categories.json', []);
}

export async function saveCategories(categories: Category[]): Promise<void> {
  return writeJsonFile('categories.json', categories);
}

// Comments operations
export async function getAllComments(): Promise<Comment[]> {
  return readJsonFile('comments.json', []);
}

export async function saveComments(comments: Comment[]): Promise<void> {
  return writeJsonFile('comments.json', comments);
}

export async function getCommentsByPostId(postId: string): Promise<Comment[]> {
  const comments = await getAllComments();
  return comments.filter(comment => comment.postId === postId && comment.approved);
}