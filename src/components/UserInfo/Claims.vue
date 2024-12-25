<template>
    <div id="Claims">
        <!-- 认领请求弹窗 -->
        <div v-if="isModalOpen" class="modal-overlay">
            <div class="modal-content">
                <h3 class="modal-title">搜索并选择认领对象</h3>

                <!-- 搜索输入框 -->
                <input
                    type="text"
                    v-model="searchQuery"
                    class="modal-input"
                    placeholder="请输入对象名称"/>
                <!-- 搜索按钮 -->
                <button @click="filterClaims" class="search-button">搜索</button>

                <!-- 显示搜索结果 -->
                <div v-if="filteredClaims.length > 0" class="results-container">
                    <ul>
                        <li v-for="(claim, index) in filteredClaims" :key="index" class="claim-item">
                            <span>{{ claim.claim }}</span>
                            <span :class="['status', claim.status]">{{ claim.status }}</span>
                            <button v-if="!claim.isClaimed" @click="selectClaim(claim)" class="select-button"
                            :style="{
                                marginLeft: claim.isSelected ? '34px' : '50px',
                            }">
                                {{ claim.isSelected ? '已选择' : '选择' }}
                            </button>
                            <button v-else class="select-button disabled">
                                已认领
                            </button>
                        </li>
                    </ul>
                </div>
                <p v-else class="no-results">没有匹配的对象。</p>

                <!-- 弹窗操作按钮 -->
                <div class="modal-actions">
                    <button @click="openClaimModalDesc" class="submit-button">
                        填写认领描述
                    </button>
                    <button @click="closeClaimModal" class="cancel-button">关闭</button>
                </div>
            </div>
        </div>
        <div v-if="isModalOpen && select" class="modal-overlay">
            <div class="modal-desc">
                <div class="modal-title">认领描述</div>
                <textarea type="text"
                          v-model="claimDescription"
                          class="modal-desc-input"
                          placeholder="请输入认领描述描述">
                </textarea>
                <div class="modal-desc-button">
                    <button class="submit-button" @click="submitClaimRequest">
                        {{ isSubmitting ? "处理中..." : "发送认领请求" }}
                    </button>
                    <button class="cancel-button" @click="closeModalDesc">取消</button>
                </div>
            </div>
        </div>

        <!-- 已发出的认领请求 -->
        <div class="title">
            <span>历史认领</span>
            <button @click="openClaimModal" class="claim-button" v-if="isClaim==null || isClaim==''">认领</button>
        </div>

        <div class="container">
            <div class="claim-table">
                <div class="claim" v-for="(claim, index) in claimRequests" :key="index"
                     :class="{
                         accepted: claim.status ?.trim() === 'ACCEPTED',
                         rejected: claim.status ?.trim() === 'REJECTED'
                 }" >
                    <div class="line"></div>
                    <div class="date">{{ claim.createTime }}</div>
                    <div class="action">{{ claim.status }}</div>
                    <div class="name">{{ claim.claim.trim() }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from '@/utils/axios.js';

export default {
    props: {
        userid: {
            type: Number,
            required: true,
        },
        authorization: {
            type: String,
            required: true,
        },
        myclaimRequests: {
            type: Array,
        },
        isClaim: {
            type: String,
        }
    },
    data() {
        return {
            Authorization: this.authorization,
            // 控制弹窗的显示
            isModalOpen: false,
            // 控制弹窗的显示
            select: false,
            // 当前搜索查询
            searchQuery: '',
            // 当前认领描述
            claimDescription: '',
            // 用户的认领请求
            claimRequests: [],
            // 当前显示的匹配的对象
            filteredClaims: [],
            // 防止重复提交的标志
            isSubmitting: false,
        };
    },
    methods: {
        // 打开弹窗
        openClaimModal() {
            this.isModalOpen = true;
        },

        // 关闭弹窗
        closeClaimModal() {
            this.isModalOpen = false;
            this.select = false;
            this.searchQuery = '';  // 清除输入框内容
            this.filteredClaims = []; // 清空搜索结果
        },

        // 关闭认领描述
        closeModalDesc() {
            this.select = false
            this.claimDescription = '';
        },

        // 搜索并筛选认领对象
        filterClaims() {
            if (!this.searchQuery) {
                this.filteredClaims = []; // 如果没有输入内容，显示空
            } else {
                // 如果有搜索内容，发送GET请求
                axios.get('/api/academic/claim/query', {
                    params: {
                        authorName: this.searchQuery,  // 传入authorName，使用searchQuery
                        count: 20  // 假设你需要返回的结果数量是固定的，这里可以根据需求调整
                    }
                }).then(response => {
                    console.log("sss", response.data);
                    // 假设返回的数据是一个JSON数组
                    this.filteredClaims = response.data.map(claim => {
                        // 为每个元素添加isSelected属性，初始值为false
                        return {
                            ...claim,  // 保留原有的属性
                            isSelected: false, // 新增的属性
                            isClaimed: claim.status === 'Claimed',// 判断状态是否为“Claimed”
                        };
                    });
                    console.log("我是filteredClaims:", this.filteredClaims);
                }).catch(error => {
                    console.error('Error fetching claims:', error);  // 错误处理
                });
            }
        },

        // 选择认领对象
        selectClaim(claim) {
            // 如果当前已被选中，直接取消选中
            if (claim.isSelected) {
                claim.isSelected = false;
                this.searchQuery = '';
                return;
            }

            // 取消其他对象的选中状态
            this.filteredClaims.forEach((item) => {
                item.isSelected = false;
            });

            // 选中当前对象
            claim.isSelected = true;
            this.searchQuery = claim.claim; // 更新搜索框内容为选中对象的名称
        },

        // 打开认领描述弹窗
        openClaimModalDesc() {
            if (!this.searchQuery){
                alert("请选择认领对象")
                return; // 如果没有选择认领对象，直接返回
            }
            this.select = true;
        },

        // 提交认领请求
        submitClaimRequest() {
            if(this.claimDescription==null || this.claimDescription===''){
                alert("请填写认领描述")
                return;
            }
            const authorid = this.filteredClaims.find(a => a.claim === this.searchQuery).authorid;
            this.isSubmitting = true;
            console.log(authorid)
            axios.post(
                "/portal/claim/open", // 请求的 URL
                {
                    claim: authorid,
                    content: this.claimDescription,
                }, // 请求体中的 claim 字段
            ).then(response => {
                console.log('响应数据:', response.data);
            }).catch(error => {
                console.error('请求失败:', error);
            });
            this.isSubmitting = false;
            this.closeClaimModal(); // 关闭弹窗
            // window.location.reload();
        },

        // 格式化日期函数
        formatDate(dateString) {
            const date = new Date(dateString);
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0'); // 月份从0开始，需要加1
            const day = String(date.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
        },
        // 格式化数据函数
        formatClaims(response) {
            const formatted = response.view.map(item => ({
                claim: item.authorName,
                createTime: item.claim.createTime ? this.formatDate(item.claim.createTime) : null,
                handleTime: item.claim.handleTime ? this.formatDate(item.claim.handleTime) : null,
                status: item.claim.status
            }));

            // 更新数据
            this.claimRequests = this.processClaims(formatted);
            this.$emit('updataUserClaim', this.claimRequests);
        },

        //自动获取当前认领请求
        sendGetMyClaims() {
            const id = this.userid;
            axios.get('/portal/claim/getall', {
                params: {
                    userID: id,
                    pageSize: 30,
                    page: 1,
                }
            }).then(response => {
                this.formatClaims(response.data);
                console.log("获取历史请求成功：", response.data);
            }).catch(error => {
                console.error('获取失败:', error);
            });
        },

        // 将认领请求函数拆分
        processClaims(claimRequests) {
            if (!Array.isArray(claimRequests)) return []; // 确保输入是数组

            // 复制原数组到 acc 中
            const acc = [...claimRequests];

            // 遍历原数组，根据需要新增或修改内容
            acc.forEach((claim) => {
                if (claim.handleTime) {
                    // 如果存在 handleTime，创建新对象
                    const newClaim = {
                        ...claim,
                        createTime: claim.handleTime, // 使用 handleTime 作为 createTime
                        status: claim.status, // 保留原有的 status
                    };

                    // 修改原对象的 status 为 "PENDING"
                    acc.push(newClaim); // 追加新内容
                }
                claim.status = 'SEND';
            });

            // 返回处理后的数组
            return acc.reverse();
        },
    }
    ,

    mounted() {

    }
    ,

}
;
</script>

<style scoped>
/* Container styling */
#Claims {
    position: relative;
    margin-bottom: 50px;
    border-radius: 20px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    background-color: #fff;
    width: 100%;
    height: auto;
    padding: 0 20px;
    min-height: 200px;
    overflow: scroll
}


/* 发起认领请求按钮样式 */
.claim-button {
    margin-left: 100px;
    padding: 5px 10px;
    font-size: 14px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #cdcbcb;
    }
}

