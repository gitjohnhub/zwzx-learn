<template>
  <div>
    <!-- 视频预览 -->
    <video ref="videoPlayer" controls width="600" height="400">
      <source :src="videoSource" type="video/mp4">
      Your browser does not support the video tag.
    </video>

    <!-- 视频下载按钮 -->
    <a :href="videoSource" download="video1.mp4">
      <button @click="downloadVideo">下载视频</button>
    </a>
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      videoSource: '/video1.mp4', // 使用public文件夹下的路径
    };
  },
  methods: {
    downloadVideo() {
      // 如果需要执行其他下载操作，可以在这里添加逻辑
    },
  },
};
</script>
