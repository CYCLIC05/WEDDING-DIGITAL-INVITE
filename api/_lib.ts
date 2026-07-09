import { Resend } from "resend";
import admin from "firebase-admin";
import { getFirestore } from "firebase-admin/firestore";

let db: any = null;
let firebaseReady = false;

function getDb() {
  if (firebaseReady && db) return db;
  try {
    const projectId = process.env.FIREBASE_PROJECT_ID || "";
    const databaseId = process.env.FIREBASE_DATABASE_ID || "(default)";
    if (!admin.apps.length) {
      const serviceAccountJson = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;
      if (serviceAccountJson) {
        const serviceAccount = JSON.parse(serviceAccountJson);
        admin.initializeApp({ credential: admin.credential.cert(serviceAccount), projectId });
      } else {
        admin.initializeApp({ projectId });
      }
    }
    db = databaseId === "(default)" ? getFirestore() : getFirestore(databaseId);
    firebaseReady = true;
  } catch (err) {
    console.error("Firebase init error:", err);
  }
  return db;
}

function getResend() {
  return new Resend(process.env.RESEND_API_KEY || "");
}

function getAdminPasscode() {
  return (process.env.SYSTEM_ADMIN_PASSCODE || "TobiAyomide2026").trim();
}

function checkAdminAuth(req: any): boolean {
  const authHeader = (req.headers["authorization"] as string) || "";
  const headerPasscode = (req.headers["x-admin-passcode"] as string) || "";
  const queryPasscode = (req.query?.passcode as string) || "";
  let provided = "";
  if (authHeader.startsWith("Bearer ")) provided = authHeader.slice(7);
  else if (headerPasscode) provided = headerPasscode;
  else if (queryPasscode) provided = queryPasscode;
  return provided.trim() === getAdminPasscode();
}

function setCors(res: any) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Admin-Passcode");
}

function eventLabel(e: string) {
  if (e === "traditional") return "Traditional Marriage (J.A. – Journey Aligned)";
  if (e === "church") return "Church Wedding Ceremony";
  if (e === "reception") return "Thanksgiving & Fellowship Reception";
  return e;
}

export { getDb, getResend, getAdminPasscode, checkAdminAuth, setCors, eventLabel };