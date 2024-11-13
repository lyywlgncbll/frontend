<script setup>
import * as mupdf from "mupdf";

let document = new mupdf.Document.openDocument("~/assets/test/test.pdf", "application/pdf");
</script>

<template>
  <p>reader</p>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
