import admin from "firebase-admin";
import { getFirestore } from "firebase-admin/firestore";
import path from "path";
import fs from "fs";

let db: any = null;
let isFirebaseConfigured = false;
let projectId = "";
let databaseId = "";

try {
  const configPath = path.join(process.cwd(), "firebase-applet-config.json");
  if (fs.existsSync(configPath)) {
    const configData = fs.readFileSync(configPath, "utf-8");
    const firebaseConfig = JSON.parse(configData);
    
    projectId = firebaseConfig?.projectId || "";
    databaseId = firebaseConfig?.firestoreDatabaseId || "";
    
    if (projectId) {
      if (!admin.apps.length) {
        admin.initializeApp({
          projectId: projectId,
        });
      }
      
      db = databaseId ? getFirestore(databaseId) : getFirestore();
      isFirebaseConfigured = true;
      console.log(`✅ Firebase Admin SDK initialized successfully for project "${projectId}" and database "${databaseId || "(default)"}".`);
    }
  } else {
    console.warn("⚠️ firebase-applet-config.json not found in workspace root.");
  }
} catch (err) {
  console.error("❌ Exception during Firebase Admin initialization:", err);
}

// Check with live query whether credentials actually have permissions/access to the targeting database
export async function verifyFirebaseConnectivity(): Promise<boolean> {
  if (!db || !isFirebaseConfigured) {
    isFirebaseConfigured = false;
    return false;
  }
  try {
    // Attempt a lightweight test fetch to verify read permissions
    await db.collection("rsvps").limit(1).get();
    console.log("✅ Firebase connectivity & read permissions confirmed successfully.");
    isFirebaseConfigured = true;
    return true;
  } catch (err: any) {
    console.warn("⚠️ Firebase connectivity verification check failed (possibly due to custom project configuration or insufficient credentials for this container's service account).");
    console.warn(`Reason: ${err?.message || err}`);
    console.warn("💡 Gracefully disabling server-side Firebase operations and falling back to offline JSON files to prevent user request failures.");
    isFirebaseConfigured = false;
    return false;
  }
}

export function getFirebaseConfiguredStatus(): boolean {
  return isFirebaseConfigured;
}

export { db, isFirebaseConfigured, projectId, databaseId };
