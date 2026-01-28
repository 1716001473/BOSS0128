/**
 * Mock 数据文件
 * 包含用户信息、对话列表、联系人和消息记录
 */

// 当前登录用户信息
export const currentUser = {
    id: 'user_001',
    nickname: '小明',
    avatar: '/static/avatars/user.svg',
    signature: '今天又是元气满满的一天 ✨',
    level: 5,
    phone: '138****8888',
    email: 'xiaoming@example.com'
}

// 联系人列表
export const contacts = [
    {
        id: 'ai_001',
        nickname: 'Companion AI',
        avatar: '/static/avatars/ai-robot.svg',
        signature: '我是你的智能助手，有什么可以帮助你的？',
        level: 99,
        isAI: true,
        status: 'online'
    },
    {
        id: 'user_002',
        nickname: '产品经理',
        avatar: '/static/avatars/pm.svg',
        signature: '用户体验至上',
        level: 8,
        isAI: false,
        status: 'online'
    },
    {
        id: 'user_003',
        nickname: '设计师小王',
        avatar: '/static/avatars/designer.svg',
        signature: '设计让生活更美好',
        level: 6,
        isAI: false,
        status: 'offline'
    },
    {
        id: 'user_004',
        nickname: '技术大佬',
        avatar: '/static/avatars/developer.svg',
        signature: 'Code is poetry',
        level: 10,
        isAI: false,
        status: 'online'
    },
    {
        id: 'user_005',
        nickname: '运营小姐姐',
        avatar: '/static/avatars/operator.svg',
        signature: '数据驱动增长',
        level: 7,
        isAI: false,
        status: 'busy'
    },
    {
        id: 'user_006',
        nickname: '测试工程师',
        avatar: '/static/avatars/tester.svg',
        signature: '找Bug是我的快乐',
        level: 5,
        isAI: false,
        status: 'offline'
    }
]

// 对话列表
export const conversations = [
    {
        id: 'conv_001',
        contactId: 'ai_001',
        contactName: 'Companion AI',
        contactAvatar: '/static/avatars/ai-robot.svg',
        lastMessage: '当然，我推荐《未来简史》。它探索了...',
        lastTime: '14:30',
        unreadCount: 0,
        isAI: true
    },
    {
        id: 'conv_002',
        contactId: 'user_002',
        contactName: '产品经理',
        contactAvatar: '/static/avatars/pm.svg',
        lastMessage: '新版本什么时候上线？需要评审吗？',
        lastTime: '12:45',
        unreadCount: 2,
        isAI: false
    },
    {
        id: 'conv_003',
        contactId: 'user_003',
        contactName: '设计师小王',
        contactAvatar: '/static/avatars/designer.svg',
        lastMessage: '设计稿已经更新了，请查收～',
        lastTime: '昨天',
        unreadCount: 0,
        isAI: false
    },
    {
        id: 'conv_004',
        contactId: 'user_004',
        contactName: '技术大佬',
        contactAvatar: '/static/avatars/developer.svg',
        lastMessage: '代码Review完成，LGTM 👍',
        lastTime: '昨天',
        unreadCount: 0,
        isAI: false
    },
    {
        id: 'conv_005',
        contactId: 'user_005',
        contactName: '运营小姐姐',
        contactAvatar: '/static/avatars/operator.svg',
        lastMessage: '这周的数据报表发你了',
        lastTime: '周一',
        unreadCount: 5,
        isAI: false
    },
    {
        id: 'conv_006',
        contactId: 'user_006',
        contactName: '测试工程师',
        contactAvatar: '/static/avatars/tester.svg',
        lastMessage: '发现了一个严重bug，请尽快修复',
        lastTime: '周一',
        unreadCount: 1,
        isAI: false
    }
]

