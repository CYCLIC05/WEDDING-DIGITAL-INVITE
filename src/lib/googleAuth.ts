import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, User } from "firebase/auth";
import firebaseConfig from "../../firebase-applet-config.json";

// Initialize client-side Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);

const provider = new GoogleAuthProvider();
// Add Gmail send scope so we can send emails on the user's behalf
provider.addScope("https://www.googleapis.com/auth/gmail.send");

let cachedAccessToken: string | null = null;

export const signInWithGoogle = async (): Promise<{ user: User; accessToken: string }> => {
  const result = await signInWithPopup(auth, provider);
  const credential = GoogleAuthProvider.credentialFromResult(result);
  if (!credential || !credential.accessToken) {
    throw new Error("No Google Access Token obtained.");
  }
  cachedAccessToken = credential.accessToken;
  return { user: result.user, accessToken: credential.accessToken };
};

export const logoutGoogle = async () => {
  await signOut(auth);
  cachedAccessToken = null;
};

export const getGmailAccessToken = (): string | null => {
  return cachedAccessToken;
};

export const setGmailAccessToken = (token: string | null) => {
  cachedAccessToken = token;
};
