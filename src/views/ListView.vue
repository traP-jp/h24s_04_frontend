<script setup lang="ts">
import { ref, computed} from 'vue'

interface Data{
    title: string
    description: string
    genre: string
}

const test = () => {
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
    <div :class="$style.search">
        <div><select :class="$style.search_genre">
            <option value="" selected>ジャンルを選択</option>
        </select></div>
        <div><input type="text" placeholder="タイトルで検索" :class="$style.search_title"/></div>
        <div><button @click="test" :class="$style.sort">登録日で昇順ソート</button></div>
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
    .search {
        display:flex;
        flex-direction: row-reverse;
        gap: 24px;
        align-items: baseline;
    }
    .sort {
        font-size: 16px;
        display:flex;
        justify-content: center;
        align-items: center;
        width:172px;
        height: 24px;
        border-radius: 4px;
        border-width:0px;
        background: #ffffff;        
    }
    .sort:focus,.sort:hover {
        background-color: #ececec;
    }
    .sort:active {
        background-color: #ffffff;
    }
    .search_title {
        width: 184px;
        height: 43px;
        font-size: 16px;
        border-width: 1px;
        border-radius: 8px;
        padding-left: 12px;
    }
    .search_genre {
        width: 188px;
        height: 43px;
        font-size: 16px;
        border-radius: 8px;
        color: #8d8d8d;
        padding-left: 12px;
    }

</style>