import { db } from "./index";
import { and, eq } from "drizzle-orm";
import { users, products, comments, type NewUser, type NewProduct, type NewComment } from "./schema";

//  !!drizzle returns an array from .returning()
// ---- USERS ----
export const createUser = async (data: NewUser) => {
  return (await db.insert(users).values(data).returning())[0];
};

export const getUserById = async (id: string) => {
  return db.query.users.findFirst({ where: eq(users.id, id) });
};

export const updateUser = async (id: string, data: Partial<NewUser>) => {
  return (await db.update(users).set(data).where(eq(users.id, id)).returning())[0];
};

// handle conflict => create or update
export const upsertUser = async (data: NewUser) => {
  return (await db.insert(users).values(data).onConflictDoUpdate({ target: users.id, set: data }).returning())[0];
};

// ---- PRODUCTS ----
export const createProduct = async (data: NewProduct) => {
  return (await db.insert(products).values(data).returning())[0];
};

export const getAllProducts = async () => {
  return db.query.products.findMany({
    with: { user: true },
    orderBy: (products, { desc }) => [desc(products.createdAt)]
  });
};

export const getProductById = async (id: string) => {
  return db.query.products.findFirst({
    where: eq(products.id, id),
    with: {
      user: true,
      comments: {
        with: { user: true },
        orderBy: (comments, { desc }) => [desc(comments.createdAt)]
      }
    }
  });
};

export const getProductByUserId = async (userId: string) => {
  return db.query.products.findMany({
    where: eq(products.userId, userId),
    with: { user: true },
    orderBy: (products, { desc }) => [desc(products.createdAt)]
  });
};

export const updateProduct = async (id: string, userId: string, data: Partial<NewProduct>) => {
  return (await db.update(products).set(data).where(and(eq(products.id, id), eq(products.userId, userId))).returning())[0];
};

export const deleteProduct = async (id: string, userId: string) => {
  return (await db.delete(products).where(and(eq(products.id, id), eq(products.userId, userId))).returning())[0];
};

// ---- COMMENTS ----
export const createComment = async (data: NewComment) => {
  return (await db.insert(comments).values(data).returning())[0];
};

export const deleteComment = async (id: string, userId: string) => {
  return (await db.delete(comments).where(and(eq(comments.id, id), eq(comments.userId, userId))).returning())[0];
};

export const getCommentById = async (id: string) => {
  return db.query.comments.findFirst({
    where: eq(comments.id, id),
    with: { user: true }
  });
};
