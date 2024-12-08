<template>
  <div class="background">

  </div>
  <div class="pdf-preview">
    <div class="pdf-wrap">
      <vue-pdf-embed 
        class="vue-pdf-embed" 
        :source="state.data" 
        v-for="page in state.numPages" :key="page" 
        :style="state.scale" 
        :page="page" 
        @loaded="afterPDFLoaded"
      />
    </div>
  </div>
  <div class="AI-reading">
    <el-header class="header">
      <!-- <el-icon class="close" @click="showAIReading = false"><Close /></el-icon> -->
    </el-header>
    <el-main class="main">
      <div v-for="QAndA in QAndAList" :key="QAndA.index">
        <el-divider v-if="QAndA.index != 0"/>
        <el-row style="padding-top: 2%;padding-bottom: 2%;">
          <el-col :span="2">

          </el-col>
          <el-col :span="2">
            
          </el-col>
          <el-col :span="18">
            <el-row class="question">
              <div v-html="QAndA.question" class="msg"></div>
            </el-row>
          </el-col>
          <el-col :span="2" class="question">
            <el-icon size="20"><QuestionFilled /></el-icon>
          </el-col>
        </el-row>
        <el-row style="padding-top: 1%;padding-bottom: 1%;">
          <el-col :span="2">
            <el-icon size="20"><ChatDotRound /></el-icon>
          </el-col>
          <el-col :span="18">
            <el-row class="answer">
              <div v-html="QAndA.answer" class="msg"></div>
            </el-row>
          </el-col>
          <el-col :span="2">
            
          </el-col>
          <el-col :span="2">
            
          </el-col>
        </el-row>
        
      </div>
    </el-main>
    <el-footer class="footer">
      <el-row>
        <el-col :span="21">
          <el-input
          v-model="textarea"
          :autosize="{ minRows: 2, maxRows: 4 }"
          type="textarea"
          placeholder="Please input"
          @keypress="handleInput"
          :disabled = isInput
          />
        </el-col>
        <el-col :span="3">
          <el-icon class="middle" color="grey" size="32px" @click="AIReading(), state.data=`test/01.pdf`"><Top /></el-icon>
        </el-col>
      </el-row>
    </el-footer>
  </div>
</template>
<script setup lang="ts">
import axios from "@/utils/axios";
import { reactive, onMounted, computed, onUnmounted, ref, Directive } from "vue";
import VuePdfEmbed from "vue-pdf-embed";
import { createLoadingTask } from "vue3-pdfjs";
import { QIANFAN_ASK, GET_HISTORY_RATE, SEND_HISTORY_RATE, GET_PDF_BINARY } from "@/utils/request"
import { ElNotification } from 'element-plus'
const props = defineProps({
  //for pdf render
  pdfurl:{
  type: String,
  required: true
  }
})
//for pdf render
const state = reactive({
  source: props.pdfurl,
  data: null,
  pageNum: 1,
  scale: 1,
  numPages: 0,
})

var loadedPageNum = 0

onMounted(() => {
  loadedPageNum = 0
  //for pdf render
  console.log(props.pdfurl)
  const url = `https://www.thieme-connect.de/products/ejournals/pdf/10.1055/a-2166-6797.pdf`
  const config = {
    method: 'get',
    url: GET_PDF_BINARY + `?url=${url}`,
    responseType: 'blob',
  }
  axios(config).then((response: any) => {
    // window.atob(response.data)
    const blob = response.data;  // 获取 Blob 数据

    // 创建一个 FileReader 实例
    const reader = new FileReader();

    reader.onloadend = function () {
      const dataUrl = reader.result;  // 获取 Data URL 格式的 Base64 编码数据
      console.log('PDF Data URL:', dataUrl);

      // 将 Data URL 传递给 vue-pdf-embed 组件
      state.data = dataUrl;  // 假设你使用 Vue.js 管理状态
      const loadingTask = createLoadingTask(state.data);
      loadingTask.promise.then((pdf) => {
        state.numPages = pdf.numPages
      })
    };

    // 读取 Blob 数据为 Data URL
    reader.readAsDataURL(blob);
  })
  // state.source = `D:/40995/Documents/课程资料/软分/frontend/dist/test/01.pdf`
  // state.source = url
  // state.source = "test/01.pdf"
  notifyShortcutKey()
  AIconfig.data.sessionId = "1"
  AIconfig.data.question = "下面我将给出一些论文中的内容，请你为我解释它们"
  sendAIReadingRequest(AIconfig)
  window.addEventListener('beforeunload', sendHistoryProgress)
});

onUnmounted(() => {
  // for history progress 
  window.removeEventListener('beforeunload', sendHistoryProgress)
})

const sendHistoryProgress = () => {
  const articleId = "1"
  const rate = calReadingProgressRate()
  const config = {
    method: 'post',
    url: SEND_HISTORY_RATE + `?articleId="${articleId}"&readingProgress=${rate}`
  }
  axios(config).then((response:any) => {
    console.log(response)
  })
  console.log("call send")
}

const isInput = ref(false)

