<template>
  <header :class="$style.header">
    <router-link to="/">スライド一覧</router-link>
    <router-link to="/upload">スライドの登録</router-link>
  </header>
</template>

<style lang="scss" module>
.header {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 12px 20px;
  background-color: #90bfeb;

  a {
    color: black;
    text-decoration: none;
    padding: 8px 12px;
    border-radius: 8px;

    &:hover {
      background-color: #f0f0f0;
    }
  }
}
</style>
