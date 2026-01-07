interface sectionTitleType {
    subTitle: string;
    title: string;

}

export default function SectionTilte(props: sectionTitleType) {
    return (
        <div className="wrap-title my-4 mx-4">
            <h5 className="text-xs mb-1">{props.subTitle}</h5>
            <h2 className="text-xl font-bold">{props.title}</h2>
        </div>

    )
}