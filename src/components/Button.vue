<template>
    <button @click="$emit('btn-click')" :style="{background: color}">{{text}}</button>
</template>

<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
    name: 'Button',
    props: {
        text: String,
        color: String
    }
})
</script>
