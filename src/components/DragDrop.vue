<script setup>
import { onMounted, ref, computed } from 'vue'
import axios from 'axios';
import Sortable from 'sortablejs';

const dataLists = ref([]);
const dragAreaRef = ref(null);

const getLists = async () => {
    try {
        const response = await axios.get('http://127.0.0.1:8000/api/data-lists');

        if (response.data) {   
            dataLists.value = response.data;
        }
    } catch (err) {
        console.error(err);
    }
}

onMounted(() => {
    getLists();

    new Sortable(dragAreaRef.value, {
        animation: 350,
        onEnd: function(event) {
            const listItems = Array.from(dragAreaRef.value.children);
            const newOrder = listItems.map(item => item.getAttribute('data-id'));
            
            axios.post('http://127.0.0.1:8000/api/update-data-lists', {newOrder: newOrder})
            .then(response => {
                console.log(response.data)
            })
            .catch(error => {
                console.log(error);
            })
        }
    });
});
</script>

<template>
    <div ref="dragAreaRef" class="container">
        <div v-for="(item) in dataLists" :key="item.order" :data-id="item.id" class="item">
            <div class="image">
                <img :src="item.image" alt="">
            </div>
            <div class="name">
                <span>{{ item.name }}</span>
                <p>{{ item.author }}</p>
            </div>
            <div class="drag-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"/></svg>
            </div>
        </div>
    </div>
</template>


<style scoped>
.container {
    padding: 5px;
    width: 100%;
    border-radius: 10px;
    border: 1px solid #CCC;
}
.container .item {
    cursor: pointer;
    display: flex;
    align-items: center;
    margin-bottom: 2px;
    padding: 5px;
}
.item:hover {
    background: #dfece7;
    transition: 0.4;
    border-radius: 10px;
}
.image {
    width: 100px;
    height: 60px;
    background: green;
}
.image > img {
    width: 100%;
    height: 100%;
    border-radius: 10px;
}
.name {
    width: calc(100% - 120px);
    padding: 5px;
    font-size: 90%;
    padding-bottom: 0;
    margin: 0 10px;
}
.name span {
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
}
.name > p {
    font-size: 95%;
    opacity: 0.5;
    margin-top: 4px;
}
.drag-icon {
    width: 20px;
}
</style>