import React from 'react';
import ReactDOM from 'react-dom/client';
// import App from './App.tsx' // หรือ Component หลักเดิมของคุณ
import ServerStatusManager from './src/ServerStatusManager.tsx'; // ⭐️ นำเข้า Component ใหม่ ⭐️
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* ⭐️ รัน ServerStatusManager เป็น Component หลัก ⭐️ */}
    <ServerStatusManager /> 
  </React.StrictMode>,
);