const handleInput = (event : KeyboardEvent) => {
  console.log(event.shiftKey, event.key)
  if (event.shiftKey && event.key === "Enter") {
    event.preventDefault()
    textarea.value += "\n"
    console.log("press shift enter")
  }
  else if (event.key === "Enter") {
    isInput.value = true
    event.preventDefault()
    console.log("press enter")
    AIReading()
  }
}

const AIReading = () => {
  if (textarea.value == null || textarea.value === "") {
    return
  }
  const question = textarea.value
  AIconfig.data.question = question
  AIconfig.data.sessionId = "1"
  sendAIReadingRequest(AIconfig).then((answer : string) => {
      if (answer != null) {
        answer = formatString(answer)
      }
      QAndAList.value.push({
        question: formatString(question),
        answer: answer || "对不起，我暂时无法解释这段文字",
        index: QAndAListIndex++
      })
      isInput.value = false
      console.log(QAndAList.value)
    })
}

const notifyShortcutKey = () => {
  ElNotification({
    title: 'tips',
    message: '欢迎使用AI导读功能'
  })
}

const textarea = ref("")

// for AI reading
const AIconfig = {
  method: 'post',
  url: QIANFAN_ASK,
  data: {
    sessionId: "1",
    question: "",
  },
}
const sendAIReadingRequest = async (config:any) => {
  try {
    console.log("config: ", config)
    const response = await axios(config)
    console.log("response: ", response.data)
    textarea.value = ""
    return response.data
  } catch (error) {
    console.error("error: ", error);
  }
}

interface QAndA {
  question: String
  answer: String
  index: number
}

var QAndAListIndex = 0

const QAndAList = ref<QAndA[]>([
  {
    question: "大段问题大段问题大段问题大段问题大段问题大段问题大段问题大段问题大段问题大段问题大段问题",
    answer: "大段回答大段回答大段回答大段回答大段回答大段回答大段回答大段回答大段回答大段回答大段回答",
    index: QAndAListIndex++
  },
  {
    question: "question",
    answer: "answer",
    index: QAndAListIndex++
  }
])

const formatString = (answer : string) => {
  const boldPattern = /\*\*([^*]+)\*\*/g;
  var formatted = answer.replace(boldPattern, (match, text) => `<b>${text}</b>`);
  formatted = formatted.replace(/\n/g, '<br>');
  return `<p>${formatted}</p>`;
}

// for history progress
const calReadingProgressRate = () => {
  const scrollHeight = document.documentElement.scrollHeight
  const clientHeight = document.documentElement.clientHeight
  const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
  console.log("in cal " + scrollHeight + " " + clientHeight + " " + scrollTop)
  return +(scrollTop/(scrollHeight-clientHeight)).toFixed(2)*100
}

const afterPDFLoaded = () => {// 每加载一个页面就会调用一次该函数😅
  console.log("call load pdf")
  loadedPageNum++
  if (loadedPageNum == state.numPages) {
    setTimeout(() => {//虽然是afterLoaded但仍然不能获取正确的高度😅故增加延时
      scrollTo()
    }, 100)
  }
}

const scrollTo = () => {
  const articleId = "1"
  const config = {
    method: 'post',
    url: GET_HISTORY_RATE + `?articleId="` + articleId + `"`,
  }
  axios(config).then((resopnse:any) => {
    console.log(resopnse)
    const rate = resopnse.data.progress
    const scrollHeight = document.documentElement.scrollHeight
    const clientHeight = document.documentElement.clientHeight
    const top = rate/100*(scrollHeight - clientHeight)
    console.log("in scrollTo " + top + " " + scrollHeight + " " + clientHeight)
    console.log("call function scrollTo")
    if (top != 0) {
      ElNotification({
        title: 'tips',
        message: '已为您跳转至上一次阅读进度'
      })
    }
    window.scrollTo({
        top: top,
        left: 0,
        behavior: 'smooth',
      })
  })
}

</script>

<style lang="css" scoped>
.pdf-preview {
  position: relative;
  height: 100vh;
  /* padding: 20px 0; */
  box-sizing: border-box;
  background: rgb(66，66，66);
}
.vue-pdf-embed {
  text-align: center;
  height: 100%;
  width: 50%;
  border: 1px solid #e5e5e5;
  margin: 0 auto;
  box-sizing: border-box;
}
.pdf-wrap {
  overflow-y: auto;
}
.AI-reading {
  position: fixed;
  z-index: 100;
  top: 0%;
  left: 0%;
  width: 25%;
  height: 100%;
  background-color: rgb(250, 250, 250);
}
.middle {
  left: 50%;
  transform: translateX(-50%);
}
.header {
  height: 0%;
  padding: 0;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.close {
  position: absolute;
  right: calc((3vh - 16px)/2);
}
.main {
  height: calc(100vh - 94px - 16px);
  overflow-y: scroll;
  padding-top: 2.5%;
  padding-bottom: 2.5%;
}
.footer {
  height: 94px;
  padding-bottom: 16px;
  padding-right: 0%;
}
.background {
  position: fixed;
  z-index: 0;
  height: 100%;
  width: 100%;
  background-color: rgb(240, 240, 240);
}
.question {
  display: flex;
  justify-content: flex-end;
}
.msg {
  border: 2px solid grey;
  box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.3);
  border-radius: 5px;
}
</style>