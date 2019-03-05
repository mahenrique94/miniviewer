<template lang="pug">
    .loading
        span.loading__spinner
</template>

<script>
export default {
    name: 'Loading'
}
</script>

<style lang="sass" scoped>
    .loading
        align-items: center
        display: flex
        height: 100vh
        justify-content: center
        width: 100vw
        &__spinner
            $spinner-height: 200px
            animation: loading 1.5s cubic-bezier(.7, 0, 0, 1) infinite
            border: 5px solid #dcdcdc
            border-left-color: #00cc99
            border-radius: 100%
            height: $spinner-height
            width: $spinner-height

    @keyframes loading
        from
            transform: rotate(0deg)
        to
            transform: rotate(360deg)
</style>


