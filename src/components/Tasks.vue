<template>
<div>
    <div v-for="task in tasks" :key="task.id">
        <Task v-if="!task.selected"
                    @delete-task="$emit('delete-task', task.id)"
                    @complete-task="$emit('complete-task', task.id)"
                    @task-selected="$emit('task-selected', task.id)"
                    :task="task"/>
        <EditTask v-if="task.selected"
                    @delete-task="$emit('delete-task', task.id)"
                    @complete-task="$emit('complete-task', task.id)"
                    @task-selected="$emit('task-selected', task.id)"
                    @update-task="updateTask"
                    :categories="categories"
                    :task="task"/>
    </div>
</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { ITask } from '../types/Task.interface';
import Task from './Task.vue';
import EditTask from './EditTask.vue';

export default defineComponent({
    name: 'Tasks',
    props: {
        tasks: Array as PropType<Array<ITask>>,
        categories: Array as PropType<Array<string>>
    },
    components: {
        Task,
        EditTask
    },
    methods: {
        updateTask(updatedTask: ITask): void {
            this.$emit('update-task', updatedTask)
        }
    },
    emits: ['complete-task', 'delete-task', 'task-selected', 'update-task']
})
</script>