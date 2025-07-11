let recipes = JSON.parse(localStorage.getItem('recipes')) || [];

function displayRecipes(filteredRecipes = recipes) {
    let recipeList = document.getElementById('recipeList');
    recipeList.innerHTML = '';
    if (filteredRecipes.length === 0) {
        recipeList.innerHTML = `<p class="text-muted">No recipes found.</p>`;
        return;
    }
    filteredRecipes.forEach((recipe, idx) => {
        let col = document.createElement('div');
        col.className = "col-12 col-md-6 col-lg-4 d-flex";
        col.innerHTML = `
            <div class="recipe-card w-100 d-flex flex-column" style="position:relative; min-height:500px; max-width:450px; margin:auto;">
                ${recipe.image ? `<img src="${recipe.image}" alt="${recipe.name}" class="img-fluid mb-2 w-100" style="height:200px;object-fit:cover;">` : ''}
                <h3>${recipe.name}</h3>
                <p><strong>Ingredients:</strong><br>${recipe.ingredients}</p>
                <p><strong>Instructions:</strong><br>${recipe.instructions}</p>
                <span style="position:absolute; right:1.5rem; bottom:1.5rem; color:#c1a362; font-weight:600;">
                    <strong>Cuisine:</strong> ${recipe.cuisine}
                </span>
                <div class="mt-3 d-flex gap-2" style="position:absolute; left:1.5rem; bottom:1.2rem;">
                    <button class="btn btn-sm btn-warning edit-btn" data-idx="${idx}">Edit</button>
                    <button class="btn btn-sm btn-danger delete-btn" data-idx="${idx}">Delete</button>
                </div>
            </div>
        `;
        recipeList.appendChild(col);
    });

    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            const idx = this.getAttribute('data-idx');
            if (confirm('Are you sure you want to delete this recipe?')) {
                recipes.splice(idx, 1);
                localStorage.setItem('recipes', JSON.stringify(recipes));
                displayRecipes();
            }
        });
    });

    document.querySelectorAll('.edit-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            const idx = this.getAttribute('data-idx');
            let recipe = recipes[idx];
            let newName = prompt("Edit Recipe Name:", recipe.name);
            if (newName === null) return;
            let newImage = prompt("Edit Image URL:", recipe.image);
            if (newImage === null) return;
            let newCuisine = prompt("Edit Cuisine:", recipe.cuisine);
            if (newCuisine === null) return;
            let newIngredients = prompt("Edit Ingredients:", recipe.ingredients);
            if (newIngredients === null) return;
            let newInstructions = prompt("Edit Instructions:", recipe.instructions);
            if (newInstructions === null) return;
            recipes[idx] = {
                name: newName,
                image: newImage,
                cuisine: newCuisine,
                ingredients: newIngredients,
                instructions: newInstructions
            };
            localStorage.setItem('recipes', JSON.stringify(recipes));
            displayRecipes();
        });
    });
}

displayRecipes();

const searchInput = document.getElementById('searchInput');
if (searchInput) {
    searchInput.addEventListener('input', function () {
        const query = this.value.trim().toLowerCase();
        const filtered = recipes.filter(recipe =>
            recipe.name.toLowerCase().includes(query) ||
            recipe.ingredients.toLowerCase().includes(query) ||
            (recipe.cuisine && recipe.cuisine.toLowerCase().includes(query))
        );
        displayRecipes(filtered);
    });
}
