<template>
    <header>
        <h1>{{title}}</h1>
        <Button @btn-click="$emit('toggle-add-task')" class="btn"
                 :text="showAddTask ? 'Hide' : '+ Add task'"
                 :color="showAddTask ? '#Af473C' : '#626E60'"/>
    </header>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import Button from './Button.vue'

export default defineComponent({
    name: 'Header',
    components: {
        Button,
    },
    props: {
        title: String,
        showAddTask: Boolean,
        categories: Array as PropType<Array<string>>
    },
    methods: {
        openFilter(): void {
            const category: string = prompt('Name new category', '') || '';
            if (category === '') {
                return;
            }
            this.$emit('new-category', category);       
        }
    }
})
</script>

<style scoped>
header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}

h1 {
    width: 53%;
}

Button {
    width: 30%;
}
</style>