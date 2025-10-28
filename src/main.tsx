import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom'; // ✅ เพิ่ม BrowserRouter
import ServerStatusManager from './ServerStatusManager.tsx'; // ⭐️ นำเข้า Component ใหม่
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* ✅ ครอบด้วย BrowserRouter เพื่อให้ <Link> ทำงานได้ */}
    <BrowserRouter>
      <ServerStatusManager /> 
    </BrowserRouter>
  </React.StrictMode>
);
