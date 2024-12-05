<template>
    <div :class="{ sidebar: true, collapsed: !isExpand }">
        <timeFilter :isExpand="isExpand" :item="menuItems[0]" @yearChanged="handleYearChanged"></timeFilter>
        <fieldFilter :isExpand="isExpand" :item="menuItems[1]" @fieldChanged="handleFieldChanged"></fieldFilter>
        <fieldFilter :isExpand="isExpand" :item="menuItems[2]" @fieldChanged="handleJournalChanged"></fieldFilter>
        <fieldFilter :isExpand="isExpand" :item="menuItems[3]" @fieldChanged="handleAuthorChanged"></fieldFilter>
    </div>
</template>

<script setup>
import { handleError, ref } from 'vue'
import timeFilter from '@/components/search/filter/timeFilter.vue'
import fieldFilter from '@/components/search/filter/fieldFilter.vue'

const props = defineProps({
    isExpand: Boolean,
    menuItems: {
        type: Array,
        required: true,
    }
})

const filter = ref({
    'years': [],
    'fields': [],
    'journals': [],
    'authors': []
})
const handleYearChanged = (selectedTimes) => {
    filter.value.years = selectedTimes
}
const handleFieldChanged = (selectedFields) => {
    filter.value.fields = selectedFields
}
const handleJournalChanged = (selectedJournal) => {
    filter.value.journals = selectedJournal
}
const handleAuthorChanged = (selectedAuthor) => {
    filter.value.authors = selectedAuthor
}

</script>

<style scoped>
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
    border: 1px solid #d1d9e0;
    border-radius: 4px;
    box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
}

.sidebar.collapsed {
    transform: translateX(-100%);
}

.menu-item {
    overflow: hidden;

    .line {
        margin: 10px auto;
        width: 100%;
        border: #f1f0f0 1px solid;
    }

    ::-webkit-scrollbar {
        width: 6px;
        height: 5px;
    }

    ::-webkit-scrollbar-track {
        background-color: #f1f1f1;
        border-radius: 10px;
    }

    ::-webkit-scrollbar-thumb {
        background-color: #cecdcd;
        border-radius: 10px;
    }

    ::-webkit-scrollbar-thumb:hover {
        background-color: #aaa9a9;
    }
}

.menu-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    font-size: 16px;
    cursor: pointer;
    white-space: nowrap;
}

.menu-content {
    overflow-y: scroll;
    height: 0;
    transition: all 1s;
    padding: 0 10px;
    position: relative;

    li:nth-child(1) {
        margin-top: 15px;
    }

    input[type="text"] {
        width: 80%;
        height: 30px;
        padding: 5px;
        margin: 3px auto;
        border: 1px solid #ccc;
        border-radius: 3px;
        outline: none;
    }
}

.menu-content.expand {
    height: 120px;
    padding: 0 10px;
}

.content-item {
    display: flex;
    align-items: center;
    padding: 2px 15px;
    margin: 5px auto;
    white-space: nowrap;

    input {
        margin-right: 8px;
        cursor: pointer;
    }

    span {
        text-align: center;
        font-size: 15px;
        cursor: pointer;
        color: #333;
        white-space: nowrap;
    }
}

.icon-container {
    height: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    bottom: 5px;
    left: 50%;
    transform: translateX(-50%);
    cursor: pointer;

    .icon {
        height: 12px;
        width: 12px;
    }
}
</style>
