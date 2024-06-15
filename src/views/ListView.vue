<script setup lang="ts">
import { ref, computed} from 'vue'

interface Data{
    title: string
    description: string
    genre: string
}

const datalist = ref<Data[]>([
    {   
        title: 'slide1sssssssssssssssssssssssssssssssssss',
        description: 'test1',
        genre: 'hackathon'
    },
    {
        title:'slide2',
        description: 'test2test2test2test2test2test2test2test2test2test2test2test2test2test2test2tesetttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttt',
        genre: 'hackathon'
    },
    {
        title:'slide3',
        description: 'test3',
        genre: 'graphic'
    },
    {
        title: 'slide4',
        description: 'test4',
        genre: 'graphic'
    }
])
</script>

<template>
    <div>
        <h1 :class="$style.toptitle">スライド一覧</h1>
    </div>
    <div>
        <!-- <p>登録日で昇順ソート</p> -->
    </div>
    <ul :class='$style.container'>
        <li v-for="data in datalist" :key="data.title" :class="$style.slide">
            <div :class="$style.image">
            </div>
            <div :class="$style.letter">
                <div :class="$style.name">
                    <div :class="$style.title">タイトル：{{  data.title }}</div>
                    <div :class="$style.desc">詳細：{{  data.description }}</div>
                </div>
                <div :class="$style.genre">ジャンル：{{  data.genre }}</div>
            </div>
        </li>
    </ul>
</template>

<style lang="scss" module>
    .toptitle {
        font-size: 24px;
    }
    .container {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        gap: 16px;
        list-style: none;
    }
    .slide {
        display: flex;
        flex-direction: column;
        gap: 20px;
        padding: 16px 16px;
        border: 1px solid #000000;
        border-radius: 16px;
        width: 292px;
        
    }
    .image {
        width: 260px;
        height: 146px;
    }
    .letter {
        display: flex;
        flex-direction: column;
        gap: 8px;
    }
    .name {
        display: flex;
        flex-direction: column;
        gap: 4px;
    }
    .title {
        white-space: nowrap; 
        overflow: hidden; 
        text-overflow: ellipsis; 
        font-size: 20px;
        color: #000000;
    }
    .desc {
        display: -webkit-box; 
        -webkit-box-orient: vertical; 
        -webkit-line-clamp: 3; 
        overflow: hidden; 
        font-size: 16px;
        color: #8d8d8d;
        word-break: break-all;
    }
    .genre {
        font-size: 16px;
        color: #000000;
    }

</style>