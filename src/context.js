import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
const AppContext = React.createContext();

const allMealsUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const randomMealUrl = 'https://www.themealdb.com/api/json/v1/1/random.php';


const AppProvider = ({children}) => {
    const [meals, setMeals] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchterm, setsearchterm] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [selectedMeal, setSelectedMeal] = useState(null);

    const getfavoritesfromlocalstorage = () => {
        let favorites = localStorage.getItem('favorites');
        if (favorites) {
            favorites = JSON.parse(localStorage.getItem('favorites'));
        }
        else {
            favorites = [];
        }
        return favorites;
    }
    const [favorites, setFavorites] = useState(getfavoritesfromlocalstorage);
    const closeModal = () => {
        setShowModal(false);
    }
    const fetchMeals = async (url) => {
        setLoading(true);
        try {

            const {data} = await axios(url);
            // const data = await response.json()
            if (data.meals)
                setMeals(data.meals);
            // console.log(data);
            else {
                setMeals([]);
            }
        }
        catch (error) {
            console.log(error.response);
        }
        setLoading(false);
    }
    const fetchRandomMeal = () => {
        fetchMeals(randomMealUrl);

    }
    const selectMeal = (idMeal, favouriteMeal) => {
        let meal;
        if (favouriteMeal) {
            meal = favorites.find((meal) => meal.idMeal === idMeal);
        }
        else {
            meal = meals.find((meal) => meal.idMeal === idMeal);
        }

        setSelectedMeal(meal);
        setShowModal(true);
    }
    const addtofavorites = (idMeal) => {
        const meal = meals.find((meal) => meal.idMeal === idMeal);
        const alreadyfavorites = favorites.find((meal) => meal.idMeal === idMeal);
        if (alreadyfavorites) {
            return
        }
        const updatedfavorites = [...favorites, meal];
        setFavorites(updatedfavorites);
        localStorage.setItem('favorites', JSON.stringify(updatedfavorites));

    }
    const removefavorites = (idMeal) => {
        const updatedfavorites = favorites.filter((meal) => meal.idMeal !== idMeal);
        setFavorites(updatedfavorites);
        localStorage.setItem('favorites', JSON.stringify(updatedfavorites));
    }
    useEffect(() => {

        fetchMeals(allMealsUrl);

    }, [])
    useEffect(() => {
        if (!searchterm)
            return
        fetchMeals(`${allMealsUrl}${searchterm}`);

    }, [searchterm])



    return (<AppContext.Provider value={{
        loading, meals, setsearchterm, fetchRandomMeal, showModal, selectMeal, selectedMeal, closeModal, addtofavorites, removefavorites, favorites
    }} >
        {children}
    </AppContext.Provider>)
}
export const useGlobalContext = () => 
{
    return useContext(AppContext)
}
export { AppContext, AppProvider }