/* 弹窗样式 */
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.modal-content {
    background-color: white;
    padding: 40px;
    border-radius: 10px;
    width: 600px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    text-align: center;
}

.modal-title {
    font-size: 18px;
    margin-bottom: 20px;
}

.modal-input {
    width: 100%;
    padding: 10px;
    margin-bottom: 20px;
    border-radius: 5px;
    border: 1px solid #ccc;
    font-size: 16px;
}

.search-button {
    padding: 10px 20px;
    background-color: #3D8CFF;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-bottom: 20px;
    transition: background-color 0.3s ease;
}

.search-button:hover {
    background-color: #3D8CFF;
}

.results-container {
    max-height: 200px;
    overflow-y: auto;
    margin-bottom: 30px;
}

.claim-item {
    display: flex;
    gap:110px;
    margin-bottom: 10px;
    

    span {
        &:first-child {
            flex: 1;
            max-width: 110px; /* 设置固定最大宽度，根据需要调整 */
            overflow: hidden;
            white-space: nowrap;
            text-align: left;
            overflow-x: auto;
        }

        &:first-child::-webkit-scrollbar {
            display: none; /* 隐藏滚动条 */
        }

        &:last-child {
            max-width: 100px; /* 设置status的最大宽度，调整为合适的值 */
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            text-align: left;
            
        }
    }
}

