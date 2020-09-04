<template>
    <select :value="value" @change="$emit('change', $event)">
        <option v-for="option of options" :key="option.value" 
            :value="option.value"
        >{{ option.label }}</option>
    </select>
</template>

<script>
export default {
    name: "mt-select",
    props: {
        "options": { default: () => [], type: Array },
        "value": {}
    },
}
</script>

<style>

</style>