let recipes = JSON.parse(localStorage.getItem('recipes')) || [];

function displayRecipes() {
    let recipeList = document.getElementById('recipeList');
    recipeList.innerHTML = '';
    if (recipes.length === 0) {
        recipeList.innerHTML = `<p class="text-muted">No recipes found. Add some from the "Add new Recipes" page!</p>`;
        return;
    }
    recipes.forEach(recipe => {
        let col = document.createElement('div');
        col.className = "col-12 col-md-6 col-lg-4 d-flex";
        col.innerHTML = `
            <div class="recipe-card w-100">
                ${recipe.image ? `<img src="${recipe.image}" alt="${recipe.name}" class="img-fluid mb-2">` : ''}
                <h3>${recipe.name}</h3>
                <p><strong>Ingredients:</strong><br>${recipe.ingredients.replace}</p>
                <p><strong>Instructions:</strong><br>${recipe.instructions.replace(, "<br>")}</p>
            </div>
        `;
        recipeList.appendChild(col);
    });
}

displayRecipes();
