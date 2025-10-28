import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// ⭐️ นำเข้าไฟล์แปลทั้งหมด (Translation files) ⭐️
// โปรดตรวจสอบว่าไฟล์เหล่านี้อยู่ในตำแหน่ง src/locales/[lang]/translation.json
import enTranslation from './locales/en/translation.json';
import thTranslation from './locales/th/translation.json';
import frTranslation from './locales/fr/translation.json'; 
import deTranslation from './locales/de/translation.json'; 
import zhTranslation from './locales/zh/translation.json'; 

const resources = {
  // รหัสภาษา: 'en'
  en: {
    translation: enTranslation
  },
  // รหัสภาษา: 'th' (สำหรับ Thailand)
  th: {
    translation: thTranslation
  },
  // รหัสภาษา: 'fr' (สำหรับ Français)
  fr: {
    translation: frTranslation
  },
  // รหัสภาษา: 'de' (สำหรับ Deutsch)
  de: {
    translation: deTranslation
  },
  // รหัสภาษา: 'zh' (สำหรับ 中文)
  zh: {
    translation: zhTranslation
  }
};

i18n
  .use(LanguageDetector) // ใช้ตัวตรวจจับภาษาของเบราว์เซอร์
  .use(initReactI18next) // เชื่อมต่อกับ React Component
  .init({
    resources, // โหลดไฟล์แปลที่กำหนดไว้
    
    // ⭐️ การตั้งค่าหลัก ⭐️
    fallbackLng: 'en', // ภาษาสำรองหลักเมื่อไม่พบภาษาที่ต้องการ
    debug: false, // ตั้งเป็น true เพื่อดูรายละเอียดการทำงานของ i18n ใน console (แนะนำให้ตั้งเป็น false เมื่อ Production)
    
    // ⭐️ การตั้งค่าตัวตรวจจับภาษา ⭐️
    detection: {
      // ลำดับการตรวจจับภาษา
      order: ['queryString', 'cookie', 'localStorage', 'navigator'],
      // แคชการตั้งค่าภาษาลงใน cookie และ localStorage
      caches: ['cookie', 'localStorage'], 
    },
    
    // ⭐️ การตั้งค่า Interpolation ⭐️
    interpolation: {
      escapeValue: false, // ปลอดภัยสำหรับ React: ไม่ต้องทำการ Escape เพราะ React จัดการอยู่แล้ว
    }
  });

export default i18n;