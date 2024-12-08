<template>
    <div :class="{ sidebar: true, collapsed: !isExpand }">
        <timeFilter :isExpand="isExpand" :item="menuItems[0]" @yearChanged="handleYearChanged"></timeFilter>
        <fieldFilter :isExpand="isExpand" :item="menuItems[1]" @fieldChanged="handleFieldChanged"></fieldFilter>
        <fieldFilter :isExpand="isExpand" :item="menuItems[2]" @fieldChanged="handleJournalChanged"></fieldFilter>
    </div>
</template>

<script setup>
import { handleError, ref, watch } from 'vue'
import timeFilter from '@/components/search/filter/timeFilter.vue'
import fieldFilter from '@/components/search/filter/fieldFilter.vue'

const props = defineProps({
    isExpand: Boolean,
    menuItems: {
        type: Array,
        required: true,
    }
})

const emit = defineEmits(['selectionChanged'])
const filter = ref({
    'years': [],
    'fields': [],
    'journals': [],
    'authors': []
})

//监听筛选条件变化
const handleYearChanged = (selectedTimes) => {
    filter.value.years = selectedTimes
    emit('selectionChanged', filter.value)
}
const handleFieldChanged = (selectedFields) => {
    filter.value.fields = selectedFields
    emit('selectionChanged', filter.value)
}
const handleJournalChanged = (selectedJournal) => {
    filter.value.journals = selectedJournal
    emit('selectionChanged', filter.value)
}

</script>

<style scoped>
@import "@/assets/theme-colors.css";

* {
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}

.sidebar {
    width: 100%;
    padding: 10px;
    margin: 0 auto;
    position: relative;
    transition: all 0.3s ease;
    min-width: 150px;
    border: 1px solid var(--bar-border-color);
    border-radius: 4px;
    box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
}

.sidebar.collapsed {
    transform: translateX(-100%);
}
</style>
