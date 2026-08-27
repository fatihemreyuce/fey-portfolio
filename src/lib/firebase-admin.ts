import "server-only";

import { cert, getApps, initializeApp } from "firebase-admin/app";
import { FieldValue, getFirestore } from "firebase-admin/firestore";

const requiredConfig = [
  process.env.FIREBASE_PROJECT_ID,
  process.env.FIREBASE_CLIENT_EMAIL,
  process.env.FIREBASE_PRIVATE_KEY,
];

export async function saveContactMessage(message: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  if (requiredConfig.some((value) => !value)) {
    return false;
  }

  const app = getApps()[0] ?? initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    }),
  });

  await getFirestore(app).collection("contactMessages").add({
    ...message,
    createdAt: FieldValue.serverTimestamp(),
    status: "new",
  });

  return true;
}
