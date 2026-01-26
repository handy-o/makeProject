// import { useState, useEffect } from 'react';
// import { fetchProducts } from '../api/fetchProducts';
// import { Products } from '../types/typeProducts'; 
// export const useProducts = () => {
// const [products, setProducts] = useState<Products[]>([]);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     fetchProducts()
//       .then((data) => setProducts(data))
//       .catch((err) => console.error(err))
//       .finally(() => setIsLoading(false));
//   }, []);

//   return { products, isLoading };
// };

import { useQuery } from '@tanstack/react-query';
import { fetchProducts } from '../api/fetchProducts';
import { Products } from '../types/typeProducts'; 
export const useProducts = () => {
  const {data: products=[], isLoading, error} = useQuery<Products[]>({
    queryKey: ['products'],
    queryFn: fetchProducts,
    staleTime: 1000 * 60 * 5
  })
  return {products, isLoading, error}
  
};