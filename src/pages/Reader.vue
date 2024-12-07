<template>
  <div class="background">

  </div>
  <div class="pdf-preview">
    <div class="pdf-wrap">
      <vue-pdf-embed 
        class="vue-pdf-embed" 
        :source="state.source" 
        v-for="page in state.numPages" :key="page" 
        :style="state.scale" 
        :page="page" 
        @loaded="afterPDFLoaded"
      />
    </div>
  </div>
  <div class="search">
    <el-icon size="32px" @click="AIReading()"><Search /></el-icon>
  </div>
  <div class="AI-reading" v-if="showAIReading">
    <el-header class="header">
      <el-icon class="close" @click="showAIReading = false"><Close /></el-icon>
    </el-header>
    <el-main class="main">
      <div v-for="QAndA in QAndAList" :key="QAndA.index">
        <el-divider v-if="QAndA.index != 0"/>
        <el-row style="padding-top: 1%;padding-bottom: 1%;">
          <el-col :span="2">

          </el-col>
          <el-col :span="2">

          </el-col>
          <el-col :span="18">
            <el-row class="question">
              <p>{{ QAndA.question }}</p>
            </el-row>
          </el-col>
          <el-col :span="2" class="question">
            <el-icon size="24"><QuestionFilled /></el-icon>
          </el-col>
        </el-row>
        <el-row style="padding-top: 1%;padding-bottom: 1%;">
          <el-col :span="2">
            <el-icon size="24"><ChatDotRound /></el-icon>
          </el-col>
          <el-col :span="18">
            <el-row class="answer">
              <div v-html="QAndA.answer"></div>
            </el-row>
          </el-col>
          <el-col :span="2">

          </el-col>
          <el-col :span="2">

          </el-col>
        </el-row>
        
      </div>
    </el-main>
    
  </div>
</template>
<script setup lang="ts">
import axios from "axios";
import { reactive, onMounted, computed, onUnmounted, ref, Directive } from "vue";
import VuePdfEmbed from "vue-pdf-embed";
import { createLoadingTask } from "vue3-pdfjs";
import { QIANFAN_ASK } from "../utils/request"
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
  pageNum: 1,
  scale: 1,
  numPages: 0,
})

var loadedPageNum = 0

onMounted(() => {
  loadedPageNum = 0
  //for pdf render
  console.log(props.pdfurl)
  const url = `https://onlinelibrary.wiley.com/doi/pdfdirect/10.1046/j.1365-2125.2001.01356.x`
  const loadingTask = createLoadingTask(state.source);
  loadingTask.promise.then((pdf) => {
    state.numPages = pdf.numPages
  })
  //for AI reading
  document.addEventListener("keydown", keyboardDownBack, true)
  notifyShortcutKey()
  config.data.sessionId = "1"
  config.data.question = "下面我将给出一些论文中的内容，请你为我解释它们"
  sendAIReadingRequest(config)
});

onUnmounted(() => {
  //for AI reading
  document.removeEventListener("keydown", keyboardDownBack, true)
  // for history progress 
  calReadingProgressRate()
})



// for AI reading
const keyboardDownBack = (evt: KeyboardEvent) => {
  if (evt.shiftKey && evt.ctrlKey && evt.key.toLowerCase() === 'f') {
    evt.preventDefault()
    return AIReading()
  }

  if (evt.shiftKey && evt.ctrlKey && evt.key.toLowerCase() === 'g') {
    evt.preventDefault()
    showAIReading.value = true
  }

}
const showAIReading = ref(true)
const AIReading = () => {
  showAIReading.value = true
  readClipboard()
}

const notifyShortcutKey = () => {
  ElNotification({
    title: 'tips',
    message: '使用ctrl+shift+f使用ai导读功能。网站将读取您的剪切板并进行导读。'
  })
}

//for clipboard
const clipboardContent = ref<string>("")

const readClipboard = async () => {
  try {
    const question = await navigator.clipboard.readText()
    clipboardContent.value = question
    config.data.question = question
    sendAIReadingRequest(config).then((answer : string) => {
      if (answer != null) {
        answer = formatAnswer(answer)
      }
      QAndAList.value.push({
        question: question,
        answer: answer || "对不起，我暂时无法解释这段文字",
        index: QAndAListIndex++
      })
      console.log(QAndAList.value)
    })
    
  } catch (err) {
    console.error("cannot read from clipboard: ", err);
  }
}

// for AI reading
const config = {
  method: 'post',
  url: QIANFAN_ASK,
  data: {
    sessionId: "1",
    question: clipboardContent.value,
  },
}
const sendAIReadingRequest = async (config:any) => {
  try {
    console.log("config: ", config)
    const response = await axios(config)
    console.log("response: ", response.data)
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

const formatAnswer = (answer : string) => {
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
  return +(scrollTop/(scrollHeight-clientHeight)).toFixed(2)*100
}

const afterPDFLoaded = () => {// 每加载一个页面就会调用一次该函数😅
  loadedPageNum++
  if (loadedPageNum == state.numPages) {
    scrollTo()
  }
}

const scrollTo = () => {
  const top = 0
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
.search {
  position: fixed;
  z-index: 100;
  /* background-color: grey; */
  width: 48px;
  height: 48px;
  top: 30%;
  left: 80%;
}
.AI-reading {
  position: fixed;
  z-index: 100;
  top: 10%;
  left: 50%;
  transform: translateX(-50%);
  width: 48%;
  height: 30%;
  background-color: rgb(250, 250, 250);
}
.header {
  height: 10%;
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
  height: 90%;
  overflow-y: scroll;
  padding-top: 0;
  padding-bottom: 5%;
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
</style>