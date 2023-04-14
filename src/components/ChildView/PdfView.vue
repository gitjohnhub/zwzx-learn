<template>
  <a-button @click="changeURL">食品新办</a-button>
  <a-button @click="changeURL">食品变更</a-button>
  <PdfApp style="height: 90vh;width: 100vh;" :pdf="pdfurl"></PdfApp>
</template>
<script lang="ts" setup>
import PdfApp from "vue3-pdf-app";
import "vue3-pdf-app/dist/icons/main.css";
import { ref } from "vue";
const pdfurl = ref('/shipin_xinban.pdf')
const changeURL = ()=>{
  pdfurl.value =  pdfurl.value =='/shipin_biangeng.pdf'?'/shipin_xinban.pdf':'/shipin_biangeng.pdf'
}
</script>
