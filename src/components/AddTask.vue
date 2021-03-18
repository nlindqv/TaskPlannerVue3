<template>
    <form @submit="onSubmit" class="add-form">
        <div class="sub-container">
            <div class="form long">
                <label>Task</label>
                <input type="text" name="text" v-model="text" placeholder="Add a new task...">
            </div>
            <div class="form short">
                <div class="add-category">
                    <label for="categories">Category</label>
                    <i @click="addCategory" class="fas fa-plus"></i>
                </div>
                <select name="categories" id="categories"  v-model="category" placeholder="Select a category...">
                    <option v-for="category in categories" :key="category" :value="category">{{category}}</option>
                </select>
            </div>
        </div>
        <div class="sub-container">
            <div class="form long">
                <label>Day</label>
                <input type="date" v-model="endDay" name="end-date">
            </div>
            <div class="form short">
                <label>Time</label>
                <input type="time" v-model="endTime" name="end-time">
            </div>
        </div>
        <input type="submit" value="Save Task" class="btn btn-block" :style="{background: '#626E60'}">
    </form>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { ITask } from '../types/Task.interface';

export default defineComponent({
    name: 'AddTask',
    props: {
        nextTaskID: Number,
        categories: Array as PropType<Array<string>>
    },
    data() {
        return {
            text: '',
            endDay: '',
            endTime: '',
            category: 'Others',
        }
    },
    methods: {
        addCategory(): void {
            const category: string = prompt('Name new category', '') || '';
            if (category === '') {
                return;
            }
            this.$emit('new-category', category);
        },

        onSubmit(e: Event): void {
            e.preventDefault();
            if (!this.text) {
                alert('No task to add');
                return
            }
            /** Create a new task object, add an end-time & end-date if available  */
            const newTask: ITask = {
                id: this.nextTaskID || 0,
                text: this.text,
                creationDate: new Date(),
                completed: false,
                category: this.category,
                selected: false
            }
            if (this.endDay !== '' && this.endTime !== '') {
                newTask.endDate = new Date(this.endDay + ' ' + this.endTime + ':00');
            } else if (this.endDay !== '') {
                newTask.endDate = new Date(this.endDay);
            } else if (this.endTime !== '') {
                newTask.endDate = new Date();
                newTask.endDate.setHours(parseInt(this.endTime.split(':')[0]), parseInt(this.endTime.split(':')[1]));
            }

            this.$emit('addTask', newTask);

            /** Reset parameters */
            this.text = '';
            this.endDay = '';
            this.endTime = '';
            this.category = 'Others';
        }
    }
})
</script>

<style scoped>
.add-form {
    margin-bottom: 40px;
}
.form {
    margin: 10px;
}
.form input,select {
    width: 100%;
    height: 40px;
    margin: 5px;
    padding: 3px 7px;
    font-size: 17px;
}
.form label {
    display: block;
}

.long {
    flex: 2;
}
.short {
    flex: 1;
}
.add-category {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

</style>
