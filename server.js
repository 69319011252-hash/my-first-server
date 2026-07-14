// 1. เรียกใช้งาน Module ที่ชื่อว่า 'http' ซึ่งเป็นระบบพื้นฐานของ Node.js สำหรับทำเซิร์ฟเวอร์
const http = require('http');

// 2. กำหนดช่องทาง (Port) ที่เซิร์ฟเวอร์จะใช้สื่อสาร โดยให้ใช้ของที่ Cloud กำหนดมา (process.env.PORT) ถ้าไม่มีให้ใช้ 3000
const port = process.env.PORT || 3000;

// 3. สร้างเครื่องแม่ข่าย (Server) ที่คอยรับคำขอ (req) และตอบกลับ (res)
const server = http.createServer((req, res) => {

  // 3.1 ตั้งรหัสสถานะ 200 หมายถึง "ทำงานสำเร็จ (OK)"
  res.statusCode = 200;

  // 3.2 บอกเบราว์เซอร์ของผู้ใช้ว่า สิ่งที่ส่งกลับไปคือไฟล์ข้อความแบบ HTML และรองรับภาษาไทย (utf-8)
  res.setHeader('Content-Type', 'text/html; charset=utf-8');

  // HTML และ CSS สไตล์ธีมหลุมดำ (Black Hole)
  const htmlContent = `
  <!DOCTYPE html>
  <html lang="th">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Black Hole Web Server</title>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Anuphan:wght@300;500;700&display=swap');
      
      * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
      }

      body {
        background-color: #020205;
        color: #f0f0f5;
        font-family: 'Anuphan', sans-serif;
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
        overflow: hidden;
        position: relative;
      }

      /* พื้นหลังจำลองอวกาศและดวงดาว */
      body::before {
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        background-image: 
          radial-gradient(white, rgba(255,255,255,.2) 2px, transparent 40px),
          radial-gradient(white, rgba(255,255,255,.15) 1px, transparent 30px);
        background-size: 550px 550px, 350px 350px;
        background-position: 0 0, 40px 60px;
        opacity: 0.4;
        z-index: 1;
      }

      /* ตัวจำลองหลุมดำ */
      .blackhole-container {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        z-index: 2;
        text-align: center;
        padding: 20px;
      }

      .blackhole {
        width: 180px;
        height: 180px;
        background: #000;
        border-radius: 50%;
        position: relative;
        box-shadow: 
          0 0 40px 10px #000, 
          0 0 60px 20px #ff5e00, 
          0 0 100px 30px #8b00ff;
        margin-bottom: 40px;
        animation: pull 4s ease-in-out infinite alternate;
      }

      /* วงแหวนล้อมรอบหลุมดำ (Accretion Disk) */
      .blackhole::after {
        content: '';
        position: absolute;
        top: -15%;
        left: -15%;
        right: -15%;
        bottom: -15%;
        border-radius: 50%;
        border: 4px double transparent;
        background-image: linear-gradient(#000, #000), radial-gradient(circle at center, #ff8c00, #8b00ff, transparent);
        background-origin: border-box;
        background-clip: content-box, border-box;
        animation: spin 15s linear infinite;
        opacity: 0.8;
      }

      /* กล่องข้อความ */
      .card {
        background: rgba(10, 10, 25, 0.75);
        padding: 30px 40px;
        border-radius: 20px;
        border: 1px solid rgba(255, 94, 0, 0.2);
        backdrop-filter: blur(12px);
        box-shadow: 0 20px 50px rgba(0, 0, 0, 0.8);
        max-width: 600px;
        transform: translateY(0);
        transition: all 0.5s ease;
      }

      .card:hover {
        border-color: rgba(139, 0, 255, 0.4);
        box-shadow: 0 20px 60px rgba(139, 0, 255, 0.15);
      }

      h1 {
        font-size: 1.8rem;
        font-weight: 700;
        margin-bottom: 15px;
        background: linear-gradient(45deg, #ff8c00, #e0aaff, #8b00ff);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }

      p {
        font-size: 1.05rem;
        font-weight: 300;
        color: #b0b0c5;
        line-height: 1.6;
      }

      .status-tag {
        display: inline-block;
        margin-top: 20px;
        padding: 6px 16px;
        background: rgba(0, 255, 136, 0.1);
        border: 1px solid rgba(0, 255, 136, 0.3);
        color: #00ff88;
        border-radius: 50px;
        font-size: 0.85rem;
        font-weight: 500;
        letter-spacing: 0.5px;
      }

      /* Animations */
      @keyframes spin {
        100% {
          transform: rotate(360deg);
        }
      }

      @keyframes pull {
        0% {
          transform: scale(1);
          box-shadow: 0 0 40px 10px #000, 0 0 60px 20px #ff5e00, 0 0 100px 30px #8b00ff;
        }
        100% {
          transform: scale(1.05);
          box-shadow: 0 0 40px 10px #000, 0 0 80px 30px #ff8c00, 0 0 120px 45px #8b00ff;
        }
      }
    </style>
  </head>
  <body>
    <div class="blackhole-container">
      <div class="blackhole"></div>
      <div class="card">
        <h1>สวัสดีค่ะ! นี่คือ Web Server ของ<br>[นางสาวกชกร โถชัย 69319011252]</h1>
        <p>เครื่องแม่ข่ายทำงานปกติบนระบบ Railway แล้วเรียบร้อย ยินดีต้อนรับเข้าสู่ขอบฟ้าเหตุการณ์ (Event Horizon) ครับผม!</p>
        <span class="status-tag">● ENGINE ONLINE</span>
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
  console.log(`Server is running! เครื่องแม่ข่ายเปิดทำงานแล้วที่ช่องทาง: ${port}`);
});
