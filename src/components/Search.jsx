import { useState } from "react";
import { useGlobalContext } from "../context";



const Search = (event) => {
    const [text,setText]=useState('');
    const {setsearchterm,fetchRandomMeal}=useGlobalContext();
    const handleChange=(event)=>{
        setText(event.target.value);
    }
    const handlesubmit=(event)=>{
        event.preventDefault();
        if(text)
        {
            setsearchterm(text);
            // setText('');
        }
    }
    const handleRandomMeal=()=>{
        setsearchterm('');
        setText('');
        fetchRandomMeal();
    }
    return (
        
        <header className="search-container">
            <form onSubmit={handlesubmit}>
                <input type='text'  placeholder="type favorite meal" value={text} onChange={handleChange} className="form-input" />
                <button type='submit' className="btn">search</button>
                <button type="button" className="btn btn-hipster" onClick={handleRandomMeal}>surprise me!</button>
            </form>
        </header>
    )
}

export default Search;