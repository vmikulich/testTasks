<template>
    <div>
        <h1>TODOLIST</h1>
        <div class="app__main-input">
            <div>
                <input @keydown.ENTER="editManager.status ? editTodo() :addTodo()" v-model="text" type="text" class="input">
                <input type="text" class="input inp" v-model="tagList">
            </div>
            <div>
                <button v-if="!editManager.status" @click="addTodo">add todo</button>
                <button v-else @click="editTodo">edit</button>
            </div>
        </div>
        <div class="app__main-input">
            <input v-model="search" type="text" class="input" placeholder="search">
        </div>
        <ul>
            <Todo 
                v-for="(todo, index) in filtredTodos" 
                :content="todo" 
                :key="todo.message"
                @remove-todo="remove(index)"
                @edit-todo="edit">
            </Todo>
        </ul>
    </div>
</template>


<script>

import Todo from "./Todo.vue"
import axios from "axios"

export default {
    name: "Todos",
    components: {
        Todo
    },
    data() {
        return {
            editManager: {
                status: false,
                todo: {
                    message: "",
                    tags: []
                }
            },
            text: "",
            todos: [],
            search: '',
            tagList: ''
        }
    },
    async created() {
        try {
            const res = await axios.get(`http://localhost:3000/todos`);
            this.todos = res.data.map(todo => {
                return {
                    message: todo.message,
                    tags: todo.tags.concat(this.findTags(todo.message))
                }
            });
            console.log(this.todos)
        } catch(e) {
            console.error(e);
        }
    },
    computed: {
        filtredTodos() {
            if (this.search === '') return this.todos;
            return this.todos.filter(item => item.tags.includes(this.search))
                             .slice()
        }
    },
    methods: {
        editTodo() {
            if (this.text) {
                const index = this.todos.findIndex(todo => todo.message === this.editManager.todo.message);
                const todo = {
                        message: this.text,
                        tags: this.workWithTags()
                }
                this.todos.splice(index, 1, todo);
                this.resetData();
            }
        },
        edit(content) {
            this.text = content.message;
            this.tagList = content.tags.join(' ');
            this.editManager.status = true;
            this.editManager.todo = content;
        },
        remove(index) {
            this.todos.splice(index, 1)
        },
        resetData() {
            this.text = "";
            this.tagList = "";
            this.editManager = {
                status: false,
                todo: {
                    message: "",
                    tags: []
                }
            }
        },
        addTodo() {
            if (this.text) {
                const todo = {
                    message: this.text,
                    tags: this.workWithTags()
                }
                this.todos.push(todo);
                this.resetData();
            }
            
        },
        workWithTags() {
            const tagsFromMessage = this.findTags(this.text);
            if ( this.tagList !== '') {
                const tags = this.tagList.split(' ');
                tags.forEach(tag => {
                    if (!tagsFromMessage.includes(tag)) {
                        tagsFromMessage.push(tag);
                    }
                })
            }
            return tagsFromMessage;
        },
        findTags(str) {
            if (!str.match(/#\w+/ig)) return new Array(0);
            return str.match(/#\w+/ig);
        },
        // fetchData() {
            
        // }
    }
}
</script>


<style lang="scss" >
    *,
    *:before,
    *:after {
        margin: 0;
        padding: 0;
    }

    * {
        box-sizing: inherit;
    }

    body {
        box-sizing: border-box
    }

    #app {
        width: 100%;
        max-width: 500px;
        margin: 0 auto;
    }

    h1 {
        margin-bottom: 5px;
    }

    .app__main-input {
        display: flex;
        justify-content: space-between;
        margin-bottom: 10px;
    }

    .input {
        display: block;
        max-width: 100%;
        padding: 2px 10px;
    }

    button {
        padding: 2px 10px;
        background-color: transparent;
        color: #000;
        border: 1px solid #000;
        cursor: pointer;
        transition: all .3s ease;
    }

    button:hover {
        background-color: #000;
        color: #fff
    }
    .inp {
        display: block;
    }
</style>
