<template>
  <div class="background">
  </div>
  <el-icon size="40" class="ai-button" @click="showAIReading = true; showAIbutton = false;callClick" v-if="showAIbutton && loadStatus === LoadStatus.Success"><ChatDotRound /></el-icon>
  <div class="pdf-preview">
    <div class="pdf-wrap" v-if="loadStatus === LoadStatus.Success">
      <vue-pdf-embed 
        class="vue-pdf-embed" 
        :source="state.data" 
        v-for="page in state.numPages" :key="page" 
        :style="state.scale" 
        :page="page" 
        @loaded="afterPDFLoaded"
      />
    </div>
    <div class="middle loading" v-if="loadStatus === LoadStatus.Failed">
      <p style="font-size: large;">对不起，该链接无法打开</p>
    </div>
    <div class="middle loading" v-if="loadStatus === LoadStatus.Loading">
        <el-icon class="is-loading" size="160px">
          <Loading />
        </el-icon>
    </div>
  </div>
  <div class="AI-reading" v-if="loadStatus === LoadStatus.Success && showAIReading">
    <el-header class="header">
      <el-icon class="close" @click="showAIReading = false; showAIbutton = true"><Close /></el-icon>
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
                <div v-html="QAndA.question" class="msg question_msg"></div>
            </el-row>
          </el-col>
          <el-col :span="2">
            <el-icon size="20" style="float: right; padding-top: 8px;"><QuestionFilled /></el-icon>
          </el-col>
        </el-row>
        <el-row style="padding-top: 1%;padding-bottom: 1%;">
          <el-col :span="2">
            <el-icon size="20" style="padding-top: 8px;"><ChatDotRound /></el-icon>
          </el-col>
          <el-col :span="20">
            <el-row class="answer">
              <div v-html="QAndA.answer" class="msg_no_bgc answer_msg"></div>
            </el-row>
          </el-col>
          <!-- <el-col :span="2">
            
          </el-col> -->
          <el-col :span="2">
            
          </el-col>
        </el-row>
        
      </div>
    </el-main>
      <div class="chat-input-container" ref="textareaContainer">
        <textarea ref="textarea" v-model="message" :disabled = isInput @keypress="handleInput" type="text" class="chat-textarea" placeholder="向“AI助手”发送消息" ></textarea>
        <el-icon color="grey" size="32px" @click="AIReading()" class="up-button"><Top /></el-icon>
      </div>
  </div>
</template>
<script setup lang="ts">
import axios from "@/utils/axios";
import { reactive, onMounted, computed, onUnmounted, ref, Directive } from "vue";
import VuePdfEmbed from "vue-pdf-embed";
import { createLoadingTask } from "vue3-pdfjs";
import { QIANFAN_ASK, GET_HISTORY_RATE, SEND_HISTORY_RATE, GET_PDF_BINARY, ARTICLE_API } from "@/utils/request"
import { ElNotification } from 'element-plus'
import { AxiosError, AxiosResponse } from "axios";
import { marked } from "marked";
import { useStore } from 'vuex';
const props = defineProps({
  //for pdf render
  id:{
  type: String,
  required: true
  }
})
//for pdf render
const state = reactive({
  source: props.id,
  data: "",
  pageNum: 1,
  scale: 1,
  numPages: 0,
})

var loadedPageNum = 0

enum LoadStatus {
  Loading = "Loading",
  Success = "Success",
  Failed = "Failed",
}

const showAIReading = ref(false)
const showAIbutton = ref(true)

const loadStatus = ref<LoadStatus>(LoadStatus.Loading);

