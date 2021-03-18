<template>
    <div class="box" >
        <i @click="$emit('complete-task', id)"
            v-bind:class="{'fas fa-check-circle' : task.completed, 'far fa-circle' : !task.completed}"></i>
        <div :class="[task.completed ? 'complete' : '', 'text']" @click="$emit('task-selected', task.id)">
            <h3>{{task.text}}</h3>
            <div >
                <p class="category-date">{{task.category}} - {{parseDate}}</p>
            </div>
        </div>
  
        <i @click="$emit('delete-task', id)"
            class="fas fa-times" v-show="task.completed"></i>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { ITask } from '../types/Task.interface';

export default defineComponent({
    name: 'Task',
    props: {
        task: Object as PropType<ITask>
    },
    computed: {
        parseDate(): string {
            const dateTime = this.task?.endDate?.toISOString().split('T')[1].slice(0, 5) || '';
            const dateDay = this.task?.endDate?.toString().split(' ').slice(1, 4).join(' ') || '';
            if (dateTime === '' && dateDay === '') { return ''; }
            return (dateTime + ', ' + dateDay);
        }
    }
})
</script>

<style scoped>
.text {
    width: 100%;
    padding: 0px 20px;
    display: flex;
    flex-direction: column;
    align-content: flex-start;
}

.complete {
    color:rgb(136, 136, 136);
    text-decoration: line-through;
}
.category-date {
    display: inline;
}
</style>