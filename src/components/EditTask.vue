<template>
    <div class="box col">
        <div class="header">
            <i v-bind:class="{'fas fa-check-circle' : task.completed, 'far fa-check-circle' : !task.completed} "
                @click="$emit('complete-task', task.id)"  ></i>
            <i class="fas fa-minus"
                @click="$emit('task-selected', task.id)"></i>
        </div>
        <input class="text" type="text" name="text" v-model="text">
        <div class="sub-container">
            <div class="task">
                <label for="categories">Category</label>
            </div>
            <select name="categories" id="categories"  v-model="category">
                <option v-for="category in categories" :key="category" :value="category">{{category}}</option>
            </select>
        </div>
        <h3>Set day and time</h3>

    <div>
        <div class="sub-container">
            <label>Day</label>
            <input type="date" v-model="endDay" name="end-date">
        </div>
        <div class="sub-container">
            <label>Time</label>
            <input type="time" v-model="endTime" name="end-time">
        </div>
    </div>
        <p>Created on: {{creationDay}}</p>
        <div class="footer">
            <Button @btn-click="action"
                    :text="task.completed ? 'Restore task' : 'Save Changes'"
                    class="btn"
                    color='#626E60'/>
            <Button @btn-click="$emit('delete-task', task.id)"
                    text="Delete Task"
                    class="btn"
                    color='#Af473C'/>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import Button from './Button.vue'
import { ITask } from '../types/Task.interface';

export default defineComponent({
    name: 'Task',
    components: {
        Button
    },
    props: {
        task: Object as PropType<ITask>,
        categories: Array as PropType<Array<string>>
    },
    data () {
        return {
            text: '',
            category: '',
            endDay: '',
            endTime: '',
            creationDay: '',
        }
    },
    created (): void {
        console.log ('end day init', this.task?.endDate?.toISOString().split('T')[1].slice(0, 5));
        this.text = this.task?.text || '';
        this.category = this.task?.category || '';
        this.endDay = this.task?.endDate?.toISOString().split('T')[0]||'';
        this.endTime = this.task?.endDate?.toString().split(' ')[4].slice(0, 5)||'';
        this.creationDay = this.task?.creationDate.toISOString().split('T')[0]||'';
        console.log(this.task?.creationDate.toISOString());
    },
    methods: {
        action(): void {
            if (this.task?.completed) {
                this.$emit("complete-task", this.task?.id);
            } else {
                this.updateTask();
            }
        },
        updateTask(): void {
            const updatedTask: ITask = {
                id: this.task?.id || 0,
                text: this.text,
                category: this.category,
                creationDate: this.task?.creationDate || new Date(),
                completed: false,
                selected: true
            };
            if (this.endDay !== '' && this.endTime !== '') {
                updatedTask.endDate = new Date(this.endDay + ' ' + this.endTime + ':00');
            } else if (this.endDay !== '') {
                updatedTask.endDate = new Date(this.endDay);
            } else if (this.endTime !== '') {
                updatedTask.endDate = new Date();
                updatedTask.endDate.setHours(parseInt(this.endTime.split(':')[0]), parseInt(this.endTime.split(':')[1]));
            }
            console.log('Updated end time', this.endDay, this.endTime, updatedTask.endDate)
            this.$emit('update-task', updatedTask);
        }
    }

})
</script>

<style scoped>

.col {
    flex-direction: column;
}

.header{
    margin: 10px 0px;
    width: 100%;
    display: flex;
    justify-content: space-between;
}

.footer {
    margin: 10px 0px;
    display: flex;
    justify-content: space-evenly;
}

input,select {
    width:100%;
    height: 40px;
    margin: 5px;
    padding: 3px 7px;
    font-size: 17px;
}

.text {
    width: 80%;
}

p {
    margin-top: 10px;
}
h3 {
    margin: 20px 0px 10px 0px;
}

Button {
    width: 10rem;
}
label {
    width: 30%;
}

</style>