onMounted(() => {
  loadedPageNum = 0
  //for pdf render
  const articleId = props.id
  var config = {
    method: 'get',
    url: ARTICLE_API + `?publicationId=${props.id}`
  }
  axios(config).then((response:AxiosResponse) => {
    const url = response.data.pdfurl
    console.log("url: ", url)
    config = {
      method: 'get',
      url: GET_PDF_BINARY + `?url=${url}`,
      responseType: 'blob',
    }
    const storedPdf = localStorage.getItem(url)
    if (storedPdf) {
      console.log("stored")
      
      state.data = storedPdf
      const loadingTask = createLoadingTask(state.data)
      loadingTask.promise.then((pdf) => {
        loadStatus.value = LoadStatus.Success
        state.numPages = pdf.numPages
      })
    } else {
      console.log("not store")
      axios(config).then((response: any) => {
        loadStatus.value = LoadStatus.Success
  
        // window.atob(response.data)
        const blob = response.data;  // 获取 Blob 数据
        console.log(blob)
    
        // 创建一个 FileReader 实例
        const reader = new FileReader();
    
        reader.onloadend = function () {
          const dataUrl = reader.result;  // 获取 Data URL 格式的 Base64 编码数据
          console.log('PDF Data URL:', dataUrl);
    
          // 将 Data URL 传递给 vue-pdf-embed 组件
          state.data = dataUrl;  // 假设你使用 Vue.js 管理状态
          const loadingTask = createLoadingTask(state.data);
  
          // for store
          const base64String = reader.result;
  
          try {
            localStorage.setItem(url, base64String)
          } catch (e) {
            localStorage.clear()
          }
          console.log("store pdf")
  
          loadingTask.promise.then((pdf) => {
            state.numPages = pdf.numPages
          })
        };
    
        // 读取 Blob 数据为 Data URL
        reader.readAsDataURL(blob);
      }).catch((error:AxiosError) => {
        console.log(error)
        loadStatus.value = LoadStatus.Failed
      })
    }
  }).catch(() => {
    loadStatus.value = LoadStatus.Failed;
  })
  // state.data = "test/01.pdf"
  //     const loadingTask = createLoadingTask(state.data)
  //     loadingTask.promise.then((pdf) => {
  //       loadStatus.value = LoadStatus.Success
  //       state.numPages = pdf.numPages
  //     })
  config = {
    method: 'post',
    url: GET_HISTORY_RATE + `?articleId=${props.id}`,
  }
  axios(config).then((response:AxiosResponse) => {
    const config = {
      method: 'post',
      url: SEND_HISTORY_RATE + `?articleId=${articleId}&readingProgress=${response.data.progress}`
    }
    axios(config).then(() => {
    })
  })
  notifyShortcutKey()
  AIconfig.data.sessionId = "1"
  AIconfig.data.question = "下面我将给出一些论文中的内容，请你为我解释它们"
  sendAIReadingRequest(AIconfig)
  window.addEventListener('beforeunload', sendHistoryProgress)
});

onUnmounted(() => {
  // for history progress 
  // sendHistoryProgress()
  window.removeEventListener('beforeunload',sendHistoryProgress)
})

const sendHistoryProgress = (event:BeforeUnloadEvent) => {
  event.preventDefault()
  const articleId = props.id
  const rate = calReadingProgressRate()
  const config = {
    method: 'post',
    url: SEND_HISTORY_RATE + `?articleId=${articleId}&readingProgress=${rate}`
  }
  axios(config).then((response:any) => {
    // console.log(response)
  }).then(() => {
    setTimeout(() => {
      window.close()
    }, 1000)
  })
}

const isInput = ref(false)

const handleInput = (event : KeyboardEvent) => {
  // console.log(event.shiftKey, event.key)
  if (event.shiftKey && event.key === "Enter") {
    event.preventDefault()
    const position = textarea.value?.selectionStart
    console.log(position)
    const input = message.value
    message.value = input.slice(0, position) + '\n' + input.slice(position)
    textarea.value?.focus()
    textarea.value?.setSelectionRange(0, 1, "forward")
    // console.log("press shift enter")
    adjustHeight()
  }
  else if (event.key === "Enter") {
    isInput.value = true
    event.preventDefault()
    // console.log("press enter")
    AIReading()
  } else if (event.key === "Backspace") {
    adjustHeight()
  }
}

const adjustHeight = () => {
  const el = textarea.value;
      if (el) {
        el.scrollTop += 24
        // container.style.height = `${Math.min(el.scrollHeight, maxHeight) + 16}px`
      }
}

const token = localStorage.getItem('authToken')
const AIReading = () => {
  if (message.value == null || message.value === "") {
    return
  }
  const question = message.value
  AIconfig.data.question = question
  AIconfig.data.sessionId = token == null ? "" : token
  // console.log(AIconfig)
  sendAIReadingRequest(AIconfig).then((answer : string) => {
    if (answer != null) {
      // console.log("before parse: ", answer)
      markdownToHtml(answer).then((res) => {
          // console.log("after parse: ", res)
          res = res.replace(/<code(\s+[^>]*)?>/g, `<code style="background-color: #f0f0f0; border-radius: 5px; margin-left: 5px; margin-right: 5px;">`)
          answer = res
          QAndAList.value.push({
            question: `<p>${question.replace(/\n/g, `<br>`)}<p>`,
            answer: answer || "<p>对不起，我暂时无法解释这段文字<p>",
            index: QAndAListIndex++
          })
          isInput.value = false
        })
      }
    })
}

const notifyShortcutKey = () => {
  ElNotification({
    title: 'tips',
    message: '欢迎使用AI导读功能'
  })
}

const message = ref("")
const textarea = ref<HTMLTextAreaElement | null>(null);
const textareaContainer = ref<HTMLTextAreaElement | null>(null);

