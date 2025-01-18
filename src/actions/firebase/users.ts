"use server";

import { CreateUserInput, User } from "@/types/user";
import { addDocument } from "./addDocument";
import { fetchCollection } from "./fetchCollection";
import { fetchDocument } from "./fetchDocument";

export async function createUser(input: CreateUserInput): Promise<{ success: boolean; error?: string }> {
  try {
    // Check if user exists first
    const existingUser = await fetchDocument<User>("users", input.id);
    
    if (existingUser && 'data' in existingUser) {
      return { success: false, error: "User already exists" };
    }

    const user: User = {
      ...input,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Pass the input.id as the document ID instead of letting Firestore generate one
    const result = await addDocument<User>("users", user, input.id, "/");
    
    if ('code' in result) {
      throw new Error(result.message);
    }

    return { success: true };
  } catch (error) {
    console.error("Error creating user:", error);
    return { success: false, error: "Failed to create user" };
  }
}

export async function getUserByEmail(email: string): Promise<{ user: User; id: string } | null> {
  try {
    const result = await fetchCollection<User>("users", {
      whereClause: [["email", "==", email]],
      limitTo: 1
    });

    if ('code' in result) {
      throw new Error(result.message);
    }

    if (result.items[0]) {
      return {
        user: result.items[0],
        id: result.items[0].id
      };
    }
    return null;
  } catch (error) {
    console.error("Error getting user:", error);
    return null;
  }
}
