<template lang="pug">
    - var buttons = [ 'newCall' ]
    section.home
        h1.home__title {{ $t('titles.app') }}
        nav
            ul.home__menu
                each button in buttons
                    li.home__menu___item
                        router-link.home__menu___link(:to = { name: button }) {{ $t(`menus.#{button}`) }}
</template>

<script>
export default {
    name: 'Home'
}
</script>

<style lang="sass" scoped>
$color-text: #fdfdfd

.home
    align-items: center
    display: flex
    background: #006699
    flex-direction: column
    justify-content: center
    height: 100vh
    width: 100vw
    &__title
        color: $color-text
        margin-bottom: 2rem
    &__menu
        display: flex
        flex-direction: column
        &___item
            list-style: none
        &___link
            background: #33cc33
            border-radius: 5px
            color: $color-text
            display: inline-block
            margin-bottom: 1.5rem
            padding: 1rem 10rem
            text-decoration: none
            transition: all .1s ease-in
            &:hover
                background: #29a329
</style>
