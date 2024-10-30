import React from 'react'
import absDiet from '../../recipes/30-day-abs.json' 

console.log(absDiet);

const Diet = (props) => {
    console.log(props);
    const { allergies, foodPreferences } = props;

    // Helper function to get meals based on food preferences
    const getMealForPreference = (meal, preference) => {
        return meal[preference] || meal['regular']; // Fallback to 'regular' if preference is not available
    };

    return (
        <>
            <h1>Diet Plan</h1>
            {absDiet.map((item, index) => {
                const preferredBreakfast = getMealForPreference(item.meals.breakfast, foodPreferences);
                const preferredLunch = getMealForPreference(item.meals.lunch, foodPreferences);
                const preferredDinner = getMealForPreference(item.meals.dinner, foodPreferences);
                const preferredSnack1 = getMealForPreference(item.meals.morning_snack, foodPreferences);
                const preferredSnack2 = getMealForPreference(item.meals.afternoon_snack, foodPreferences);

                return (
                    <div key={index}>
                        <h2>Day {item.day}</h2>

                        <div>
                            <h3>Breakfast</h3>
                            <div>Meal: {preferredBreakfast.meal}</div>
                            <div>Calories: {preferredBreakfast.calories}</div>
                            <div>Protein: {preferredBreakfast.protein}</div>
                            <div>Carbs: {preferredBreakfast.carbs}</div>
                            <div>Fats: {preferredBreakfast.fats}</div>
                        </div>

                        <div>
                            <h3>Morning Snack</h3>
                            <div>Meal: {preferredSnack1.meal}</div>
                            <div>Calories: {preferredSnack1.calories}</div>
                            <div>Protein: {preferredSnack1.protein}</div>
                            <div>Carbs: {preferredSnack1.carbs}</div>
                            <div>Fats: {preferredSnack1.fats}</div>
                        </div>

                        <div>
                            <h3>Lunch</h3>
                            <div>Meal: {preferredLunch.meal}</div>
                            <div>Calories: {preferredLunch.calories}</div>
                            <div>Protein: {preferredLunch.protein}</div>
                            <div>Carbs: {preferredLunch.carbs}</div>
                            <div>Fats: {preferredLunch.fats}</div>
                        </div>

                        <div>
                            <h3>Afternoon Snack</h3>
                            <div>Meal: {preferredSnack2.meal}</div>
                            <div>Calories: {preferredSnack2.calories}</div>
                            <div>Protein: {preferredSnack2.protein}</div>
                            <div>Carbs: {preferredSnack2.carbs}</div>
                            <div>Fats: {preferredSnack2.fats}</div>
                        </div>

                        <div>
                            <h3>Dinner</h3>
                            <div>Meal: {preferredDinner.meal}</div>
                            <div>Calories: {preferredDinner.calories}</div>
                            <div>Protein: {preferredDinner.protein}</div>
                            <div>Carbs: {preferredDinner.carbs}</div>
                            <div>Fats: {preferredDinner.fats}</div>
                        </div>
                    </div>
                );
            })}
        </>
    );
}

export default Diet;
