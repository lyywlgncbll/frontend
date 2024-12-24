<template>
    <div class="reference-container">
        <div class="title">发表文献</div>
        <div class="reference-item" v-for="(reference, index) in references" :key="index">
            <div class="reference-info" @click="goToArticle(reference.id)">
                <h3 class="reference-title" :title="reference.title">{{ reference.title }}</h3>
                <p class="reference-authors"> Published by : {{ formatAuthors(reference.authors) }}</p>
                <p class="reference-journal"> Journal : <span>{{ reference.journal }}</span> <span
                    class="reference-date"> · {{ reference.date }}</span></p>
                <p class="reference-citations">Cited By : {{ reference.citations }}</p>
            </div>
        </div>
    </div>

</template>

<script>
export default {
    name: "References",
    props: {
        references: {
            type: Array,
            required: true,
        },
        editable: {
            type: Boolean,
            default: false, // 默认非编辑状态
        },
    },
    data() {
        return {};
    },
    methods: {
        goToArticle(id) {
            // 使用 router.push 来进行路由跳转，传递 id 作为查询参数
            this.$router.push({path: "/article", query: {id}});
        },
        formatAuthors(authors) {
            const authorsArray = authors.split(',').map(author => author.trim());

            if (authorsArray.length > 3) {
                return authorsArray.slice(0, 3).join(', ') + ', ...';
            }

            return authorsArray.join(', ');
        },
    },


};
</script>

<style scoped>
.title {
    position: sticky;
    top: 0;
    font-size: 16px;
    font-weight: bold;
    color: #333;
    padding: 5px;
    border-bottom: 2px solid #e0e0e0;
    background-color: #fff;
    z-index: 1;
    padding-top: 20px;
}

.reference-container {
    height: 100%;
    width: 100%;
    max-height: 70vh;
    background-color: #fff;
    border-radius: 20px;
    padding: 0px 20px;
    padding-bottom: 10px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    overflow: scroll;
    scrollbar-width: none;

    ::-webkit-scrollbar {
        display: none;
    }
}

.reference-item {
    width: 100%;
    height: auto;
    padding: 10px 0;
    margin-bottom: 10px;
}

.reference-info {
    width: 100%;
    height: 100%;
    padding: 10px 20px;
    border-radius: 8px;
    cursor: pointer;
    transition: .2s ease;

    .reference-title {
        margin-bottom: 5px;
        font-size: 21px;
        font-weight: 500;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .reference-authors {
        font-size: 15px;
        color: #808080;
        margin-bottom: 5px;
    }

    .reference-journal {
        font-size: 15px;
        color: #808080;

        span {
            font-style: italic;
        }
    }

    .reference-citations {
        font-size: 14px;
        text-align: right;
        color: #808080;
    }

    &:hover {
        background-color: #f0f0f0;
    }
}
</style>