import { defineStore } from 'pinia'

export const useTodo = defineStore('todoStore', {
    state() {
        return {
            todoInput: {
                item: '',
                completed: false,
            },
            todos: [],
            filterTodo: 'All',
        }
    },
    getters: {
        filteredTodos() {
            console.log(this.todos)
            let completedTodos = this.todos.filter((todo) => todo.completed)
            let incompleteTodos = this.todos.filter((todo) => !todo.completed)

            if (this.filterTodo === 'All') return this.todos
            if (this.filterTodo === 'Completed') return completedTodos
            if (this.filterTodo === 'Incomplete') return incompleteTodos
        },
    },
    actions: {
        addTodo() {
            if (!this.todoInput.item) throw new Error('Please enter a todo!')
            this.todos.push(this.todoInput)
            this.todoInput = {
                item: '',
                completed: false,
            }

            this.setLocalTodos()
        },
        completeTodo(index) {
            this.todos[index].completed = !this.todos[index].completed

            this.setLocalTodos()
        },
        setLocalTodos() {
            localStorage.setItem('todos', JSON.stringify(this.todos))
        },
    },
})
