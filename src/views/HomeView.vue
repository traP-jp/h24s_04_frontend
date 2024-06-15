<script setup lang="ts">
import { fetchGenres } from '@/features/genres/api'

const genres = await fetchGenres()
</script>

<template>{{ genres }}</template>
