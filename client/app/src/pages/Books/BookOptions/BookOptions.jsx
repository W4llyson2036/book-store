// lib
import axios                from 'axios';
import { useState }         from 'react';
import {PropTypes}          from 'prop-types';
import { Link }             from 'react-router-dom';

// hook
import { useFetchAllBooks } from '../../../hooks/useFetchAllBooks';

// CSS
import './BookOptions.css';

BookOptions.propTypes = {
    bookId: PropTypes.number.isRequired
}

export function BookOptions(props) {
    const [isBookOptionVisible, setIsBookOptionVisible] = useState(false);
    const { refetch } = useFetchAllBooks();

    async function deleteBook() {
        try {
            await axios.delete(`http://localhost:8800/books/${props.bookId}`);   
            setIsBookOptionVisible(false);
            refetch();

        } catch (error) {
            console.log('function BookOptions: ', error);
        }
    }

    return (
        <>
            <div className="box-book-options">
            {isBookOptionVisible ?
                <div className='drop'>
                    <Link to={`/book/update/id-${props.bookId}`}>
                        <button>update</button>
                    </Link>

                    <button onClick={deleteBook}>
                        delete
                    </button>
                
                    <button onClick={() => setIsBookOptionVisible(pre => !pre)}>
                        <svg className="icon">
                            <use xlinkHref="/public/close.svg#close-icon"></use>
                        </svg>
                    </button>                  
                </div>
                : 
                (<button onClick={() => setIsBookOptionVisible(prev => !prev)}>L_|</button>)}
            </div>
        </>
    );
}