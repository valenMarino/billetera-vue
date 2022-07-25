<template>
    <div class="container">
    <HelpFormComponent :action="this.action"/>
    </div>
</template>

<script>
import HelpFormComponent from '@/components/HelpFormComponent.vue';
export default {
    name: "Investments",
    data() {
        return {
            action: "purchase"
        };
    },
    methods: {},
    mounted() {
    },
    components: { HelpFormComponent }
}
</script>

<style>
</style>