<script setup>
import * as pdfjs from "pdfjs-dist";
const pdfPath = "/src/assets/test/test.pdf"
const loadingTask = pdfjs.getDocument(pdfPath)
loadingTask.promise
  .then(function (doc) {
    const numPages = doc.numPages
    console.log("numPages: " + numPages)
  })

</script>

<template>
  <p>reader</p>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
