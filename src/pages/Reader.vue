<script setup>
import * as pdfjs from "pdfjs-dist";
pdfjs.GlobalWorkerOptions.workerSrc = './public/pdf.worker.mjs'
const pdfPath = '/test/test.pdf'
const loadingTask = pdfjs.getDocument(pdfPath)
loadingTask.promise
  .then(function (pdf) {
    console.log("success loaded pdf")
    var pageNumber = 1
    pdf.getPage(pageNumber).then(function (page) {
      console.log("success loaded page")
      

      var viewport = page.getViewport({scale: 1})
      var scale = window.innerHeight/viewport.height
      console.log("scale: ", scale)
      viewport = page.getViewport({scale: scale})

      var canvas = document.getElementById("testCanvas")
      var context = canvas.getContext('2d')
      // console.log(viewport.height, window.innerHeight)
      canvas.height = viewport.height
      canvas.width = viewport.width

      page.render({
        canvasContext: context,
        viewport: viewport,
      }).promise.then(function () {
        console.log('success rendered page')
      })
    })
  })

</script>

<template>
  <div id="pdfView">
    <canvas id="testCanvas"></canvas>
  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
#pdfView {
  position: relative;
}
#testCanvas {
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0);
}
</style>
