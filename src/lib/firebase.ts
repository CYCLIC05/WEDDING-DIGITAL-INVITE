import admin from "firebase-admin";
import fs from "fs";
import path from "path";

// Check if firebase-applet-config.json exists
const configPath = path.join(process.cwd(), "firebase-applet-config.json");
let firebaseConfigured = false;
let db: admin.firestore.Firestore | null = null;

if (fs.existsSync(configPath)) {
  try {
    const rawConfig = fs.readFileSync(configPath, "utf-8");
    const config = JSON.parse(rawConfig);
    
    if (config.projectId) {
      // Initialize Firebase Admin App
      admin.initializeApp({
        projectId: config.projectId,
      });

      // Get Firestore instance, specifying the databaseId if provided
      const targetDatabaseId = config.databaseId || config.firestoreDatabaseId;
      if (targetDatabaseId) {
        db = admin.firestore(admin.app());
        // Configure Firestore to use the custom database
        db.settings({
          databaseId: targetDatabaseId,
        });
        console.log(`[Firebase] Admin SDK initialized successfully for project "${config.projectId}" and database "${targetDatabaseId}".`);
      } else {
        db = admin.firestore();
        console.log(`[Firebase] Admin SDK initialized successfully for default database in project "${config.projectId}".`);
      }
      firebaseConfigured = true;
    }
  } catch (error) {
    console.error("[Firebase] Failed to parse or initialize Firebase Applet Config:", error);
  }
}

let firebaseConfiguredStatus = false;

export function getFirebaseConfiguredStatus(): boolean {
  return firebaseConfiguredStatus;
}

export function isFirebaseConfigured(): boolean {
  return firebaseConfigured;
}

export async function verifyFirebaseConnectivity(): Promise<boolean> {
  if (!db || !firebaseConfigured) return false;
  try {
    // Attempt a lightweight test query to ensure database connection and permissions are working
    await db.collection("system_check").doc("status").get();
    console.log("[Firebase] Connectivity & read permissions confirmed successfully.");
    firebaseConfiguredStatus = true;
    return true;
  } catch (error: any) {
    console.log("[Firebase] Running database operations in local backup storage mode.");
    console.log(`[Firebase] Database verification status details: ${error.message || error}`);
    firebaseConfiguredStatus = false;
    return false;
  }
}

export { db };
