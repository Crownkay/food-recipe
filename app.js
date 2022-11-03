const searchBtn = document.getElementById("search-btn");
const mealList = document.getElementById("meal");
const mealDetailsContent = document.querySelector(".meal-details-content");
const recipeCloseBtn = document.getElementById("recipe-close-btn");
const el = document.getElementById('meal-details');

// Eventlistener
searchBtn.addEventListener("click", getMealList);
mealList.addEventListener("click", getMealRecipe);
recipeCloseBtn.addEventListener("click", () => {
  mealDetailsContent.parentElement.classList.remove("showRecipe");
});

// get meal list that match with the ingredient

function getMealList() {
  let searchInputText = document.getElementById("search-input").value.trim();
  fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputText}`
  )
    .then((response) => response.json())
    .then((data) => {
      let html = "";
      if (data.meals) {
        data.meals.forEach((meal) => {
          html += `
        <div class="meal-item" data-id="${meal.idMeal}">
        <div class="meal-image">
          <img src="${meal.strMealThumb}" alt="food">
        </div>
        <div class="meal-name">
          <h3>${meal.strMeal}</h3>
          <a href="#" class="recipe-btn">Get Recipe</a>
        </div>
      </div>
        `;
        });
        mealList.classList.remove("notFound");
      } else {
        html = "Sorry, the Recipe is not Available!";
        mealList.classList.add("notFound");
      }

      mealList.innerHTML = html;
    });
}

// get recipe for the meal

function getMealRecipe(e) {
  e.preventDefault();
  if (e.target.classList.contains("recipe-btn")) {
    let mealItem = e.target.parentElement.parentElement;
    fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`
    )
      .then((response) => response.json())
      .then((data) => {
        mealRecipeModal(data.meals);
      });
  }
}

// create Modal
function mealRecipeModal(meal) {
  console.log(meal);
  meal = meal[0];
  let newImage = meal.strMealThumb;
  console.log(newImage);
 
  
  el.style.background= "linear-gradient(rgba(0,0,0,.5), rgba(0,0,0,.5)), url("+newImage+")";
  // mealDetailsContent.style.backgroundRepeat = "no-repeat";
  el.style.backgroundSize = "cover";
  
  let html = `
    <p class="recipe-category">${meal.strCategory}</p>
    <h2 class="recipe-title">${meal.strMeal}</h2>
   
    <div class="recipe-instruction">
      <h3>Instructions:</h3>
      <p>${meal.strInstructions}</p>
    </div>
    
    <div class="recipe-link">
      <a href="${meal.strYoutube}" target="_blank">Watch Video</a>
    </div>
   
  `;
  mealDetailsContent.innerHTML = html;
  mealDetailsContent.parentElement.classList.add("showRecipe");

}



// <div class="recipe-image-img">
// <img src="${meal.strMealThumb}" alt="food">
// </div>