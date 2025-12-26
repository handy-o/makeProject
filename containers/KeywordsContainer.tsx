import Keywords from "@/components/Keywards"

export default function KeywordsContainer() {
    const keywords = {
        top: [
            {
                img: 'https://cdn.pixabay.com/photo/2025/04/23/11/31/ai-generated-9552669_640.png',
                text: '세금'
            },
            {
                img: 'https://cdn.pixabay.com/photo/2025/05/07/09/49/ai-generated-9584676__340.png',
                text: '금리'
            },
            {
                img: 'https://cdn.pixabay.com/photo/2025/05/07/09/49/ai-generated-9584657_640.png',
                text: 'DSR'
            },
            {
                img: 'https://cdn.pixabay.com/photo/2025/05/07/09/49/ai-generated-9584647_640.png',
                text: '주식'
            }
            ,
            {
                img: 'https://cdn.pixabay.com/photo/2025/04/26/16/35/ai-generated-9561566__340.png',
                text: '대출'
            }
        ],
        bottom: [
            {
                img: 'https://cdn.pixabay.com/photo/2025/04/26/16/35/ai-generated-9561566__340.png',
                text: '연말정산'
            },
            {
                img: 'https://cdn.pixabay.com/photo/2025/05/07/09/49/ai-generated-9584657_640.png',
                text: '부동산'
            },
            {
                img: 'https://cdn.pixabay.com/photo/2025/05/07/09/49/ai-generated-9584647_640.png',
                text: '카드'
            },
            {
                img: 'https://cdn.pixabay.com/photo/2025/04/23/11/31/ai-generated-9552669_640.png',
                text: '보안'
            }, {
                img: 'https://cdn.pixabay.com/photo/2025/05/07/09/49/ai-generated-9584676__340.png',
                text: '제테크'
            }
        ]

    }

    return (
        <Keywords items={keywords} />
    )
}