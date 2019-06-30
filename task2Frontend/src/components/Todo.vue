<template>
    <div class="todo-container">
        <div class="todo">
            <span>{{ content.message }}</span>
            <div class="btns">
                <button @click="edit">edit</button>
                <button @click="remove">&times;</button>
            </div>
        </div>
        <div class="tags">
            <div class="tag" v-for="(tag, index) in content.tags" :key="tag">
                <span>{{ tag + "  " }}</span>
                <button @click="removeTag(index)">&times;</button>
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
    .todo-container {
        border-bottom: 1px solid;
        margin-top: 10px;
        .todo {
            padding: 5px 0;
            display: flex;
            justify-content: space-between;
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
            .tag {
                margin: 10px 0 10px;
                padding: 5px;
                background-color: rgba(83, 188, 248, 0.603);
                border-radius: 10px;
                button {
                    border: 0;
                }
                button:hover {
                    background-color: rgba(83, 188, 248, 0.9);
                }
            }
        }
    }
</style>
