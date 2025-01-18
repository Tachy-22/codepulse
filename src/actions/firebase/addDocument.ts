"use server";
import { db } from "@/lib/firebase";
import { doc, setDoc } from "firebase/firestore";
import { revalidatePath } from "next/cache";

export type FirebaseError = {
  code: string;
  message: string;
};

export async function addDocument<T extends Record<string, unknown>>(
  collectionName: string,
  data: T,
  documentId: string,
  revalidatePathStr: string = "/"
): Promise<{ id: string; data: T } | FirebaseError> {
  try {
    if (!collectionName || !data) {
      throw new Error("Missing required parameters");
    }

    const docRef = doc(db, collectionName, documentId);
    await setDoc(docRef, {
      ...data,
      createdAt: new Date().toISOString(),
    });
    
    revalidatePath(revalidatePathStr);
    return { id: documentId, data };
  } catch (error) {
    return {
      code: "add-document-error",
      message:
        error instanceof Error ? error.message : "Failed to add document",
    };
  }
}
