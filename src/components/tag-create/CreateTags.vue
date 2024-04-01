<template>
    <div class="container">
        <div class="title">
            <h3>Tags</h3>
        </div>
        <div class="details">
            <button @click="removeAllTags">Remove All</button>
        </div>
        <div style="clear: both;"></div>
        <div class="content">
            <ul>
                <li v-for="(tag, index) in tags" :key="index">
                    {{ tag }}
                    <button @click="removeTag(index)" class="delete-button">x</button>
                </li>
                <input type="text" v-model.trim="newTag" @keyup.enter="addTag" spellcheck="false">
            </ul>
        </div>
        <button @click="saveTag" class="submit" :disabled="disabled">Save</button>
    </div>
</template>

<script setup>

import { onMounted, ref } from 'vue'
import axios from "axios"
import { useToast } from 'vue-toastification'

const toast = useToast();
const tags = ref([]);
const newTag = ref("");
const disabled = ref(false);

const getDataTags = async () =>  {
    try {
        const response = await axios.get('http://127.0.0.1:8000/api/data-tags')
        if (response.data.tags) {
            const data = JSON.parse(response.data.tags);
            for(let i = 0; i < data.length; i++) {
                tags.value.push(data[i]);
            }
        }
    } catch (error) {
        console.error('There was an error!', error);
    }
};
onMounted(() => {
    getDataTags();
});
const removeAllTags = () => {
    tags.value = [];
};
const removeTag = (index) => {
    tags.value.splice(index, 1);
};
const addTag = () => {
    const newTags = newTag.value.split(",")
    .map((tag) => tag.trim());
    
    const newTagsWithoutEmpty = newTags.filter(tag => tag.trim() !== '');

    const uniqueNewTags = [];
    for (let i = 0; i < newTagsWithoutEmpty.length; i++) {
        if (!uniqueNewTags.includes(newTagsWithoutEmpty[i])) {
            uniqueNewTags.push(newTagsWithoutEmpty[i]);
        }
    }

    uniqueNewTags.filter((tag) => {

        if (tag && tags.value.includes(tag)) {
            toast.error("This tag is exist!");
        } else {
            if (uniqueNewTags.length > 0) {
                tags.value.push(...uniqueNewTags);
            }
            newTag.value = "";
        }
    });


};
const saveTag = () => {
    const toast = useToast();
    disabled.value = true;
    axios.post('http://127.0.0.1:8000/api/save-tags', {
        data: JSON.stringify(tags.value)
    }).then(response => {
        if (response?.data?.status) {
            disabled.value = false;
        }
        toast.success("The tags updated successfully.");
    }).catch(error => {
        console.log(error);
    })
}
</script>

<style scoped>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
body {
    display: flex;
    background: #05a645;
    padding: 10px;
}
.delete-button {
    color: red;
    border: 1px solid red;
    margin-left: 5px;
    margin-top: -10px;
    height: 15px;
    width: 15px;
    padding: 0;
}
.container {
    width: 600px;
    margin: 30px auto;
    background: #FFF;
    padding: 12px;
}
.container :where(.title, li, li i, .details) {
    display: flex;
    align-items: center;
}
.title {
    float: left;
}
.details {
    float: right;
}
.content ul {
    display: flex;
    flex-wrap: wrap;
    margin: 12px 0;
    border: 1px solid #a6a6a6;
    padding: 5px;
    font-size: 12px;
}
.content ul li {
    margin: 4px 3px;
    list-style: none;
    background: #f2f2f2;
    padding: 5px;
    font-size: 12px;
}
.content ul li i {
    height: 20px;
    width: 20px;
    margin-left: 8px;
    font-size: 12px;
    cursor: pointer;
    background: #FFF;
    justify-content: center;
    align-items: center;
    line-height: 20px;
}
.content ul input {
    flex: 1;
    padding: 5px;
    border: none;
    outline: none;
    font-size: 12px;
}
.details button, .submit {
    border: 0;
    outline: 0;
    color: #FFF;
    font-size: 16px;
    line-height: 20px;
    cursor: pointer;
    padding: 5px 15px;
    background: #05a645;
    width: 100%;
}
button:disabled {
    opacity: 0.7;
}
</style>