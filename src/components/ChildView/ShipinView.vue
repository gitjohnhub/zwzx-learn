<template>
  <a-card hoverable style="width: 800px">
    <template #cover>
      <!-- 视频预览 -->
      <video ref="videoPlayer" controls width="800" height="400">
        <source :src="videoSource1" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

    </template>
    <template #actions>
      <!-- 视频下载按钮 -->
      <a :href="videoSource1" download="video1.mp4">
        <a-button block type="primary" @click="downloadVideo">下载视频</a-button>
      </a>
    </template>
    <a-card-meta title="法人数字证书扫码签名指导">
    </a-card-meta>
  </a-card>

  <a-card hoverable style="width: 800px">
    <template #cover>
      <!-- 视频预览 -->
      <video ref="videoPlayer" controls width="800" height="400">
        <source :src="videoSource2" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

    </template>
    <template #actions>
      <!-- 视频下载按钮 -->
      <a :href="videoSource2" download="video2.mp4">
        <a-button block type="primary" @click="downloadVideo">下载视频</a-button>
      </a>
    </template>
    <a-card-meta title="电子印章印模上传指导">
    </a-card-meta>
  </a-card>
</template>

<script lang="ts">
export default {
  data() {
    return {
      videoSource1: '/video1.mp4', // 使用public文件夹下的路径
      videoSource2: '/video2.mp4', // 使用public文件夹下的路径
    };
  },
  methods: {
    downloadVideo() {
      // 如果需要执行其他下载操作，可以在这里添加逻辑
    },
  },
};
</script>
