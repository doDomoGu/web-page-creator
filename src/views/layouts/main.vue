<template>

        <div id="main">
            <router-view></router-view>
        </div>

</template>



<script>
    //import Sidebar from './sidebar.vue'

    export default {
        name: 'main_layout',
        //components: { 'sidebar': Sidebar }
    }
</script>

<style>

    #main {
        margin-left:240px;
        padding:24px;
    }

</style>