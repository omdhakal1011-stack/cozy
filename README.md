# 🎮 Cozy Gaming Community

A free, full-stack-ish social hub for you and your friends:  
login / real-time chat / blog posts with pics / editable avatars –  
**zero dollars, zero servers, zero backends.**

---

## 🔥 Quick Deploy (GitHub Pages – no install)

1. Fork **or** use this repo as template  
2. Settings → Pages → Source = `main` → Save  
3. Visit `https://&lt;your-username&gt;.github.io/&lt;repo-name&gt;`  
   (buttons only work over https, not file://)

---

## 🔑 Add Firebase (free tier)

1. [Firebase Console](https://console.firebase.google.com) → Create project  
2. Enable **Email/Password** auth + **Realtime Database** (test mode)  
3. Copy `firebaseConfig` → paste into `js/firebase-config.js`  
4. Database → Rules → publish:

```json
{
  "rules": {
    "users": { "$uid": { ".read": "$uid === auth.uid", ".write": "$uid === auth.uid" } },
    "chat": { ".read": true,  ".write": "auth !== null" },
    "blog": { ".read": true,  ".write": "auth !== null" }
  }
}
