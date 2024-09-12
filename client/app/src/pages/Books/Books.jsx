// lib
import { Link }             from 'react-router-dom';

// hooks
import { useFetchAllBooks } from '../../hooks/useFetchAllBooks';

// components
import { BookOptions }      from './BookOptions/BookOptions';

// CSS
import './Books.css';

export function Books() {
    const { data, isLoading } = useFetchAllBooks();
    
    if (isLoading) {    
        return <h1>is loading</h1>
    }

    return (
        <>
            <header>
                <h1 className="title">Books Shop</h1>
                {/* <input type="text" /> */}
            </header>

            {data.length < 1 
            ? <p className='none-book-added'>you have not added any book</p>
            : <section className='grid--section-item-book'>
                {data?.map((book, index) => (
                    <div key={index} className="book-item">
                        <BookOptions bookId={book.id} />

                        <div className='book-img'>
                            {book.cover && <img src={book.cover} alt="Book Cover" className='book-img' />}
                        </div>

                        <div className="book-info">
                            <div className='book-title'><strong>title: </strong>{book.title}</div>
                            <div className='book-description'><strong>description: </strong>{book.description}</div>
                            <div className="book-price"><strong>price: </strong>{book.price}</div>
                        </div>
                    </div>
                ))}
            </section>
            } 

            <Link to='/add'>
                <button className='btn-add'>
                    add
                </button>
            </Link>
        </>
    );
}