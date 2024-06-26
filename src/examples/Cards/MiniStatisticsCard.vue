<script setup>
defineProps({
  rowReverse: {
    type: Boolean,
    default: false,
  },
  title: {
    type: [Object, String],
    required: true,
    text: {
      type: String,
    },
    color: {
      type: String,
    },
  },
  description: {
    type: String,
    default: "",
  },
  value: {
    type: [Object, String, Number],
    required: true,
    text: {
      type: [String, Number],
    },
    color: {
      type: String,
    },
  },
  percentage: {
    type: [Object, String],
    value: {
      type: String,
    },
    color: {
      type: String,
    },
    default: () => ({
      color: "success",
    }),
  },
  icon: {
    type: [String, Object],
    component: {
      type: String,
    },
    background: {
      type: String,
    },
    shape: {
      type: String,
    },
    default: () => ({
      background: "bg-white",
      shape: " border-radius-md",
    }),
  },
  classContent: {
    type: String,
    default: "",
  },
});
</script>
<template>
  <div class="mb-3 card">
    <div class="p-3 card-body">
    </div>
  </div>
</template>
