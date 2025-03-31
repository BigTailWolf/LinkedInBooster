const fs = require('fs');
const path = require('path');
const { createCanvas, loadImage } = require('canvas');

async function generateIcons() {
  // 读取原始图标
  const originalIcon = await loadImage(path.join(__dirname, '../icons/icon16.png'));
  
  // 创建不同尺寸的图标
  const sizes = [48, 128];
  
  for (const size of sizes) {
    const canvas = createCanvas(size, size);
    const ctx = canvas.getContext('2d');
    
    // 绘制原始图标并缩放到目标尺寸
    ctx.drawImage(originalIcon, 0, 0, size, size);
    
    // 保存为 PNG
    const buffer = canvas.toBuffer('image/png');
    fs.writeFileSync(path.join(__dirname, '../icons', `icon${size}.png`), buffer);
  }
}

generateIcons().catch(console.error); 