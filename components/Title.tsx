type TitleProps = {
    title: string
    subTitle?: string
}

export default function Title({title, subTitle} : TitleProps) {
    return(
        <div className="m-6 mb-4 mt-10">
            <h4 className="text-xs">{subTitle}</h4>
            <h2 className="text-xl font-bold mt-1">{title}</h2>
        </div>
    )
}