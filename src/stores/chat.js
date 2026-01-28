/**
 * 聊天状态管理
 * 使用 Pinia 管理对话列表、消息记录等状态
 */
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import {
    conversations as mockConversations,
    messages as mockMessages,
    contacts as mockContacts,
    currentUser as mockCurrentUser,
    getContactById,
    getMessagesByConvId,
    getConversationById
} from '@/mock/data.js'

export const useChatStore = defineStore('chat', () => {
    // 状态
    const currentUser = ref(mockCurrentUser)
    const conversations = ref([...mockConversations])
    const contacts = ref([...mockContacts])
    const messages = ref({ ...mockMessages })
    const currentConvId = ref(null)
    const loading = ref(false)
    const refreshing = ref(false)

    // 计算属性：总未读数
    const totalUnread = computed(() => {
        return conversations.value.reduce((sum, conv) => sum + conv.unreadCount, 0)
    })

    // 计算属性：当前对话消息
    const currentMessages = computed(() => {
        if (!currentConvId.value) return []
        return messages.value[currentConvId.value] || []
    })

    // 计算属性：当前对话信息
    const currentConversation = computed(() => {
        if (!currentConvId.value) return null
        return conversations.value.find(c => c.id === currentConvId.value)
    })

    // 设置当前对话
    function setCurrentConversation(convId) {
        currentConvId.value = convId
        // 清除未读数
        const conv = conversations.value.find(c => c.id === convId)
        if (conv) {
            conv.unreadCount = 0
        }
    }

    // 发送消息
    function sendMessage(content, type = 'text') {
        if (!currentConvId.value || !content) return null

        const newMsg = {
            id: `msg_${Date.now()}`,
            type,
            content,
            senderId: currentUser.value.id,
            isSelf: true,
            timestamp: formatTime(new Date())
        }

        // 添加消息
        if (!messages.value[currentConvId.value]) {
            messages.value[currentConvId.value] = []
        }
        messages.value[currentConvId.value].push(newMsg)

        // 更新对话列表最后消息
        const conv = conversations.value.find(c => c.id === currentConvId.value)
        if (conv) {
            conv.lastMessage = type === 'text' ? content : '[图片]'
            conv.lastTime = newMsg.timestamp
        }

        // 如果是 AI 对话，模拟 AI 回复
        if (conv && conv.isAI) {
            setTimeout(() => {
                simulateAIReply()
            }, 1000 + Math.random() * 1000)
        }

        return newMsg
    }

    // 模拟 AI 回复
    function simulateAIReply() {
        const replies = [
            '好的，让我想想...',
            '这是个很好的问题！',
            '我理解你的意思，让我为你解答。',
            '根据我的知识，我认为...',
            '你可以尝试这样做...'
        ]

        const aiMsg = {
            id: `msg_${Date.now()}`,
            type: 'text',
            content: replies[Math.floor(Math.random() * replies.length)],
            senderId: 'ai_001',
            isSelf: false,
            timestamp: formatTime(new Date())
        }

        messages.value[currentConvId.value].push(aiMsg)

        // 更新对话列表
        const conv = conversations.value.find(c => c.id === currentConvId.value)
        if (conv) {
            conv.lastMessage = aiMsg.content
            conv.lastTime = aiMsg.timestamp
        }
    }

    // 刷新对话列表
    async function refreshConversations() {
        refreshing.value = true
        // 模拟网络请求
        await new Promise(resolve => setTimeout(resolve, 1000))
        conversations.value = [...mockConversations]
        refreshing.value = false
    }

    // 加载更多对话
    async function loadMoreConversations() {
        if (loading.value) return
        loading.value = true
        // 模拟网络请求
        await new Promise(resolve => setTimeout(resolve, 800))
        // 这里可以添加更多模拟数据
        loading.value = false
    }

    // 获取联系人信息
    function getContact(contactId) {
        return contacts.value.find(c => c.id === contactId) || null
    }

    // 格式化时间
    function formatTime(date) {
        const hours = date.getHours().toString().padStart(2, '0')
        const minutes = date.getMinutes().toString().padStart(2, '0')
        return `${hours}:${minutes}`
    }

    return {
        currentUser,
        conversations,
        contacts,
        messages,
        currentConvId,
        loading,
        refreshing,
        totalUnread,
        currentMessages,
        currentConversation,
        setCurrentConversation,
        sendMessage,
        refreshConversations,
        loadMoreConversations,
        getContact
    }
})
