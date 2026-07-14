// 1. เรียกใช้งาน Module ที่ชื่อว่า 'http' ซึ่งเป็นระบบพื้นฐานของ Node.js สําหรับทําเซิรฟ์ เวอร์
const http = require('http');

// 2. 🎛️ กําหนดชองทาง (Port) ที่เซิร์ฟเวอร์จะใช้สื่อสาร โดยให้ใช้ของที่ Cloud กําหนดมา (process.env.PORT) ถ้าไม่มีให้ใช้ 3000
const port = process.env.PORT || 3000;

// 3. สร้างเครื่องแม่ข่าย (Server) ที่คอยรับคําขอ (req) และตอบกลับ (res)
const server = http.createServer((req, res) => {

  // 3.1 ตั้งรหัสสถานะ 200 หมายถึง "ทํางานสําเร็จ (OK)"
  res.statusCode = 200;

  // 3.2 บอกเบราว์เซอร์ของผู้ใช้ว่า สิ่งที่ส่งกลับไปคือไฟล์ข้อความแบบ HTML และรองรับภาษาไทย (utf-8)
  res.setHeader('Content-Type', 'text/html; charset=utf-8');

  // HTML และ CSS สไตล์ธีมดวงดาว (Starry Planet Theme)
  const htmlContent = `
  <!DOCTYPE html>
  <html lang="th">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Starry Night Web Server</title>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Anuphan:wght@300;500;700&display=swap');
      
      * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
      }

      body {
        background: radial-gradient(circle at center, #0f172a 0%, #020617 100%);
        color: #f8fafc;
        font-family: 'Anuphan', sans-serif;
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
        overflow: hidden;
        position: relative;
      }

      /* แสงเนบิวลาและดวงดาวระยิบระยับ */
      body::before {
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        background-image: 
          radial-gradient(white, rgba(255,255,255,.3) 1.5px, transparent 30px),
          radial-gradient(white, rgba(255,255,255,.2) 1px, transparent 40px),
          radial-gradient(circle at 20% 30%, rgba(56, 189, 248, 0.15) 0%, transparent 40%),
          radial-gradient(circle at 80% 70%, rgba(192, 132, 252, 0.15) 0%, transparent 40%);
        background-size: 400px 400px, 250px 250px, 100% 100%, 100% 100%;
        background-position: 0 0, 50px 50px, 0 0, 0 0;
        animation: twinkle 6s ease-in-out infinite alternate;
        z-index: 1;
      }

      .space-container {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        z-index: 2;
        text-align: center;
        padding: 20px;
      }

      /* โมเดลดวงดาวเคราะห์เรืองแสง */
      .planet {
        width: 130px;
        height: 130px;
        background: radial-gradient(circle at 30% 30%, #38bdf8 0%, #0369a1 70%, #0c4a6e 100%);
        border-radius: 50%;
        position: relative;
        box-shadow: 
          inset -10px -10px 30px rgba(0,0,0,0.7),
          0 0 40px rgba(56, 189, 248, 0.6);
        margin-bottom: 50px;
        animation: float 4s ease-in-out infinite alternate;
      }

      /* วงแหวนดาวเคราะห์ (Planet Ring) */
      .planet::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 240px;
        height: 40px;
        border: 8px solid rgba(125, 211, 252, 0.6);
        border-top-color: transparent;
        border-radius: 50%;
        transform: translate(-50%, -50%) rotate(-15deg);
        box-shadow: 0 5px 15px rgba(56, 189, 248, 0.3);
        filter: blur(1px);
      }

      /* กล่องข้อความสไตล์กระจกใส (Glassmorphism) */
      .card {
        background: rgba(15, 23, 42, 0.65);
        padding: 35px 45px;
        border-radius: 24px;
        border: 1px solid rgba(56, 189, 248, 0.2);
        backdrop-filter: blur(16px);
        box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
        max-width: 550px;
        transition: all 0.4s ease;
      }

      .card:hover {
        border-color: rgba(192, 132, 252, 0.4);
        box-shadow: 0 25px 60px rgba(192, 132, 252, 0.15);
        transform: translateY(-2px);
      }

      h1 {
        font-size: 1.75rem;
        font-weight: 700;
        margin-bottom: 15px;
        background: linear-gradient(135deg, #bae6fd, #e0f2fe, #c084fc);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        line-height: 1.4;
      }

      p {
        font-size: 1.05rem;
        font-weight: 300;
        color: #94a3b8;
        line-height: 1.6;
      }

      .status-tag {
        display: inline-block;
        margin-top: 25px;
        padding: 6px 18px;
        background: rgba(56, 189, 248, 0.1);
        border: 1px solid rgba(56, 189, 248, 0.3);
        color: #38bdf8;
        border-radius: 50px;
        font-size: 0.85rem;
        font-weight: 500;
        letter-spacing: 1px;
        animation: pulse 2s infinite alternate;
      }

      /* Animations */
      @keyframes float {
        0% {
          transform: translateY(0) rotate(0deg);
        }
        100% {
          transform: translateY(-12px) rotate(5deg);
        }
      }

      @keyframes twinkle {
        0% { opacity: 0.7; }
        100% { opacity: 1; }
      }

      @keyframes pulse {
        0% { box-shadow: 0 0 0 0 rgba(56, 189, 248, 0.4); }
        100%
