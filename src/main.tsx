import React from 'react'; // ต้อง Import React เพื่อใช้งาน <React.StrictMode>
import { createRoot } from "react-dom/client";
// import App from "./App.tsx"; // ไม่ใช้ App โดยตรงแล้ว
import ServerStatusManager from "./ServerStatusManager.tsx"; // ⭐️ นำเข้า Component สำหรับจัดการสถานะเซิร์ฟเวอร์ ⭐️
import "./index.css";

// ใช้ createRoot ในการ Mount Component หลัก
createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ServerStatusManager />
  </React.StrictMode>
);