// 消息记录（按对话ID分组）
export const messages = {
    // Companion AI 的对话
    'conv_001': [
        {
            id: 'msg_001',
            type: 'text',
            content: '给我推荐一本关于未来城市的书',
            senderId: 'user_001',
            isSelf: true,
            timestamp: '14:25'
        },
        {
            id: 'msg_002',
            type: 'text',
            content: '当然，我推荐《未来简史》。它探索了...很波、京转、的地界面，更新的谐集心性命。',
            senderId: 'ai_001',
            isSelf: false,
            timestamp: '14:26'
        },
        {
            id: 'msg_003',
            type: 'book',
            content: {
                title: '当然\n未来简史',
                author: '尤瓦尔·赫拉利',
                cover: 'https://picsum.photos/100/140?random=1',
                description: '它探索了未来科技对人类的影响和发展趋势'
            },
            senderId: 'ai_001',
            isSelf: false,
            timestamp: '14:26',
            showFeedback: true
        }
    ],
    // 产品经理的对话
    'conv_002': [
        {
            id: 'msg_101',
            type: 'text',
            content: '在吗？有个需求想和你讨论下',
            senderId: 'user_002',
            isSelf: false,
            timestamp: '12:30'
        },
        {
            id: 'msg_102',
            type: 'text',
            content: '在的，什么需求？',
            senderId: 'user_001',
            isSelf: true,
            timestamp: '12:32'
        },
        {
            id: 'msg_103',
            type: 'text',
            content: '用户反馈聊天页面需要增加语音消息功能',
            senderId: 'user_002',
            isSelf: false,
            timestamp: '12:35'
        },
        {
            id: 'msg_104',
            type: 'text',
            content: '好的，我评估下工作量',
            senderId: 'user_001',
            isSelf: true,
            timestamp: '12:40'
        },
        {
            id: 'msg_105',
            type: 'text',
            content: '新版本什么时候上线？需要评审吗？',
            senderId: 'user_002',
            isSelf: false,
            timestamp: '12:45'
        }
    ],
    // 设计师的对话
    'conv_003': [
        {
            id: 'msg_201',
            type: 'text',
            content: '新的首页设计稿好了吗？',
            senderId: 'user_001',
            isSelf: true,
            timestamp: '昨天 10:00'
        },
        {
            id: 'msg_202',
            type: 'text',
            content: '即将完成，再给我半小时',
            senderId: 'user_003',
            isSelf: false,
            timestamp: '昨天 10:05'
        },
        {
            id: 'msg_203',
            type: 'image',
            content: 'https://picsum.photos/400/300?random=2',
            senderId: 'user_003',
            isSelf: false,
            timestamp: '昨天 10:45'
        },
        {
            id: 'msg_204',
            type: 'text',
            content: '设计稿已经更新了，请查收～',
            senderId: 'user_003',
            isSelf: false,
            timestamp: '昨天 10:46'
        }
    ],
    // 技术大佬的对话
    'conv_004': [
        {
            id: 'msg_301',
            type: 'text',
            content: '代码写完了，麻烦帮忙Review一下',
            senderId: 'user_001',
            isSelf: true,
            timestamp: '昨天 16:00'
        },
        {
            id: 'msg_302',
            type: 'text',
            content: '好的，PR链接发我',
            senderId: 'user_004',
            isSelf: false,
            timestamp: '昨天 16:05'
        },
        {
            id: 'msg_303',
            type: 'text',
            content: 'https://github.com/xxx/pr/123',
            senderId: 'user_001',
            isSelf: true,
            timestamp: '昨天 16:06'
        },
        {
            id: 'msg_304',
            type: 'text',
            content: '代码Review完成，LGTM 👍',
            senderId: 'user_004',
            isSelf: false,
            timestamp: '昨天 17:30'
        }
    ],
    // 运营的对话
    'conv_005': [
        {
            id: 'msg_401',
            type: 'text',
            content: '这周的数据报表发你了',
            senderId: 'user_005',
            isSelf: false,
            timestamp: '周一 09:00'
        }
    ],
    // 测试的对话
    'conv_006': [
        {
            id: 'msg_501',
            type: 'text',
            content: '发现了一个严重bug，请尽快修复',
            senderId: 'user_006',
            isSelf: false,
            timestamp: '周一 14:00'
        }
    ]
}

// 获取联系人信息
export function getContactById(contactId) {
    return contacts.find(c => c.id === contactId) || null
}

// 获取对话记录
export function getMessagesByConvId(convId) {
    return messages[convId] || []
}

// 获取对话详情
export function getConversationById(convId) {
    return conversations.find(c => c.id === convId) || null
}
