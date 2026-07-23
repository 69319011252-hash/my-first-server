// 1. เรียกใช้งาน Module ที่ชื่อว่า 'http' ซึ่งเป็นระบบพื้นฐานของ Node.js สำหรับทำเซิร์ฟเวอร์
const http = require('http');

// 2. กำหนดช่องทาง (Port) ที่เซิร์ฟเวอร์จะใช้สื่อสาร โดยให้ใช้ของที่ Cloud กำหนดมา
const port = process.env.PORT || 3000;

// 3. สร้างเครื่องแม่ข่าย (Server) ที่คอยรับคำขอ (req) และตอบกลับ (res)
const server = http.createServer((req, res) => {

  // 3.1 ตั้งรหัสสถานะ 200 หมายถึง "ทำงานสำเร็จ (OK)"
  res.statusCode = 200;

  // 3.2 บอกเบราว์เซอร์ของผู้ใช้ว่า สิ่งที่ส่งกลับไปคือไฟล์ข้อความแบบ HTML
  res.setHeader('Content-Type', 'text/html; charset=utf-8');

  // HTML และ CSS สไตล์ธีมส้มน่ารักสดใส
  const htmlContent = `
  <!DOCTYPE html>
  <html lang="th">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>🍊 Cute Orange Fruits Server 🍊</title>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;700;900&display=swap');
      
      * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
      }

      body {
        background: linear-gradient(135deg, #fff5f0 0%, #ffe4cc 50%, #ffd9b3 100%);
        color: #5a3a2a;
        font-family: 'Noto Sans JP', sans-serif;
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
        overflow: hidden;
        position: relative;
      }

      /* พื้นหลังสีส้มน่ารัก */
      body::before {
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        background-image: 
          radial-gradient(circle, #ff9a56 1px, transparent 1px),
          radial-gradient(circle, #ffb84d 0.5px, transparent 0.5px),
          radial-gradient(circle, #ffc266 0.7px, transparent 0.7px);
        background-size: 200px 200px, 300px 300px, 250px 250px;
        background-position: 0 0, 100px 100px, 50px 75px;
        opacity: 0.15;
        z-index: 1;
        animation: moveStars 30s linear infinite;
      }

      /* พื้นหลังอนิเมชันส้มนุ่ม */
      body::after {
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        background: 
          radial-gradient(ellipse at 20% 50%, rgba(255, 154, 86, 0.2) 0%, transparent 50%),
          radial-gradient(ellipse at 80% 50%, rgba(255, 200, 102, 0.2) 0%, transparent 50%);
        z-index: 0;
        animation: plasmaShift 8s ease-in-out infinite;
      }

      /* คอนเทนเนอร์หลัก */
      .anime-container {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        z-index: 2;
        text-align: center;
        padding: 20px;
        max-width: 900px;
      }

      /* ตัวละครส้ม */
      .anime-character {
        position: relative;
        width: 180px;
        height: 250px;
        margin-bottom: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      /* วงแหวนอนุภาค */
      .particle-ring {
        position: absolute;
        width: 200px;
        height: 200px;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        border: 2px solid transparent;
        border-image: linear-gradient(45deg, #ff9a56, #ffc266, #ffb84d, #ff9a56) 1;
        border-radius: 50%;
        animation: spinRing 4s linear infinite;
      }

      .particle-ring::before {
        content: '';
        position: absolute;
        width: 8px;
        height: 8px;
        background: #ff9a56;
        border-radius: 50%;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        box-shadow: 0 0 15px #ff9a56;
      }

      /* ส้มใหญ่ */
      .orange-main {
        position: relative;
        width: 140px;
        height: 140px;
        background: radial-gradient(circle at 30% 30%, #ffca3a, #ff9a56 40%, #ff7a2e 100%);
        border-radius: 48% 52% 45% 55% / 48% 45% 55% 52%;
        box-shadow: 
          0 15px 35px rgba(255, 154, 86, 0.4),
          inset -10px -10px 20px rgba(0, 0, 0, 0.1),
          inset 8px 8px 15px rgba(255, 255, 255, 0.3);
        animation: orangeBounce 2.5s ease-in-out infinite;
        filter: drop-shadow(0 0 20px rgba(255, 154, 86, 0.3));
      }

      /* ก้านส้ม */
      .orange-stem {
        position: absolute;
        width: 8px;
        height: 30px;
        background: linear-gradient(135deg, #8B6914 0%, #A0821D 100%);
        top: -15px;
        left: 50%;
        transform: translateX(-50%) rotateZ(-15deg);
        border-radius: 4px;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
      }

      /* ใบส้ม */
      .orange-leaf {
        position: absolute;
        width: 50px;
        height: 30px;
        background: linear-gradient(135deg, #2d8e2d 0%, #4caf50 50%, #2d8e2d 100%);
        top: -8px;
        right: -20px;
        border-radius: 50% 0 50% 0 / 0 50% 0 50%;
        transform: rotateZ(25deg);
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
        animation: leafWave 3s ease-in-out infinite;
      }

      /* เงาส้ม */
      .orange-shadow {
        position: absolute;
        width: 100px;
        height: 30px;
        background: radial-gradient(ellipse at center, rgba(255, 154, 86, 0.3) 0%, transparent 70%);
        top: 140px;
        left: 50%;
        transform: translateX(-50%);
        filter: blur(8px);
      }

      /* ผลไม้ตกแต่ง */
      .decoration-fruits {
        position: absolute;
        width: 100%;
        height: 100%;
        pointer-events: none;
      }

      .small-fruit {
        position: absolute;
        border-radius: 50%;
        filter: drop-shadow(0 3px 8px rgba(255, 154, 86, 0.2));
        animation: floatAround 6s ease-in-out infinite;
      }

      .fruit-1 {
        width: 40px;
        height: 40px;
        background: radial-gradient(circle at 30% 30%, #ffdb58, #ffa500, #ff8c00);
        top: -20px;
        left: 20px;
        animation-delay: 0s;
      }

      .fruit-2 {
        width: 35px;
        height: 35px;
        background: radial-gradient(circle at 30% 30%, #ffdb58, #ffa500, #ff8c00);
        bottom: 30px;
        right: -20px;
        animation-delay: 1s;
      }

      .fruit-3 {
        width: 30px;
        height: 30px;
        background: radial-gradient(circle at 30% 30%, #ffdb58, #ffa500, #ff8c00);
        bottom: 50px;
        left: -25px;
        animation-delay: 2s;
      }

      /* การ์ดเนื้อหา */
      .card {
        background: rgba(255, 248, 240, 0.85);
        padding: 50px 60px;
        border-radius: 30px;
        border: 3px solid;
        border-image: linear-gradient(135deg, #ff9a56, #ffcc7a) 1;
        backdrop-filter: blur(20px);
        box-shadow: 
          0 0 40px rgba(255, 154, 86, 0.25),
          0 0 80px rgba(255, 200, 102, 0.15),
          inset 0 0 30px rgba(255, 154, 86, 0.05);
        max-width: 700px;
        position: relative;
        overflow: hidden;
      }

      /* เอฟเฟกต์ shimmer สีส้น */
      .card::before {
        content: '';
        position: absolute;
        top: -50%;
        left: -50%;
        width: 200%;
        height: 200%;
        background: linear-gradient(45deg, 
          transparent 0%, 
          rgba(255, 154, 86, 0.1) 25%, 
          rgba(255, 200, 102, 0.1) 50%, 
          transparent 100%);
        animation: shimmerRotate 3s infinite;
        z-index: -1;
      }

      .card:hover {
        border-image: linear-gradient(135deg, #ff8866, #ffb84d, #ffc266) 1;
        box-shadow: 
          0 0 60px rgba(255, 154, 86, 0.4),
          0 0 100px rgba(255, 200, 102, 0.2),
          inset 0 0 40px rgba(255, 154, 86, 0.1);
        transform: translateY(-10px) scale(1.02);
      }

      h1 {
        font-size: 2.5rem;
        font-weight: 900;
        margin-bottom: 20px;
        background: linear-gradient(135deg, #ff8866 0%, #ffb84d 50%, #ffc266 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        letter-spacing: 2px;
        text-shadow: 0 0 20px rgba(255, 154, 86, 0.3);
        animation: titleGlow 2s ease-in-out infinite;
      }

      h2 {
        font-size: 1.5rem;
        background: linear-gradient(135deg, #ff9a56 0%, #ffcc7a 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        margin: 20px 0 15px;
        font-weight: 700;
      }

      p {
        font-size: 1.1rem;
        font-weight: 400;
        color: #8b5a2b;
        line-height: 1.8;
        letter-spacing: 0.5px;
        margin-bottom: 15px;
      }

      /* สถานะ tag */
      .status-tag {
        display: inline-block;
        margin-top: 30px;
        padding: 12px 32px;
        background: linear-gradient(135deg, rgba(255, 154, 86, 0.2), rgba(255, 200, 102, 0.2));
        border: 2px solid;
        border-image: linear-gradient(135deg, #ff9a56, #ffcc7a) 1;
        color: #ff8866;
        border-radius: 50px;
        font-size: 0.95rem;
        font-weight: 700;
        letter-spacing: 2px;
        text-transform: uppercase;
        transition: all 0.4s ease;
        box-shadow: 0 0 20px rgba(255, 154, 86, 0.3);
        animation: statusPulse 2s ease-in-out infinite;
      }

      .status-tag:hover {
        background: linear-gradient(135deg, rgba(255, 154, 86, 0.4), rgba(255, 200, 102, 0.4));
        box-shadow: 0 0 40px rgba(255, 154, 86, 0.6);
        transform: scale(1.1);
      }

      .dot {
        display: inline-block;
        width: 10px;
        height: 10px;
        background: #ff9a56;
        border-radius: 50%;
        margin-right: 10px;
        animation: dotPulse 1.5s ease-in-out infinite;
        box-shadow: 0 0 10px #ff9a56;
      }

      /* Animations */
      @keyframes moveStars {
        0% {
          background-position: 0 0, 100px 100px, 50px 75px;
        }
        100% {
          background-position: 200px 200px, 300px 300px, 250px 250px;
        }
      }

      @keyframes plasmaShift {
        0% {
          background: 
            radial-gradient(ellipse at 20% 50%, rgba(255, 154, 86, 0.2) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 50%, rgba(255, 200, 102, 0.2) 0%, transparent 50%);
        }
        50% {
          background: 
            radial-gradient(ellipse at 50% 20%, rgba(255, 200, 102, 0.2) 0%, transparent 50%),
            radial-gradient(ellipse at 50% 80%, rgba(255, 154, 86, 0.2) 0%, transparent 50%);
        }
        100% {
          background: 
            radial-gradient(ellipse at 80% 50%, rgba(255, 154, 86, 0.2) 0%, transparent 50%),
            radial-gradient(ellipse at 20% 50%, rgba(255, 200, 102, 0.2) 0%, transparent 50%);
        }
      }

      @keyframes orangeBounce {
        0%, 100% { transform: translateY(0px) scale(1); }
        50% { transform: translateY(-20px) scale(1.05); }
      }

      @keyframes leafWave {
        0%, 100% { transform: rotateZ(25deg); }
        50% { transform: rotateZ(40deg); }
      }

      @keyframes floatAround {
        0% { transform: translate(0, 0) rotate(0deg); opacity: 0.3; }
        25% { opacity: 0.6; }
        50% { transform: translate(30px, -30px) rotate(90deg); opacity: 0.8; }
        75% { opacity: 0.6; }
        100% { transform: translate(0, 0) rotate(360deg); opacity: 0.3; }
      }

      @keyframes spinRing {
        100% { transform: translate(-50%, -50%) rotate(360deg); }
      }

      @keyframes shimmerRotate {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }

      @keyframes titleGlow {
        0%, 100% { text-shadow: 0 0 20px rgba(255, 154, 86, 0.3); }
        50% { text-shadow: 0 0 40px rgba(255, 154, 86, 0.6); }
      }

      @keyframes statusPulse {
        0%, 100% { box-shadow: 0 0 20px rgba(255, 154, 86, 0.3); }
        50% { box-shadow: 0 0 40px rgba(255, 154, 86, 0.6); }
      }

      @keyframes dotPulse {
        0%, 100% { 
          transform: scale(1);
          box-shadow: 0 0 10px #ff9a56;
        }
        50% { 
          transform: scale(1.3);
          box-shadow: 0 0 20px #ff9a56;
        }
      }

      /* Responsive */
      @media (max-width: 768px) {
        h1 {
          font-size: 1.8rem;
        }

        h2 {
          font-size: 1.2rem;
        }

        p {
          font-size: 1rem;
        }

        .card {
          padding: 35px 30px;
          max-width: 90%;
        }

        .anime-character {
          width: 150px;
          height: 200px;
          margin-bottom: 30px;
        }

        .orange-main {
          width: 110px;
          height: 110px;
        }
      }
    </style>
  </head>
  <body>
    <div class="anime-container">
      <div class="anime-character">
        <div class="particle-ring"></div>
        <div class="orange-main">
          <div class="orange-stem"></div>
          <div class="orange-leaf"></div>
        </div>
        <div class="orange-shadow"></div>
        <div class="decoration-fruits">
          <div class="small-fruit fruit-1"></div>
          <div class="small-fruit fruit-2"></div>
          <div class="small-fruit fruit-3"></div>
        </div>
      </div>
      <div class="card">
        <h1>🍊 CUTE ORANGE FRUITS SERVER 🍊</h1>
        <h2>นางสาวกชกร โถชัย | 69319011252</h2>
        <p>🎨 ยินดีต้อนรับสู่เซิร์ฟเวอร์ผลไม้สีส้นน่ารักสดใสเฟี่ยว ๆ!</p>
        <p>✨ เครื่องแม่ข่ายทำงานบนระบบ Railway พร้อมเสิร์ฟความน่ารักสีส้นไปยังคุณ!</p>
        <p>🚀 ระบบเปิดทำงานเต็มพลังพร้อมเอฟเฟกต์อนิเมชันผลไม้สดใส!</p>
        <span class="status-tag"><span class="dot"></span>SYSTEM ONLINE</span>
      </div>
    </div>
  </body>
  </html>
  `;

  // 3.3 ส่งข้อมูลหน้าเว็บกลับไปหาผู้ใช้
  res.end(htmlContent);
});

// 4. สั่งให้เซิร์ฟเวอร์เริ่มต้นเปิดรับฟังการเชื่อมต่อตาม Port ที่กำหนดไว้
server.listen(port, () => {
  console.log(`🍊 Cute Orange Fruits Server is running! เซิร์ฟเวอร์ผลไม้สีส้นเปิดทำงานแล้วที่ช่องทาง: ${port}`);
});
