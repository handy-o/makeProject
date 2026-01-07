'use client';
import { useProducts } from '../hooks/useProducts';
import Image from 'next/image';
export default function Recommend() {
    const { products, isLoading } = useProducts();
    const tempImg = 'https://cdn.inflearn.com/public/files/posts/0ee179f4-385a-49f5-9da6-bb2089d5ebb9/image.png';
    return (
        <div className='wrap-recommend-products mx-4 my-10'>
            {products.map((product) => (
                <div key={product.id} className="bg flex rounded-2xl overflow-hidden py-2 px-5 justify-between items-center min-h-[80px]" style={{ background: product.bg_color, color: product.text_color }}>
                    <div>
                        <p className='text-xs mb-1' style={{ color: product.text_color }}>{product.description}</p>
                        <p className='font-bold'>{product.name}</p>
                    </div>
                    <div>
                        <Image src={product.icon ?? tempImg} width={60} height={60} alt="" className='h-auto' />
                    </div>
                </div>
            ))}
        </div>
    )
}