interface CategoriesProps {
    tabs?: { key: string; name: string }[]; // ✅ optional & 기본값 처리
    activeKey: string;
    onTabClick: (key: string) => void;
    items?: { title: string; img: string }[]; // ✅ optional & 기본값 처리
}

export default function Categories({
    tabs = [], // ✅ 기본값
    activeKey,
    onTabClick,
    items = [] // ✅ 기본값
}: CategoriesProps) {
    return (
        <div id="category" className="mx-6" style={{ border: '1px solid #cdcdcd', borderRadius: '16px' }}>
            <ul id="categoryList" className="flex gap-2 overflow-x-auto whitespace-nowrap px-3 py-2 scrollbar-hide">
                {(tabs || []).map((tab, idx) => (
                    <li key={idx}
                        onClick={() => onTabClick(tab.key)}
                        className={`flex-none rounded-full px-4 py-2 text-sm cursor-pointer transition
                            ${activeKey === tab.key ? 'bg-black text-white' : 'bg-gray-100 text-gray-700'}`}>{tab.name}</li>
                ))}
            </ul>

            <div id="categoryTab">
                <ul className="">
                    {(items || []).map((data, idx) => (
                        <li key={idx} className="m-4">
                            <img src={data.img} alt="" />
                            <p>{data.title}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}
