import { useState, useEffect } from "react";
import HeroCarousel from "./components/HeroCarousel";
import { Loader2, Zap, AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router-dom";

// ⚠️ ต้องสร้างไฟล์ Header.tsx ใน components/ ก่อน จึงจะใช้งานได้
// โค้ดสมมติ: เนื่องจากโค้ดเต็มของ Header ไม่ได้ถูกระบุมา
const Header = () => (
  <header className="fixed top-0 left-0 w-full z-50 bg-gray-800 p-4 shadow-md">
    <h1 className="text-xl font-bold">AI Health Check</h1>
  </header>
);

// ⭐️ กำหนด API Endpoint ⭐️
const API_ENDPOINT = 'https://aidetect-github-io.onrender.com';

type ServerStatus = 'loading' | 'waking' | 'waiting' | 'online' | 'error';

const ServerStatusManager = () => {
  const [status, setStatus] = useState<ServerStatus>('loading');
  const [isOnline, setIsOnline] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    // ฟังก์ชันปลุกเซิร์ฟเวอร์
    const wakeUpServer = async () => {
      setStatus('waking');
      try {
        // ขั้นตอนที่ 1: ส่ง Request ปลุก
        const wakeResponse = await fetch(`${API_ENDPOINT}/api/wakeup`, { method: 'GET' });
        
        if (wakeResponse.ok) {
          console.log("Wake-up call sent. Starting status check...");
          // ถ้าปลุกสำเร็จ ให้เริ่มตรวจสอบสถานะทันที
          checkServerStatus();
        } else {
          setStatus('error');
          console.error('Wake-up failed:', wakeResponse.statusText);
        }
      } catch (error) {
        setStatus('error');
        console.error('Error during wake-up:', error);
      }
    };

    // ฟังก์ชันตรวจสอบสถานะซ้ำๆ
    const checkServerStatus = async () => {
      setStatus('waiting');
      try {
        // ขั้นตอนที่ 2: ตรวจสอบสถานะซ้ำๆ
        const statusResponse = await fetch(`${API_ENDPOINT}/api/status`, { method: 'GET' });
        const data = await statusResponse.json();
        
        if (data.status === 'online') {
          setStatus('online');
          setIsOnline(true);
          console.log("Server is online and model loaded.");
        } else {
          // ถ้ายังไม่ใช่ 'online' ให้รอแล้วตรวจสอบใหม่
          setTimeout(checkServerStatus, 5000); 
          console.log(`Server status: ${data.status}. Retrying in 5s...`);
        }
      } catch (error) {
        // ถ้าเกิด Error (เช่น Connection Refused) ให้ลองตรวจสอบใหม่
        setTimeout(checkServerStatus, 5000); 
        console.error('Error fetching server status, retrying:', error);
      }
    };
    
    // ⭐️ เริ่มต้นด้วยการปลุกเซิร์ฟเวอร์
    wakeUpServer();

    // ไม่ต้องมี cleanup function เพราะเราใช้ setTimeout
  }, []);

  const handleStart = () => {
    if (isOnline) {
      // ⭐️ ใช้ useNavigate เพื่อเปลี่ยนไปยังเส้นทางที่ตั้งค่าใน index.tsx ⭐️
      navigate('/questionnaire');
    } else {
      console.warn("Server not yet online. Cannot start.");
    }
  };

  // 2. Logic สำหรับการแสดงผลสถานะที่ด้านล่างขวา
  const renderStatusIndicator = () => {
    let text = "Connecting...";
    let lightColor = "gray";
    let Icon = Loader2;

    switch (status) {
      case 'loading':
      case 'waking':
        text = "Waking up server...";
        lightColor = "gray";
        Icon = Loader2;
        break;
      case 'waiting':
        text = "Waiting for model to load...";
        lightColor = "orange";
        Icon = Loader2;
        break;
      case 'online':
        text = "Online";
        lightColor = "green";
        Icon = Zap;
        break;
      case 'error':
        text = "Connection Error";
        lightColor = "red";
        Icon = AlertTriangle;
        break;
    }

    return (
      <div 
        style={{
          position: 'fixed', bottom: 20, right: 20, zIndex: 9999, 
          background: 'white', padding: '10px 16px', borderRadius: 10, 
          boxShadow: '0 2px 6px rgba(0,0,0,0.1)', display: isOnline ? 'none' : 'flex', 
          alignItems: 'center', gap: 10
        }}
      >
        <span style={{ color: lightColor }}>
          <Icon className={status === 'waiting' || status === 'waking' ? "animate-spin" : ""} size={18} />
        </span>
        <span style={{ color: lightColor, fontWeight: 'bold' }}>{text}</span>
      </div>
    );
  };

  // 3. แสดง Component หลัก
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      
      {/* ⭐️ Header is FIXED and Z-50 ⭐️ */}
      <Header />

      {/* ⭐️ MAIN CONTENT: บรรทัดนี้คือที่เพิ่ม pt-16 เข้าไป ⭐️ */}
      <main className="relative flex-grow pt-16"> 
        
        {/* HeroCarousel fills the remaining screen space */}
        <HeroCarousel 
          onStartClick={handleStart} // 💡 แก้ไข Prop ให้ใช้ฟังก์ชัน handleStart
          isServerOnline={isOnline} // 💡 แก้ไข Prop ให้ใช้ State isOnline
        />
      </main> {/* 👈 แท็กปิด <main> ที่หายไป ถูกเพิ่มแล้ว */}
      
      {renderStatusIndicator()} {/* 👈 แสดงสถานะ */}
      
    </div> // 👈 แท็กปิด <div> ที่หายไป ถูกเพิ่มแล้ว
  ); // 👈 วงเล็บปิดของ return
};

export default ServerStatusManager;
