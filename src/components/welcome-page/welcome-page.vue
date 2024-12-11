<template>
  <div>
    <h1>图片转字符</h1>
    <div class="char-display" ref="charDisplay">
      <!-- 用v-html将文本直接插入页面 -->
      <pre v-html="charText"></pre>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      chars: [' ', 'B', 'C'], // 字符集: 空白, B, C
      canvasWidth: 300, // 画布宽度
      canvasHeight: 300, // 画布高度
      charText: '', // 用来存储字符图形的文本
    };
  },
  mounted() {
    this.drawImageAsText();
  },
  methods: {
    // 将图片转换为字符并展示
    drawImageAsText() {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const image = new Image();
      image.src = '/src/assets/logoTest.png'; // 图片路径

      image.onload = () => {
        // 动态设置画布的宽度和高度为图片的实际尺寸
        canvas.width = image.width;
        canvas.height = image.height;

        // 将图片绘制到画布上
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

        // 获取图片数据
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;

        // 将字符图构建为字符串
        let result = '';
        const blockSizeX = 8; // 每个字符的宽度
        const blockSizeY = 16; // 每个字符的高度（加大高度，确保字符不拉伸）

        // 遍历每个像素，按照每个blockSize进行分块
        for (let y = 0; y < canvas.height; y += blockSizeY) {
          let row = '';
          for (let x = 0; x < canvas.width; x += blockSizeX) {
            const i = (y * canvas.width + x) * 4;
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];
            const a = data[i + 3]; // 获取透明度值
            const gray = Math.floor((r + g + b) / 3); // 计算灰度值

            if (a === 0) {
              // 如果是完全透明，选择空白字符
              row += '-';
            } else if (gray === 0) {
              // 如果是黑色部分，随机选择 C 或 B
              row += Math.random() < 0.5 ? 'C' : 'B';
            } else {
              // 对于其他颜色，按灰度值选择字符
              let charIndex = 0;
              if (gray > 127) {
                charIndex = 2; // 灰度值较高，选择 'C'
              } else if (gray > 63) {
                charIndex = 1; // 灰度值中等，选择 'B'
              }
              row += this.chars[charIndex]; // 选择字符
            }
          }
          result += row + '\n'; // 每行字符后换行
        }

        // 将结果渲染到页面
        this.charText = result; // 更新字符内容
      };
    },
  },
};
</script>

<style scoped>
h1 {
  text-align: center;
  margin-bottom: 20px;
}

.char-display {
  font-family: monospace;
  white-space: pre-wrap;
  word-break: break-word;
  text-align: center;
  margin-top: 20px;
  font-size: 10px;
  line-height: 1em; /* 设置行高，确保字符不垂直拉伸 */
}

.char-display pre {
  margin: 0;
}

.char-display span {
  display: inline-block;
  transition: transform 0.3s ease-in-out;
}

.char-display span:hover {
  transform: translateY(-5px); /* 鼠标悬停时向上浮动 */
}
</style>
