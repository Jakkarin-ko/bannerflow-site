import React from 'react';
import { createRoot } from "react-dom/client";
// import App from "./App.tsx"; // ไม่ใช้ App โดยตรงแล้ว
import ServerStatusManager from "./ServerStatusManager.tsx"; // ⭐️ นำเข้า Component สำหรับจัดการสถานะเซิร์ฟเวอร์ ⭐️
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* ⭐️ รัน ServerStatusManager เป็น Component หลัก ⭐️ */}
    <ServerStatusManager />
  </React.StrictMode>
);
