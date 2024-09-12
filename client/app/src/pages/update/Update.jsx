// lib
import axios                           from 'axios';
import { useNavigate }                 from 'react-router-dom';
import { useState }                    from 'react';
import { useParams }                   from 'react-router-dom';
import { useMutation, useQueryClient } from 'react-query';

// components
import { FormU }                       from '../../components/Form/Form';

export function Update() {
    const BOOk_ID = useParams();
    const navigate = useNavigate();
    const queryCliente = useQueryClient();
    const [book, setBook] = useState({
        title: "",
        description: "",
        price: null,
        cover: "",
    })

    function handleChange(e) {
        setBook((prev) => ({...prev, [e.target.name]: e.target.value}));
    }

    async function handleClick(e) {
        e.preventDefault();

        try {
            mutation.mutateAsync(book);
        } catch (error) {
            console.log('function Update: ', error);
        }
    }

    const mutation = useMutation({
        mutationFn: async (book) => {
            await axios.put(`http://localhost:8800/book/update/${BOOk_ID.bookId.slice(3)}`, book);
        },
        onSuccess: () => {
            queryCliente.invalidateQueries(["fetchBooks"]);
            navigate('/'); 
        }
    })

    return (
        <section className="section-add-new-book">
            <FormU 
                sethandleChange={() => handleChange} 
                setHandleClick={() => handleClick}   
                setBtnName={"update "} 
            />
        </section>
    );
}