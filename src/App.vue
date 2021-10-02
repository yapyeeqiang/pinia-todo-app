<template>
	<h1>Todo App</h1>
	<form>
		<label for="newTodo">Enter your todo:</label>
		<input
			v-model="store.todoInput.item"
			type="text"
			placeholder="Enter your todo"
		/>
		<button @click.prevent="store.addTodo()">Add Todo</button>

		<select v-model="store.filterTodo" name="filterTodo" id="filterTodo">
			<option value="All">All</option>
			<option value="Completed">Completed</option>
			<option value="Incomplete">Incomplete</option>
		</select>
	</form>

	<ul>
		<li v-for="(todo, index) in store.filteredTodos" :key="index">
			<span
				:class="[todo.completed ? 'completed-todo' : '']"
				class="todo-text"
				>{{ todo.item }}</span
			>
			<button @click="store.completeTodo(index)">
				{{ todo.completed ? 'Undo' : 'Complete' }}
			</button>
		</li>
	</ul>
</template>

<script>
import { useTodo } from './useTodo';
import { onMounted } from 'vue';

export default {
	name: 'todoApp',
	setup() {
		const store = useTodo();

		onMounted(() => {
			store.todos = JSON.parse(localStorage.getItem('todos'));
		});

		return {
			store,
		};
	},
};
</script>

<style scoped>
.todo-text {
	padding-right: 10px;
}

.completed-todo {
	color: green;
	text-decoration: line-through;
}
</style>
