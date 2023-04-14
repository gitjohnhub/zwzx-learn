<template>
  <div>

    <a-steps :current="current">
      <a-step v-for="item in steps" :key="item.title" :title="item.title" />
    </a-steps>

    <div class="steps-action">
      <RouterLink :to="nextPath">
      <a-button v-if="current < steps.length" type="primary" @click="next">下一页</a-button>
    </RouterLink>
      <!-- <a-button
        v-if="current == steps.length - 1"
        type="primary"
        @click="message.success('Processing complete!')"
      >
        Done
      </a-button> -->
      <RouterLink :to="forwardPath">
      <a-button v-if="current > 1" style="margin-left: 8px" @click="prev">上一页</a-button>
      </RouterLink>
    </div>

    <div class="steps-content">
      <RouterView />
      <!-- {{ steps[current].content }} -->
    </div>

  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { message } from 'ant-design-vue';
const nextPath = ref('/Fanben/Shipinxinban/Step-1')
const forwardPath = ref('/Fanben/Shipinxinban/Step-0')
const current = ref<number>(1);
const next = () => {
  console.log(current.value)
  current.value++;
  nextPath.value = `/Fanben/Shipinxinban/Step-${current.value}`
};
const prev = () => {
  current.value--;
  forwardPath.value = `/Fanben/Shipinxinban/Step-${current.value}`

};

const steps = [
        {
          title: 'First',
          content: 'First-content',
        },
        {
          title: 'Second',
          content: 'Second-content',
        },
        {
          title: 'First',
          content: 'First-content',
        },
        {
          title: 'Second',
          content: 'Second-content',
        }
      ]

</script>
<style scoped>
.steps-content {
  /* margin-top: 16px; */
  border: 1px dashed #e9e9e9;
  border-radius: 6px;
  /* background-color: #fafafa; */
  min-height: 200px;
  text-align: center;
  /* padding-top: 80px; */
}

.steps-action {
  margin-top: 24px;
}

[data-theme='dark'] .steps-content {
  background-color: #2f2f2f;
  border: 1px dashed #404040;
}
</style>
