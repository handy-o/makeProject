import { BannerItem } from "@/containers/BannerContainer";
interface BannerProps {
    banner: BannerItem | null;
}
export default function Banner({ banner }: BannerProps) {
    if (!banner) return null;
    return (
        <div className="banner m-6 mb-4 mt-10">
            {/* {mockBanner.map((item, idx) => (
                <div key={idx} className="bannerItem"
                    style={{
                        display: 'flex',
                        backgroundColor: item.bgColor,
                        color: item.txtColor,
                        justifyContent: 'space-between',
                        height: '80px',
                        boxSizing: 'border-box',
                        padding: '0 20px',
                        alignItems: 'center',
                        borderRadius: '10px',
                    }}>
                    <div>
                        <p className="text-xs">{item.subTitle}</p>
                        <p className="text-base font-bold">{item.title}</p>
                    </div>

                    <img src={item.icon} alt="" width={60} height={60} />
                </div>
            ))} */}
            <div className="bannerItem"
                style={{
                    display: 'flex',
                    backgroundColor: banner.bgColor,
                    color: banner.txtColor,
                    justifyContent: 'space-between',
                    height: '80px',
                    boxSizing: 'border-box',
                    padding: '0 20px',
                    alignItems: 'center',
                    borderRadius: '10px',
                }}>
                <div className="text-white">
                    <p className="text-xs">{banner.subTitle}</p>
                    <p className="text-base font-bold">{banner.title}</p>
                </div>

                <img src={banner.icon} alt="" width={60} height={60} />
            </div>
        </div>
    )
}