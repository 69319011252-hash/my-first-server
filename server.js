// 1. เรียกใช้งาน Module ที่ชื่อว่า 'http' ซึ่งเป็นระบบพื้นฐานของ Node.js สำหรับทำเซิร์ฟเวอร์
const http = require('http');

// 2. กำหนดช่องทาง (Port) ที่เซิร์ฟเวอร์จะใช้สื่อสาร โดยให้ใช้ของที่ Cloud กำหนดมาให้
const port = process.env.PORT || 3000;

// 3. สร้างเครื่องแม่ข่าย (Server) ที่คอยรับคำขอ (req) และตอบกลับ (res)
const server = http.createServer((req, res) => {

  // 3.1 ตั้งรหัสสถานะ 200 หมายถึง "ทำงานสำเร็จ (OK)"
  res.statusCode = 200;

  // 3.2 บอกเบราว์เซอร์ของผู้ใช้ว่า สิ่งที่ส่งกลับไปคือไฟล์ข้อความแบบ HTML แล้ว
  res.setHeader('Content-Type', 'text/html; charset=utf-8');

  // HTML และ CSS สไตล์ธีมฟ้าน้ำเงินสมัยใหม่
  const htmlContent = `
  <!DOCTYPE html>
  <html lang="th">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Navy Blue Web Server</title>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Anuphan:wght@300;500;700&display=swap');
      
      * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
      }

      body {
        background: linear-gradient(135deg, #0a1929 0%, #132f4c 50%, #1a3a52 100%);
        color: #e3f2fd;
        font-family: 'Anuphan', sans-serif;
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
        overflow: hidden;
        position: relative;
      }

      /* พื้นหลังจำลองอวกาศกับจุดแสงสีฟ้า */
      body::before {
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        background-image: 
          radial-gradient(circle, #64b5f6 1px, transparent 1px),
          radial-gradient(circle, #42a5f5 0.5px, transparent 0.5px);
        background-size: 150px 150px, 250px 250px;
        background-position: 0 0, 50px 50px;
        opacity: 0.15;
        z-index: 1;
        animation: moveStars 20s linear infinite;
      }

      /* ก้อนโมฮกฟ้าสุดท้าง */
      .sphere-container {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        z-index: 2;
        text-align: center;
        padding: 20px;
      }

      .sphere {
        width: 200px;
        height: 200px;
        background: radial-gradient(circle at 30% 30%, #64b5f6, #2196f3, #1565c0);
        border-radius: 50%;
        position: relative;
        box-shadow: 
          0 0 50px 15px rgba(33, 150, 243, 0.3),
          0 0 80px 25px rgba(21, 101, 192, 0.2),
          inset -30px -30px 60px rgba(0, 0, 0, 0.4);
        margin-bottom: 50px;
        animation: float 6s ease-in-out infinite;
      }

      /* วงแหวนล้อมรอบทรงกลม */
      .sphere::before {
        content: '';
        position: absolute;
        top: -20px;
        left: -20px;
        right: -20px;
        bottom: -20px;
        border-radius: 50%;
        border: 3px solid;
        border-image: linear-gradient(45deg, #42a5f5, #1e88e5, #1565c0) 1;
        animation: spin 20s linear infinite;
      }

      /* เอฟเฟกต์ Glow */
      .sphere::after {
        content: '';
        position: absolute;
        top: -30%;
        left: -30%;
        right: -30%;
        bottom: -30%;
        background: radial-gradient(circle at 35% 35%, rgba(100, 181, 246, 0.5), transparent);
        border-radius: 50%;
        filter: blur(20px);
        animation: pulse 4s ease-in-out infinite;
      }

      /* กล่องข้อความ */
      .card {
        background: rgba(13, 27, 42, 0.8);
        padding: 45px 50px;
        border-radius: 25px;
        border: 2px solid rgba(66, 165, 245, 0.3);
        backdrop-filter: blur(15px);
        box-shadow: 
          0 20px 60px rgba(13, 110, 253, 0.15),
          inset 0 1px 0 rgba(255, 255, 255, 0.1);
        max-width: 650px;
        transform: translateY(0);
        transition: all 0.6s ease;
        position: relative;
        overflow: hidden;
      }

      .card::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(100, 181, 246, 0.1), transparent);
        animation: shimmer 3s infinite;
        z-index: -1;
      }

      .card:hover {
        border-color: rgba(66, 165, 245, 0.6);
        box-shadow: 
          0 30px 80px rgba(33, 150, 243, 0.25),
          inset 0 1px 0 rgba(255, 255, 255, 0.15);
        transform: translateY(-5px);
      }

      h1 {
        font-size: 2rem;
        font-weight: 700;
        margin-bottom: 20px;
        background: linear-gradient(135deg, #64b5f6 0%, #42a5f5 50%, #1e88e5 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        letter-spacing: 0.5px;
      }

      p {
        font-size: 1.1rem;
        font-weight: 300;
        color: #b3e5fc;
        line-height: 1.8;
        letter-spacing: 0.3px;
      }

      .status-tag {
        display: inline-block;
        margin-top: 25px;
        padding: 10px 24px;
        background: linear-gradient(135deg, rgba(66, 165, 245, 0.15), rgba(33, 150, 243, 0.1));
        border: 1.5px solid rgba(66, 165, 245, 0.5);
        color: #64b5f6;
        border-radius: 50px;
        font-size: 0.9rem;
        font-weight: 600;
        letter-spacing: 1px;
        text-transform: uppercase;
        transition: all 0.4s ease;
      }

      .status-tag:hover {
        background: linear-gradient(135deg, rgba(66, 165, 245, 0.25), rgba(33, 150, 243, 0.2));
        box-shadow: 0 0 20px rgba(66, 165, 245, 0.4);
        transform: scale(1.05);
      }

      .dot {
        display: inline-block;
        width: 8px;
        height: 8px;
        background: #64b5f6;
        border-radius: 50%;
        margin-right: 8px;
        animation: blink 2s infinite;
      }

      /* Animations */
      @keyframes spin {
        100% {
          transform: rotate(360deg);
        }
      }

      @keyframes float {
        0%, 100% {
          transform: translateY(0px);
        }
        50% {
          transform: translateY(-20px);
        }
      }

      @keyframes pulse {
        0%, 100% {
          opacity: 0.6;
          transform: scale(1);
        }
        50% {
          opacity: 0.8;
          transform: scale(1.1);
        }
      }

      @keyframes moveStars {
        0% {
          background-position: 0 0, 50px 50px;
        }
        100% {
          background-position: 150px 150px, 200px 200px;
        }
      }

      @keyframes blink {
        0%, 49%, 100% {
          opacity: 1;
        }
        50%, 99% {
          opacity: 0.4;
        }
      }

      @keyframes shimmer {
        0% {
          left: -100%;
        }
        100% {
          left: 100%;
        }
      }

      /* Responsive */
      @media (max-width: 768px) {
        h1 {
          font-size: 1.5rem;
        }

        p {
          font-size: 1rem;
        }

        .card {
          padding: 30px 25px;
          max-width: 90%;
        }

        .sphere {
          width: 150px;
          height: 150px;
          margin-bottom: 30px;
        }
      }
    </style>
  </head>
  <body>
    <div class="sphere-container">
      <div class="sphere"></div>
      <div class="card">
        <h1>สวัสดีค่ะ! นี่คือ Web Server ของ<br>[นางสาวกชกร โถชัย 69319011252]</h1>
        <p>เครื่องแม่ข่ายทำงานปกติบนระบบ Railway แล้วเรียบร้อย ยินดีต้อนรับเข้าสู่พื้นที่เซิร์ฟเวอร์ฟ้าน้ำเงิน 🚀</p>
        <span class="status-tag"><span class="dot"></span>ENGINE ONLINE</span>
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
