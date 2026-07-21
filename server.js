// 1. เรียกใช้งาน Module ที่ชื่อว่า 'http' ซึ่งเป็นระบบพื้นฐานของ Node.js สำหรับทำเซิร์ฟเวอร์
const http = require('http');

// 2. กำหนดช่องทาง (Port) ที่เซิร์ฟเวอร์จะใช้สื่อสาร โดยให้ใช้ของที่ Cloud กำหนดมา
const port = process.env.PORT || 3000;

// 3. สร้างเครื่องแม่ข่าย (Server) ที่คอยรับคำขอ (req) และตอบกลับ (res)
const server = http.createServer((req, res) => {

  // 3.1 ตั้งรหัสสถานะ 200 หมายถึง "ทำงานสำเร็จ (OK)"
  res.statusCode = 200;

  // 3.2 บอกเบราว์เซอร์ของผู้ใช้ว่า สิ่งที่ส่งกลับไปคือไฟล์ข้อความแบบ HTML แลัฟระบบ
  res.setHeader('Content-Type', 'text/html; charset=utf-8');

  // HTML และ CSS สไตล์ธีมอนิเมะสุดเท่
  const htmlContent = `
  <!DOCTYPE html>
  <html lang="th">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>⚡ Anime Web Server ⚡</title>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;700;900&display=swap');
      
      * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
      }

      body {
        background: linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%);
        color: #fff;
        font-family: 'Noto Sans JP', sans-serif;
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
        overflow: hidden;
        position: relative;
      }

      /* พื้นหลังอนิเมะกับสตาร์ไอเฟคต์ */
      body::before {
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        background-image: 
          radial-gradient(circle, #ff006e 1px, transparent 1px),
          radial-gradient(circle, #00f5ff 0.5px, transparent 0.5px),
          radial-gradient(circle, #ffbe0b 0.7px, transparent 0.7px);
        background-size: 200px 200px, 300px 300px, 250px 250px;
        background-position: 0 0, 100px 100px, 50px 75px;
        opacity: 0.1;
        z-index: 1;
        animation: moveStars 30s linear infinite;
      }

      /* พื้นหลังอนิเมชันลวกพลาสมา */
      body::after {
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        background: 
          radial-gradient(ellipse at 20% 50%, rgba(255, 0, 110, 0.15) 0%, transparent 50%),
          radial-gradient(ellipse at 80% 50%, rgba(0, 245, 255, 0.15) 0%, transparent 50%);
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

      /* ตัวละครอนิเมะโหลพ้อย */
      .anime-character {
        position: relative;
        width: 180px;
        height: 250px;
        margin-bottom: 40px;
        filter: drop-shadow(0 0 30px rgba(255, 0, 110, 0.5));
      }

      /* หัวตัวละคร */
      .character-head {
        width: 120px;
        height: 140px;
        background: linear-gradient(135deg, #fdbcb4 0%, #f8a69e 100%);
        border-radius: 60% 60% 50% 50%;
        position: relative;
        margin: 0 auto 20px;
        box-shadow: inset -10px -10px 20px rgba(0, 0, 0, 0.1);
        animation: headBob 3s ease-in-out infinite;
      }

      /* ตาประกายวาบ */
      .eye {
        width: 30px;
        height: 40px;
        background: linear-gradient(135deg, #fff 0%, #00f5ff 50%, #fff 100%);
        border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
        position: absolute;
        top: 40px;
        animation: eyeShine 2.5s ease-in-out infinite;
      }

      .eye-left {
        left: 25px;
        animation: eyeShineLeft 2.5s ease-in-out infinite;
      }

      .eye-right {
        right: 25px;
        animation: eyeShineRight 2.5s ease-in-out infinite;
      }

      /* ม่านตา */
      .eye::before {
        content: '';
        position: absolute;
        width: 16px;
        height: 20px;
        background: #000;
        border-radius: 50%;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        animation: pupilSpin 4s linear infinite;
      }

      /* แสงประกาย */
      .eye::after {
        content: '';
        position: absolute;
        width: 10px;
        height: 10px;
        background: radial-gradient(circle at 30% 30%, #fff, transparent);
        border-radius: 50%;
        top: 25%;
        left: 30%;
        animation: shine 2s ease-in-out infinite;
      }

      /* ปากยิ้ม */
      .mouth {
        width: 40px;
        height: 20px;
        background: #ff006e;
        border-radius: 0 0 40px 40px;
        position: absolute;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        animation: mouthSmile 2s ease-in-out infinite;
      }

      /* ตัวอักษร */
      .character-body {
        width: 100px;
        height: 80px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        border-radius: 20% 20% 50% 50%;
        margin: 0 auto;
        position: relative;
        box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
        animation: bodyBounce 2s ease-in-out infinite;
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
        border-image: linear-gradient(45deg, #ff006e, #00f5ff, #ffbe0b, #ff006e) 1;
        border-radius: 50%;
        animation: spinRing 4s linear infinite;
      }

      .particle-ring::before {
        content: '';
        position: absolute;
        width: 8px;
        height: 8px;
        background: #ff006e;
        border-radius: 50%;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        box-shadow: 0 0 15px #ff006e;
      }

      /* การ์ดเนื้อหา */
      .card {
        background: rgba(20, 12, 50, 0.8);
        padding: 50px 60px;
        border-radius: 30px;
        border: 3px solid;
        border-image: linear-gradient(135deg, #ff006e, #00f5ff) 1;
        backdrop-filter: blur(20px);
        box-shadow: 
          0 0 40px rgba(255, 0, 110, 0.3),
          0 0 80px rgba(0, 245, 255, 0.2),
          inset 0 0 30px rgba(255, 0, 110, 0.05);
        max-width: 700px;
        position: relative;
        overflow: hidden;
      }

      /* เอฟเฟกต์ shimmer ไล่สีอนิเมะ */
      .card::before {
        content: '';
        position: absolute;
        top: -50%;
        left: -50%;
        width: 200%;
        height: 200%;
        background: linear-gradient(45deg, 
          transparent 0%, 
          rgba(255, 0, 110, 0.1) 25%, 
          rgba(0, 245, 255, 0.1) 50%, 
          transparent 100%);
        animation: shimmerRotate 3s infinite;
        z-index: -1;
      }

      .card:hover {
        border-image: linear-gradient(135deg, #ffbe0b, #ff006e, #00f5ff) 1;
        box-shadow: 
          0 0 60px rgba(255, 0, 110, 0.5),
          0 0 100px rgba(0, 245, 255, 0.3),
          inset 0 0 40px rgba(255, 0, 110, 0.1);
        transform: translateY(-10px) scale(1.02);
      }

      h1 {
        font-size: 2.5rem;
        font-weight: 900;
        margin-bottom: 20px;
        background: linear-gradient(135deg, #ff006e 0%, #00f5ff 50%, #ffbe0b 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        letter-spacing: 2px;
        text-shadow: 0 0 20px rgba(255, 0, 110, 0.5);
        animation: titleGlow 2s ease-in-out infinite;
      }

      h2 {
        font-size: 1.5rem;
        background: linear-gradient(135deg, #00f5ff 0%, #ffbe0b 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        margin: 20px 0 15px;
        font-weight: 700;
      }

      p {
        font-size: 1.1rem;
        font-weight: 400;
        color: #e0e0ff;
        line-height: 1.8;
        letter-spacing: 0.5px;
        margin-bottom: 15px;
      }

      /* สถานะ tag */
      .status-tag {
        display: inline-block;
        margin-top: 30px;
        padding: 12px 32px;
        background: linear-gradient(135deg, rgba(255, 0, 110, 0.2), rgba(0, 245, 255, 0.2));
        border: 2px solid;
        border-image: linear-gradient(135deg, #ff006e, #00f5ff) 1;
        color: #00f5ff;
        border-radius: 50px;
        font-size: 0.95rem;
        font-weight: 700;
        letter-spacing: 2px;
        text-transform: uppercase;
        transition: all 0.4s ease;
        box-shadow: 0 0 20px rgba(0, 245, 255, 0.3);
        animation: statusPulse 2s ease-in-out infinite;
      }

      .status-tag:hover {
        background: linear-gradient(135deg, rgba(255, 0, 110, 0.4), rgba(0, 245, 255, 0.4));
        box-shadow: 0 0 40px rgba(0, 245, 255, 0.6);
        transform: scale(1.1);
      }

      .dot {
        display: inline-block;
        width: 10px;
        height: 10px;
        background: #00f5ff;
        border-radius: 50%;
        margin-right: 10px;
        animation: dotPulse 1.5s ease-in-out infinite;
        box-shadow: 0 0 10px #00f5ff;
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
            radial-gradient(ellipse at 20% 50%, rgba(255, 0, 110, 0.15) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 50%, rgba(0, 245, 255, 0.15) 0%, transparent 50%);
        }
        50% {
          background: 
            radial-gradient(ellipse at 50% 20%, rgba(0, 245, 255, 0.15) 0%, transparent 50%),
            radial-gradient(ellipse at 50% 80%, rgba(255, 0, 110, 0.15) 0%, transparent 50%);
        }
        100% {
          background: 
            radial-gradient(ellipse at 80% 50%, rgba(255, 0, 110, 0.15) 0%, transparent 50%),
            radial-gradient(ellipse at 20% 50%, rgba(0, 245, 255, 0.15) 0%, transparent 50%);
        }
      }

      @keyframes headBob {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-15px); }
      }

      @keyframes bodyBounce {
        0%, 100% { transform: scaleY(1); }
        50% { transform: scaleY(1.1); }
      }

      @keyframes spinRing {
        100% { transform: translate(-50%, -50%) rotate(360deg); }
      }

      @keyframes shimmerRotate {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }

      @keyframes titleGlow {
        0%, 100% { text-shadow: 0 0 20px rgba(255, 0, 110, 0.5); }
        50% { text-shadow: 0 0 40px rgba(0, 245, 255, 0.8); }
      }

      @keyframes statusPulse {
        0%, 100% { box-shadow: 0 0 20px rgba(0, 245, 255, 0.3); }
        50% { box-shadow: 0 0 40px rgba(0, 245, 255, 0.8); }
      }

      @keyframes dotPulse {
        0%, 100% { 
          transform: scale(1);
          box-shadow: 0 0 10px #00f5ff;
        }
        50% { 
          transform: scale(1.3);
          box-shadow: 0 0 20px #00f5ff;
        }
      }

      @keyframes eyeShineLeft {
        0%, 100% { box-shadow: inset 0 0 15px rgba(0, 245, 255, 0.5); }
        50% { box-shadow: inset 0 0 25px rgba(255, 0, 110, 0.5); }
      }

      @keyframes eyeShineRight {
        0%, 100% { box-shadow: inset 0 0 15px rgba(255, 0, 110, 0.5); }
        50% { box-shadow: inset 0 0 25px rgba(0, 245, 255, 0.5); }
      }

      @keyframes pupilSpin {
        0% { transform: translate(-50%, -50%) rotate(0deg); }
        100% { transform: translate(-50%, -50%) rotate(360deg); }
      }

      @keyframes mouthSmile {
        0%, 100% { transform: translateX(-50%) scaleY(1); }
        50% { transform: translateX(-50%) scaleY(1.2); }
      }

      @keyframes shine {
        0%, 100% { opacity: 1; transform: scale(1); }
        50% { opacity: 0.5; transform: scale(0.8); }
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

        .character-head {
          width: 90px;
          height: 110px;
        }
      }
    </style>
  </head>
  <body>
    <div class="anime-container">
      <div class="anime-character">
        <div class="particle-ring"></div>
        <div class="character-head">
          <div class="eye eye-left"></div>
          <div class="eye eye-right"></div>
          <div class="mouth"></div>
        </div>
        <div class="character-body"></div>
      </div>
      <div class="card">
        <h1>⚡ ANIME SERVER ⚡</h1>
        <h2>นางสาวกชกร โถชัย | 69319011252</h2>
        <p>🎨 ยินดีต้อนรับสู่เซิร์ฟเวอร์อนิเมะสุดเท่ ๆ เฟี่ยว ๆ!</p>
        <p>✨ เครื่องแม่ข่ายทำงานบนระบบ Railway พร้อมเสิร์ฟความสดชื่นอนิเมะไปยังคุณ</p>
        <p>🚀 ระบบเปิดทำงานเต็มพลังพร้อมเอฟเฟกต์อนิเมชันจริงใจ!</p>
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
  console.log(`✨ Anime Server is running! เซิร์ฟเวอร์อนิเมะเปิดทำงานแล้วที่ช่องทาง: ${port}`);
});
