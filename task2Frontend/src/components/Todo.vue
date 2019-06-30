<template>
    <div class="todo-container">
        <div class="btns">
            <button class="edit" @click="edit">&#9998;</button>
            <button class="deleteTodo" @click="remove">&times;</button>
        </div>
        <div class="todo-content">
            <div class="todo">
                <span>{{ content.message }}</span>
            </div>
            <div class="tags">
                <div class="tag" v-for="(tag, index) in content.tags" :key="tag">
                    <span>{{ tag }}</span>
                    <button @click="removeTag(index)">&times;</button>
                </div>
            </div>
        </div> 
    </div>
</template>


<script>
export default {
  props: ["content"],
  methods: {
    edit() {
      this.$emit("edit-todo", this.content)
    },
    remove() {
      this.$emit("remove-todo")
    },
    removeTag(index) {
        this.content["tags"].splice(index, 1)
    }
  },
}
</script>


<style lang="scss">

    $firstColor: rgb(42, 148, 74);

    .todo-container {
        position: relative;
        width: 31%;
        border: 1px solid #2c3e502d;
        border-radius: 10px;
        margin-top: 20px;
        padding: 15px;
        transition: .2s;
        background-color: #fff;
        &:hover {
            transform: scale(1.1);
        }
        .btns {
            position: absolute;
            right: 0;
            top: 0;
            display: flex;
            justify-content: flex-end;
            .deleteTodo {
                background-color: rgb(235, 61, 61);
                border-radius: 0 9px 0 0;
                border: 1px solid rgb(235, 61, 61);
                color: #fff;
                width: 30px;
                height: 20px;
                cursor: pointer;
                font-size: 15px;
                transition: .2s;
                &:hover {
                    background-color: rgb(173, 24, 24);
                    border: 1px solid rgb(173, 24, 24);
                }
            }
            .edit {
                background-color: $firstColor;
                border: 1px solid $firstColor;
                border-radius: 0 0 0 7px;
                color: #fff;
                width: 30px;
                height: 20px;
                cursor: pointer;
                font-size: 15px;
                transition: .2s;
                &:hover {
                    background-color: rgb(27, 97, 48);
                    border: 1px solid rgb(27, 97, 48);
                }
            }
        }
        .todo-content {
            display: flex;
            flex-direction: column;
            height: 100%;
            .todo {
                padding: 5px 0;
                flex: 1 0 auto;
                margin-bottom: 5px;
                .btns {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
            }
            .tags {
                display: flex;
                justify-content: flex-start;
                flex-flow: row wrap;
                flex: 0 0 auto;
                .tag {
                    margin: 0 10px 5px 0;
                    padding: 3px;
                    background-color: rgba(83, 188, 248, 0.432);
                    border-radius: 7px;
                    font-size: 13px;
                    button {
                        border: 0;
                        background: transparent;
                        font-size: 13px;
                        cursor: pointer;
                        margin-left: 7px;
                        &:hover {
                            color: #fff;
                        }
                    }
                }
            }
        }
    }
</style>
