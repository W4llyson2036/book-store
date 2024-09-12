// lib
import axios        from 'axios';
import { useQuery } from 'react-query'; 

async function fetchData() {
    try { 
        const response = await axios.get('http://localhost:8800/');
        
        if (response.status !== 200) { 
            throw new Error('Erro ao tentar obter dados do servidor local :|');
        }

        return response.data;
    } catch(error) {
       console.log(error);
    }
}
                                          
export function useFetchAllBooks() {
    return useQuery({ 
        queryFn: fetchData,  
        queryKey: ['fetchBooks'],
        staleTime: 5 * 60 * 1000,
        cacheTime: 10 * 60 * 1000,
    }); 
}