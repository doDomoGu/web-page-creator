<template>
    <div>
        <sidebar></sidebar>
        <div id="admin_main">
            <router-view></router-view>
        </div>
    </div>
</template>



<script>
    import Sidebar from './sidebar.vue'

    export default {
        name: 'admin_layout',
        components: { 'sidebar': Sidebar }
    }
</script>

<style>

#admin_main {
    margin-left:240px;
    padding:24px;
}

</style>