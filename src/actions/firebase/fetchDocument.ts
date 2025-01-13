"use server";
import { doc, getDoc, } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { FirebaseError } from "./addDocument";

export async function fetchDocument<T extends Record<string, unknown>>(
  collectionName: string,
  documentId: string,
  excludeAttributes?: string[]
): Promise<{ id: string; data: T } | FirebaseError | null> {
  try {
    if (!collectionName || !documentId) {
      throw new Error("Missing required parameters");
    }

    const docRef = doc(db, collectionName, documentId);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return null;
    }

    let data = docSnap.data() as T;
    
    if (excludeAttributes?.length) {
      data = Object.fromEntries(
        Object.entries(data).filter(([key]) => !excludeAttributes.includes(key))
      ) as T;
    }

    return {
      id: docSnap.id,
      data,
    };
  } catch (error) {
    return {
      code: "fetch-document-error",
      message:
        error instanceof Error ? error.message : "Failed to fetch document",
    };
  }
}
