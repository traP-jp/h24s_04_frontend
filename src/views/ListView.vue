<script setup lang="ts">
import { ref, computed} from 'vue'

interface Data{
    title: string
    description: string
    genre: string
}

const datas = ref<Data[]>([
    {   
        title: 'slide1',
        description: 'test1',
        genre: 'hackathon'
    },
    {
        title:'slide2',
        description: 'test2',
        genre: 'hackathon'
    }
])
</script>

<template>
    <div>
        <h1>スライド一覧</h1>
    </div>
    <ul class='container'>
        <li v-for="data in datas" :key="data.title">
            <div>タイトル：{{  data.title }}</div>
            <div>詳細：{{  data.description }}</div>
            <div>ジャンル：{{  data.genre }}</div>
        </li>
    </ul>
</template>

<style>
    .container {
        display: flex;
        flex-direction: column;
        gap: 20px;
        padding: 16px 16px;
    }
</style>