<template>
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
  <div class="AI-reading" v-if="showAIReading">
    <el-input
    v-model="clipboardContent"
    style="width: 100%"
    :autosize="{ minRows: 2, maxRows: 6 }"
    type="textarea"
    placeholder="Please input"
    suffix-icon="Search"
    />
  </div>
</template>
<script setup lang="ts">
import axios from "axios";
import { reactive, onMounted, computed, onUnmounted, ref } from "vue";
import VuePdfEmbed from "vue-pdf-embed";
import { createLoadingTask } from "vue3-pdfjs";
import { QIANFAN_ASKONCE } from "../utils/request"
const props = defineProps({
  //for pdf render
  pdfurl:{
  type: String,
  required: true
  }
})
//for pdf render
const state = reactive({
  source: "/test/test.pdf",
  pageNum: 1,
  scale: 1,
  numPages: 0,
})

onMounted(() => {
  //for pdf render
  const loadingTask = createLoadingTask(state.source);
  loadingTask.promise.then((pdf) => {
    state.numPages = pdf.numPages
    
  })
  //for AI reading
  document.addEventListener("keydown", keyboardDownBack, true)
  
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
    console.log(calReadingProgressRate())
    // return calReadingProgressRate()
    // scrollTo()
  }

}
const showAIReading = ref(false)
const AIReading = () => {
  // console.log("press ctrl f")
  showAIReading.value = true
  // console.log("showAiReading: ", showAIReading)
  readClipboard()
}

//for clipboard
const clipboardContent = ref<string>("")

const readClipboard = async () => {
  try {
    const text = await navigator.clipboard.readText()
    clipboardContent.value = text
    config.data.question = text
    sendAIReadingRequest(config)
  } catch (err) {
    console.error("cannot read from clipboard: ", err);
  }
}

// for AI reading
const config = {
  method: 'post',
  url: QIANFAN_ASKONCE,
  data: {
    question: clipboardContent.value,
  },
}
const sendAIReadingRequest = async (config:any) => {
  try {
    console.log("config: ", config)
    const response = await axios(config)
    console.log("response: ", response.data)
  } catch (error) {
    console.error("error: ", error);
  }
}

// for history progress
const calReadingProgressRate = () => {
  // const readProInner = document.querySelector('.pdf-preview')
  const scrollHeight = document.documentElement.scrollHeight
  const clientHeight = document.documentElement.clientHeight
  const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
  // console.log(scrollTop, scrollHeight, clientHeight)
  return +(scrollTop/(scrollHeight-clientHeight)).toFixed(2)*100
}

const afterPDFLoaded = () => {
  scrollTo()
}

const scrollTo = () => {
  window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    })
}

</script>
<style lang="css" scoped>
.pdf-preview {
  position: relative;
  height: 100vh;
  padding: 20px 0;
  box-sizing: border-box;
  background: rgb(66，66，66);
}
.vue-pdf-embed {
  text-align: center;
  height: 100%;
  width: 100%;
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
  top: 10%;
  left: 50%;
  transform: translateX(-50%);
  width: 40%;
}

</style>