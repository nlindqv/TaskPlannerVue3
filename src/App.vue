<template>
<div class="container">
  <Header @toggle-add-task="toggleAddTask"
          title="Task Planner"
          :showAddTask="showAddTask"/>
  <div v-show="showAddTask">
    <AddTask @addTask="addTask"
              @new-category="addCategory"
              :nextTaskID="nextID"
              :categories="categories" />
  </div>
  <Tasks @delete-task="deleteTask"
          @complete-task="completeTask"
          @task-selected="selectTask"
          @update-task="updateTask"
          :tasks="orderArray"
          :categories="categories"/>
</div>

</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Header from './components/Header.vue';
import Tasks from './components/Tasks.vue';
import AddTask from './components/AddTask.vue';
import { ITask } from './types/Task.interface'

export default defineComponent({
  name: 'App',
  components: {
    Header,
    Tasks,
    AddTask
  },
  data() {
      return {
          tasks: [] as ITask[],
          nextID: 5, /** Larger than number of toy-data samples */
          showAddTask: false,
          categories: [] as string[],
      }
  },

  methods: {
    addTask (newTask: ITask): void {
      this.tasks = [...this.tasks, newTask];
      this.nextID++;
    },
    updateTask (updatedTask: ITask): void {
      this.tasks = this.tasks.map((task: ITask): ITask => task.id === updatedTask.id ? updatedTask : task);
    },
    deleteTask(id: number): void {
      if (confirm('Are you sure you want to delete this task?')) {
        this.tasks = this.tasks.filter((task: ITask) => task.id !== id);
      }
    },
    completeTask(id: number): void {
      this.tasks = this.tasks.map((task: ITask): ITask => task.id === id ? {...task, completed: !task.completed} as ITask : task);
    },
    selectTask(id: number): void {
      this.tasks = this.tasks.map((task: ITask): ITask => task.id === id ? {...task, selected: !task.selected} : {...task, selected: false});
    },
    addCategory(newCategory: string): void {
      if (!this.categories.includes(newCategory)){
        this.categories = [...this.categories, newCategory];
      }
    },
    toggleAddTask(): void {
      this.showAddTask = !this.showAddTask;
    }
  },
  computed: {
    /* Sort tasks on endTime and so that completed tasks are prioritized lower */
    orderArray(): ITask[] {
      const compare = (a: ITask, b: ITask): number => {
        if (a.completed && !b.completed) { return 1; }
        if (!a.completed && b.completed) { return -1; }
        if (a.endDate === undefined && b.endDate === undefined) {
          return (a.creationDate < b.creationDate ? -1 : a.creationDate > b.creationDate ? 1 : 0);
        }
        if (a.endDate === undefined) {  return 1; }
        if (b.endDate === undefined) { return -1; }
        return (a.endDate < b.endDate ? -1 : a.endDate > b.endDate ? 1 : 0);
      }
      return [...this.tasks].sort(compare);

    }
  },
  created(): void {
    /** Initialize some toy-data */
    this.tasks = [
      {
        id: 1,
        text: 'Doctors Appointment',
        creationDate: new Date('December 17, 2020 13:24:00'),
        completed: false,
        endDate: new Date('January 1, 2021 12:00:00'),
        category: 'Others',
        selected: false
      } as ITask,
      {
        id: 2,
        text: 'Meeting at School',
        creationDate: new Date('March 12, 2021 13:24:00'),
        completed: false,
        endDate: new Date('March 15, 2021 12:00:00'),
        category: 'School',
        selected: false
      } as ITask,
      {
        id: 3,
        text: 'Food Shopping',
        creationDate: new Date('March 13, 2021 13:24:00'),
        completed: false,
        category: 'Home',
        selected: false
      } as ITask
    ];
  this.categories = ['Home', 'Work', 'School', 'Others']
  },
});
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400&display=swap');
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
body {
  font-family: 'Poppins', sans-serif;
  color: #3c3c3c;
}
.container {
  max-width: 500px;
  margin: 30px auto;
  overflow: auto;
  min-height: 300px;
  border: 1px solid #3c3c3c;
  padding: 30px;
  border-radius: 5px;
}
.sub-container {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
}
.box {
    background: #ececec;
    margin: 5px;
    padding: 5px 20px;
    border-radius: 10px;
    cursor: pointer;

    display: flex;
    align-items: center;
    justify-content: space-between;
}

.btn {
  display: inline-block;
  color: #fff;
  border: none;
  padding: 10px 20px;
  margin: 5px;
  border-radius: 7px;
  cursor: pointer;
  text-decoration: none;
  font-size: 15px;
  font-family: inherit;
}
.btn:focus {
  outline: none;
}
.btn:active {
  transform: scale(0.98);
}
.btn-block {
  display: block;
  width: 100%;
}

i {
    font-size: 1.5rem;
    color: #3c3c3c;;
}
.fas, .far {
  cursor: pointer;
}

</style>
