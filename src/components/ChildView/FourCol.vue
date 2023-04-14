<template>
  <a-row style="border-bottom: solid;">
       <a-col :span="6">{{title}}</a-col>
       <a-col :span="6"  class="col_outer"><a-tag color="#f50">{{content }}</a-tag></a-col>
       <a-col :span="6">{{title}}</a-col>
       <a-col :span="6"  class="col_outer"><a-tag color="#f50">{{content }}</a-tag></a-col>
     </a-row>
</template>
<script setup lang="ts">
const props = defineProps({
 title: String,
 content: String
})


</script>