// index.tsx

import React from 'react';
import ReactDOM from 'react-dom/client';
// ⭐️ นำเข้า Routes และ Route เพิ่มเติม ⭐️
import { HashRouter, Routes, Route } from 'react-router-dom';
import ServerStatusManager from './ServerStatusManager.tsx';
// ⭐️ ต้องนำเข้า Component ที่เป็นหน้าปลายทาง ⭐️
import QuestionnairePage from './QuestionnairePage.tsx'; 
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HashRouter>
      {/* ⭐️ ใช้ <Routes> เพื่อกำหนดการจับคู่เส้นทาง ⭐️ */}
      <Routes>
        
        {/* Route สำหรับหน้าแรก: https://.../site/#/ */}
        <Route path="/" element={<ServerStatusManager />} />
        
        {/* Route สำหรับหน้า Questionnaire: https://.../site/#/questionnaire */}
        <Route path="/questionnaire" element={<QuestionnairePage />} /> 
        
      </Routes>
    </HashRouter>
  </React.StrictMode>
);
