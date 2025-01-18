"use server";
import { doc, getDoc } from "firebase/firestore";
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

    // Decode the documentId if it's URL-encoded
    const decodedDocumentId = decodeURIComponent(documentId);
    const docRef = doc(db, collectionName, decodedDocumentId);
    const docSnap = await getDoc(docRef);
    console.log({ docSnap });
    if (!docSnap.exists()) {
      return null;
    }

    let data = docSnap.data() as T;
    console.log({ data });
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