.status {
    padding: 2px 5px;
    border-radius: 5px;
    display: inline-block; /* 确保状态不会被挤压 */

    &.Claimed {
        background-color: #555555;
        color: white;
    }

    &.Unclaimed {
        background-color: #28a745;
        color: white;
        
    }
}

.select-button {
    padding: 5px 10px;
    background-color: #3D8CFF;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-left: 50px;
    &:hover {
        background-color: #3D8CFF;
    }

    &.disabled {
        background-color: #ccc;
        color: #666;
        cursor: not-allowed;
        
    }
}

.no-results {
    color: #dc3545;
}

.modal-actions {
    display: flex;
    justify-content: space-between;
}

.submit-button,
.cancel-button {
    padding: 10px 20px;
    font-size: 16px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.submit-button {
    background-color: #3D8CFF;
    color: white;

    &:hover {
        background-color: #3D8CFF;
    }
}

.cancel-button {
    background-color: red;
    color: white;

    &:hover {
        background-color: red;
    }
}

.modal-desc {
    background-color: white;
    padding: 40px;
    border-radius: 10px;
    width: 400px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    text-align: center;

    .modal-desc-input {
        width: 100%;
        min-height: 150px;
        max-height: 300px;
        padding: 10px;
        background-color: whitesmoke;
        border-radius: 8px;

        &:focus {
            outline: none;
        }
    }

    .modal-desc-button {
        display: flex;
        justify-content: space-between;
        margin-top: 20px;

        button {
            padding: 10px 20px;
            font-size: 16px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            transition: background-color 0.3s ease;
        }
    }
}

/* 认领请求历史表格 */

.title {
    position: sticky;
    top: 0;
    font-size: 16px;
    font-weight: bold;
    color: #333;
    padding: 10px;
    border-bottom: 2px solid #e0e0e0;
    background-color: #fff;
    z-index: 1;

    button{
        position: absolute;
        right: 10px;
    }
}

.container {
    margin-top: 10px;
    width: 100%;
    max-height: 200px;
    overflow-y: auto;
    padding: 0px 30px;
    display: flex;
    flex-direction: column;
    scrollbar-width: none;

    ::-webkit-scrollbar {
        display: none;
    }

}

.claim-table {
    width: 90%;

    .claim {
        width: 100%;
        padding: 20px 20px 0 20px;
        position: relative;

        .date {
            font-size: 14px;
            color: #70707d;
        }

        .name {
            font-size: 14px;
            color: #70707d;
        }

        .action {
            font-size: 14px;
            color: #70707d;
        }

        .line {
            width: 3px;
            height: 100%;
            background-color: rgba(119, 117, 117, 0.5);
            position: absolute;
            left: -2px;
            top: 0;
        }

        &::before {
            content: '';
            position: absolute;
            display: block;
            width: 14px;
            height: 14px;
            background-color: #92979e;
            border-radius: 50%;
            left: 0;
            top: 25%;
            transform: translateX(-55%);
            z-index: 1;
        }

        &.accepted {
            &::before {
                background-color: rgb(11, 189, 135);
            }
        }

        &.rejected {
            &::before {
                background-color: #dc3545;
            }
        }
    }
}


</style>
  