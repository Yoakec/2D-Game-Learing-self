<template>
    <div id="game" />
</template>

<script lang="ts" setup>
import { GameStater } from "./GameStater"

onMounted(() => {
    const gameStater = new GameStater({ background: '#1099bb' })
    gameStater.init()
})

</script>

<style lang="scss" scoped>
* {
    margin: 0;
    padding: 0;
}
</style>
