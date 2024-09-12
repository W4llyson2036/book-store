import './Form.css';

export function FormU(Prop) {

    return (
        <>
            <form action="">
                <h1 className="teste">{Prop.setBtnName}</h1>
                <input 
                    type="text" 
                    placeholder="title" 
                    onChange={Prop.sethandleChange()}
                    name="title" 
                    required    
                />
                        
                <input 
                    type="text" 
                    placeholder="description" 
                    onChange={Prop.sethandleChange()}
                    name="description" 
                    required
                />
            
                <input 
                    type="number" 
                    placeholder="price" 
                    onChange={Prop.sethandleChange()} 
                    name="price" 
                />
                
                <input 
                    type="text" 
                    placeholder="cover" 
                    onChange={Prop.sethandleChange()} 
                    name="cover" 
                />

                <button onClick={Prop.setHandleClick()} className="form-btn">{Prop.setBtnName}</button>
            </form>
        </>
    );
}