// for AI reading
const AIconfig = {
  method: 'post',
  url: QIANFAN_ASK,
  data: {
    sessionId: token,
    question: "",
  },
}
const sendAIReadingRequest = async (config:any) => {
  try {
    const response = await axios(config)
    message.value = ""
    return response.data
  } catch (error) {
    // console.error("error: ", error);
  }
}

interface QAndA {
  question: String
  answer: String
  index: number
}

var QAndAListIndex = 0

const QAndAList = ref<QAndA[]>([])

const markdownToHtml = async (answer : string) => {
  const text = await marked.parse(answer)
  // console.log(text)
  return text;
}

const setStyle = (res : string) => {
  
}

// for history progress
const calReadingProgressRate = () => {
  const scrollHeight = document.documentElement.scrollHeight
  const clientHeight = document.documentElement.clientHeight
  const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
  // console.log("in cal " + scrollHeight + " " + clientHeight + " " + scrollTop)
  return +(scrollTop/(scrollHeight-clientHeight)).toFixed(2)*100
}

const afterPDFLoaded = () => {// 每加载一个页面就会调用一次该函数😅
  // console.log("call load pdf")
  loadedPageNum++
  if (loadedPageNum == state.numPages) {
    setTimeout(() => {//虽然是afterLoaded但仍然不能获取正确的高度😅故增加延时
      scrollTo()
    }, 100)
  }
}

const scrollTo = () => {
  const articleId = props.id
  const config = {
    method: 'post',
    url: GET_HISTORY_RATE + `?articleId=` + articleId,
  }
  axios(config).then((resopnse:any) => {
    const rate = resopnse.data.progress
    const scrollHeight = document.documentElement.scrollHeight
    const clientHeight = document.documentElement.clientHeight
    const top = rate/100*(scrollHeight - clientHeight)
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

const callClick = () => {
  console.log("click")
}

</script>

<style lang="css" scoped>
.pdf-preview {
  position: relative;
  height: 100vh;
  /* padding: 20px 0; */
  box-sizing: border-box;
  /* background: rgb(66, 66, 66); */
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
.loading {
  position: absolute;
  z-index: 100;
  left: 50%;
  top: 40%;
  /* transform: translate(-50%); */
}
.AI-reading {
  position: fixed;
  z-index: 50;
  top: 0%;
  left: 0%;
  width: 25%;
  height: 100%;
  background-color: #fff;
}
.middle {
  left: 50%;
  transform: translateX(-50%);
}
.header {
  height: 3%;
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
  height: calc(100vh - 94px - 16px - 16px);
  overflow-y: scroll;
  padding-top: 2.5%;
  padding-bottom: 2.5%;
}
.footer {
  height: 94px;
  padding-bottom: 16px;
  padding-top: 16px;
}
.background {
  position: fixed;
  z-index: 0;
  height: 100%;
  width: 100%;
  background-color: rgb(240, 240, 240);
}
.question {
  max-width: 100%;
  display: flex;
  align-self: flex-end;
  flex-direction: column;
  padding-bottom: 5px;
  border-radius: 5px;
}
.answer {
  
  border-radius: 5px;
}
.msg {
  border-radius: 5px;
  padding-top: 5px;
  padding-bottom: 5px;
  padding-right: 10px;
  padding-left: 10px;
  max-width: 100%;
  overflow-wrap: break-word;
  background-color: #f3f3f3;
}
.msg_no_bgc {
  border-radius: 5px;
  padding-top: 5px;
  padding-bottom: 5px;
  padding-right: 10px;
  padding-left: 10px;
  max-width: 100%;
  overflow-wrap: break-word;
}
.question_msg {
  align-self: flex-end;
  display: flex;
  flex-direction: column;
}
.answer_msg {
  text-align: left;
}

.chat-input-container {
  display: flex;
  align-items: flex-start; /* 保证其他元素对齐 */
  border: 1px solid #ddd;
  border-radius: 20px;
  padding: 8px;
  background-color: #f9f9f9;
  width: calc(100% - 16px);
  box-sizing: border-box;
  position: relative;
  height: auto;
  margin: 8px;
  max-height: 65.33px;
}

.chat-textarea {
  flex: 1;
  border: none;
  outline: none;
  font-size: 16px;
  padding: 0px 10px;
  width: calc(100% - 52px);
  resize: none; /* 禁止用户手动调整大小 */
  background-color: transparent;
  height: auto; /* 初始高度 */
  min-height: 20px;
  position: relative;
}

.up-button {
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
  margin-left: auto;
}

.chat-input-container:hover {
  border-color: #bbb;
}

.ai-button {
  position: fixed; /* 绝对定位 */
  top: 20%; /* 距离父容器顶部20% */
  left: 20%; /* 距离父容器左侧20% */
  width: 40px; /* 设置图标大小 */
  height: 40px;
  z-index: 100;
}

</style>