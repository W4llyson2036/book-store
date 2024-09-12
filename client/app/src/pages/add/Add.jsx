// lib
import axios                           from "axios";
import { useState }                    from "react";
import { useNavigate }                 from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";

// components
import { FormU }                       from "../../components/Form/Form";

// CSS
import './add.css';

export function Add() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const [book, setBook] = useState({
        title: "",
        description: "",
        price: null,
        cover: "",
    })

    const handleChange = (e) => {   
        setBook((prev) => ({...prev, [e.target.name]: e.target.value}));
    }

    const mutation = useMutation({
        mutationFn: async (newBook) => {
            await axios.post("http://localhost:8800/newBook", newBook);
        },
        onSuccess: () => {
            // Invalida a query "fetchBooks" para refazer o fetch e obter os dados mais recentes
            queryClient.invalidateQueries(["fetchBooks"]);
            navigate("/");
        }
    })

    const handleClick = async e => {
        e.preventDefault();

        try {   
            // Chama a mutation passando o objeto `book`
            await mutation.mutateAsync(book);
        } catch(error) {
            console.log(error);
        }
    }

    return (
        <section className="section-add-new-book">
            <FormU 
                sethandleChange={() => handleChange} 
                setHandleClick={() => handleClick}   
                setBtnName={"add"} 
                />
        </section>
    );
}