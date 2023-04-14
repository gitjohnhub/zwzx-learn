<template>
  <PdfApp style="height: 90vh" pdf="/shipin_xinban.pdf"></PdfApp>
</template>
<script lang="ts">
import PdfApp from "vue3-pdf-app";
import "vue3-pdf-app/dist/icons/main.css";
export default {
  name: "App",
  components: {
    PdfApp,
  },
};
</script>
