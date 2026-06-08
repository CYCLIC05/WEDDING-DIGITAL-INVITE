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

export { db, isFirebaseConfigured, projectId, databaseId };
