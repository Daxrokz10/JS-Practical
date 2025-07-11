let recipes = JSON.parse(localStorage.getItem('recipes')) || [];

let recipeForm = document.getElementById('recipeForm');

recipeForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let rname = document.getElementById('recipeName').value;
    let ringredients = document.getElementById('ingredients').value; 
    let rimage = document.getElementById('image').value;
    let rinstructions = document.getElementById('instructions').value;
    let rcuisine = document.getElementById('cuisine').value; // New field for cuisine type

    let recipe = {
        "name": rname,
        "ingredients": ringredients,
        "image": rimage, 
        "instructions": rinstructions,
        "cuisine": rcuisine
    };
    recipes.push(recipe);
    localStorage.setItem('recipes', JSON.stringify(recipes)); 
    recipeForm.reset(); 
});

