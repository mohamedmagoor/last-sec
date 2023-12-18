//https://www.themealdb.com/api/json/v1/1/search.php?s=
//www.themealdb.com/api/json/v1/1/lookup.php?i=52772
//https://www.themealdb.com/api/json/v1/1/categories.php => get categoryyyy
//https://www.themealdb.com/api/json/v1/1/filter.php?c=beef => category details.....
//www.themealdb.com/api/json/v1/1/list.php?i=list

$(document).ready(function () {
  getData();
  $(".loading-screen").fadeOut(1000);
  $(".loading-screen i").fadeOut(1000);
  $("body").css("overflow", "visible");
});

//general variabels...
let closeBtn = document.getElementById("closeBtn");
let openBtn = document.getElementById("openBtn");
let openMenue = document.getElementById("open-menue");
let anmiLinks = document.querySelectorAll(".animi");
let row = document.getElementById("roww");
let categoryBtn = document.getElementById("category");
let areaBtn = document.getElementById("area");
let ingredientBtn = document.getElementById("ingredients");
let contactusBtn = document.getElementById("contactus");
let searchBtn = document.getElementById("search");

//start making the loading screen...

// start making the slider.......
if ((openMenue.style.left = "-270px")) {
  closeBtn.classList.add("d-none");
  openBtn.classList.remove("d-none");
}
closeBtn.addEventListener("click", function () {
  $(openMenue).animate({ left: "-270px" }, 700);
  closeBtn.classList.add("d-none");
  openBtn.classList.remove("d-none");
  for (let i = 0; i < anmiLinks.length; i++) {
    anmiLinks[i].classList.add(
      "animate__animated",
      "animate__fadeOutBottomLeft"
    );
  }
});

openBtn.addEventListener("click", function () {
  $(openMenue).animate({ left: "0px" }, 700);
  closeBtn.classList.remove("d-none");
  openBtn.classList.add("d-none");
  for (let i = 0; i < anmiLinks.length; i++) {
    anmiLinks[i].classList.remove("animate__fadeOutBottomLeft");
    anmiLinks[i].classList.add("animate__fadeInUpBig");
  }
});

$(closeBtn).click(function () {
  $(openMenue).animate({ left: "-270px" }, 500);
  $(closeBtn);
});

//start fetching the api data..........

async function getData() {
  const rowData = await fetch(
    "https://www.themealdb.com/api/json/v1/1/search.php?s="
  );
  const response = await rowData.json();

  console.log(response.meals);
  displayMainFood(response.meals);
}

//display main food in bodyyy....

function displayMainFood(response) {
  let cartona = "";
  for (let i = 0; i < response.length; i++) {
    cartona += `
            <div class="col-md-3 rounded-2">
                <div class="box rounded-2" onclick="displayDetails(${response[i].idMeal})">
                    <img class="w-100 rounded-2" src="${response[i].strMealThumb}" alt="">
                    <div class="overlay text-black">
                        ${response[i].strMeal}
                        
                    </div>
                </div>
            </div>
            
            `;
  }

  document.getElementById("roww").innerHTML = cartona;
}

async function displayDetails(mealId) {
  const apiId = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
  );
  const idResponse = await apiId.json();
  let meals = idResponse.meals;
  // console.log(meals[0].strMeasure1);
  let ingredents = ``;
  for (let i = 1; i < 20; i++) {
    if (meals[0][`strIngredient${i}`]) {
      ingredents += `<li class="alert alert-info m-2 p-1">${
        meals[0][`strIngredient${i}`]
      }${meals[0][`strMeasure${i}`]}</li>`;
    }
  }

  let tags = meals[0].strTags?.split(",");
  if (!tags) tags = [];
  console.log(tags);
  let tagStr = ``;
  for (let i = 0; i < tags.length; i++) {
    tagStr += `
            <li class="alert alert-danger m-2 p-1">${tags[i]}</li>
            `;
  }

  row.innerHTML = "";
  let cartona = `
        <div class="col-md-4 mt-5">
                <img class="w-100 rounded-2" src="${idResponse.meals[0].strMealThumb}" alt="">
                <h2>${idResponse.meals[0].strMeal}</h2>  
            </div>
            <div class="col-md-8 mt-5">
                <h2>Instructions</h2>
                <p> 
                ${idResponse.meals[0].strInstructions}
                    </p>
                    <div><h2><strong>Area</strong> :  ${idResponse.meals[0].strArea} </h2></div>
                    <div><h2><strong>Category </strong> : ${idResponse.meals[0].strCategory}</h2></div>
                    <div><h2><strong>Recipes </strong>:</h2> 
                        <ul class="d-flex g-3 flex-wrap m-0 p-0">
                            ${ingredents} 
                        </ul>
                        <div><h2>Tags :</h2></div>
                        <ul class="d-flex g-3 flex-wrap m-0 p-0">
                       ${tagStr}
                        </ul>
                            <a target="_blank" class="btn btn-success" href="${idResponse.meals[0].strSource}">Source</a>
                            <a target="_blank" class="btn btn-danger" href="${idResponse.meals[0].strYoutube}">Youtube</a>
                    </div>
            </div>
        `;
  $(".loading-screen").fadeIn(500);
  $(".loading-screen i").fadeIn(500);
  //  $("body").css("overflow", "visible")
  row.innerHTML = cartona;
  $(".loading-screen").fadeOut(500);
  $(".loading-screen i").fadeOut(500);
  $("body").css("overflow", "visible");
}

//start display food by category....

async function getCategory() {
  $(".loading-screen").fadeIn(500);
  $(".loading-screen i").fadeIn(500);
  //  $("body").css("overflow", "visible")
  const rowCategory = await fetch(
    "https://www.themealdb.com/api/json/v1/1/categories.php"
  );
  const foodCategory = await rowCategory.json();
  // console.log(foodCategory.categories[0].strCategory);
  let foodName = foodCategory.categories;

  displayFoodCtegory(foodName);
  $(".loading-screen").fadeOut(500);
  $(".loading-screen i").fadeOut(500);
  $("body").css("overflow", "visible");
}
categoryBtn.addEventListener("click", function () {
  getCategory();
});

//start display food by category....

function displayFoodCtegory(foodName) {
  row.innerHTML = ``;
  let cartona = ``;
  for (let i = 0; i < foodName.length; i++) {
    cartona += `
        <div class="col-md-3 ">
        <div class="box bg-transparent">
            <img  class="w-100" src="${foodName[i].strCategoryThumb}" alt="">
            <div onclick="details('${foodName[i].strCategory}')" class="overlay overflow-hidden d-flex flex-column">
                <div class="text-center text-black mb-0 pb-0">${foodName[i].strCategory}</div>
                <p class="text-cat w-100 text-black p-3 text-center">
                ${foodName[i].strCategoryDescription}

                </p>
            </div>
        </div>
    </div>
        
        `;
  }

  row.innerHTML = cartona;
}

async function details(category) {
  $(".loading-screen").fadeIn(500);
  $(".loading-screen i").fadeIn(500);
  //  $("body").css("overflow", "visible")

  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
  );
  let detaieldData = await response.json();
  let finalyData = detaieldData.meals;
  // console.log(finalyData);

  displayDetaildData(finalyData);
  $(".loading-screen").fadeOut(500);
  $(".loading-screen i").fadeOut(500);
  $("body").css("overflow", "visible");
}

function displayDetaildData(finalyData) {
  let cartona = ``;

  for (let i = 0; i < finalyData.length; i++) {
    cartona += `
                <div class="col-md-3">
                <div class="box" onclick="displayEachOneCategory(${finalyData[i].idMeal})">
                    <img class="w-100" src="${finalyData[i].strMealThumb}" alt="">
                    <div class="overlay text-black">
                        ${finalyData[i].strMeal}
                        
                    </div>
                </div>
            </div>
                
                `;
  }
  row.innerHTML = cartona;
}

async function displayEachOneCategory(id) {
  $(".loading-screen").fadeIn(500);
  $(".loading-screen i").fadeIn(500);
  //  $("body").css("overflow", "visible")

  let api = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
  );
  let response = await api.json();

  let meals = response.meals;

  let ingredents = ``;
  for (let i = 1; i < 20; i++) {
    if (meals[0][`strIngredient${i}`]) {
      ingredents += `<li class="alert alert-info m-2 p-1">${
        meals[0][`strIngredient${i}`]
      }${meals[0][`strMeasure${i}`]}</li>`;
    }
  }

  let tags = meals[0].strTags?.split(",");
  if (!tags) tags = [];
  console.log(tags);
  let tagStr = ``;
  for (let i = 0; i < tags.length; i++) {
    tagStr += `
            <li class="alert alert-danger m-2 p-1">${tags[i]}</li>
            `;
  }

  row.innerHTML = "";
  let cartona = `
        <div class="col-md-4 mt-5">
                <img class="w-100 rounded-2" src="${meals[0].strMealThumb}" alt="">
                <h2>${meals[0].strMeal}</h2>  
            </div>
            <div class="col-md-8 mt-5">
                <h2>Instructions</h2>
                <p> 
                ${meals[0].strInstructions}
                    </p>
                    <div><h2><strong>Area</strong> :  ${meals[0].strArea} </h2></div>
                    <div><h2><strong>Category </strong> : ${meals[0].strCategory}</h2></div>
                    <div><h2><strong>Recipes </strong>:</h2> 
                        <ul class="d-flex g-3 flex-wrap m-0 p-0">
                            ${ingredents} 
                        </ul>
                        <div><h2>Tags :</h2></div>
                        <ul class="d-flex g-3 flex-wrap m-0 p-0">
                       ${tagStr}
                        </ul>
                            <a target="_blank" class="btn btn-success" href="${meals[0].strSource}">Source</a>
                            <a target="_blank" class="btn btn-danger" href="${meals[0].strYoutube}">Youtube</a>
                    </div>
            </div>
        `;
  row.innerHTML = cartona;
  $(".loading-screen").fadeOut(500);
  $(".loading-screen i").fadeOut(500);
  $("body").css("overflow", "visible");
}

//start making the area ....

//https://www.themealdb.com/api/json/v1/1/list.php?a=list
//https://www.themealdb.com/api/json/v1/1/filter.php?a=american
//www.themealdb.com/api/json/v1/1/lookup.php?i=52772

async function getArea() {
  $(".loading-screen").fadeIn(500);
  $(".loading-screen i").fadeIn(500);
  //  $("body").css("overflow", "visible")
  let api = await fetch(
    "https://www.themealdb.com/api/json/v1/1/list.php?a=list"
  );
  let response = await api.json();
  let meals = response.meals;
  displayArea(meals);
  $(".loading-screen").fadeOut(500);
  $(".loading-screen i").fadeOut(500);
  $("body").css("overflow", "visible");
}
areaBtn.addEventListener("click", function () {
  getArea();
});

function displayArea(meals) {
  let cartona = ``;
  for (let i = 0; i < meals.length; i++) {
    cartona += `
                <div onclick="displayEachArea('${meals[i].strArea}')" class="col-md-3 text-center pt-5">
                <i class="fa-solid fa-house-laptop text-white icon-area"></i>
                 <h3 class="mt-2">${meals[i].strArea}</h3>
             </div>
                `;
  }
  row.innerHTML = cartona;
}

async function displayEachArea(areaName) {
  $(".loading-screen").fadeIn(500);
  $(".loading-screen i").fadeIn(500);
  //  $("body").css("overflow", "visible")

  let api = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?a=${areaName}`
  );
  let response = await api.json();
  let mealsArea = response.meals;
  let cartona = ``;
  for (let i = 0; i < mealsArea.length; i++) {
    cartona += `

            <div class="col-md-3">
            <div class="box" onclick="displayEachOnearea(${mealsArea[i].idMeal})">
                <img class="w-100" src="${mealsArea[i].strMealThumb}" alt="">
                <div class="overlay text-black">
                    ${mealsArea[i].strMeal}
                    
                </div>
            </div>
        </div>
            
            `;

    row.innerHTML = cartona;
    $(".loading-screen").fadeOut(500);
    $(".loading-screen i").fadeOut(500);
    $("body").css("overflow", "visible");
  }
}

async function displayEachOnearea(idMeal) {
  $(".loading-screen").fadeIn(500);
  $(".loading-screen i").fadeIn(500);
  //  $("body").css("overflow", "visible")

  let api = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`
  );
  let response = await api.json();
  let finalfood = response.meals;
  // console.log(finalfood);
  let ingredents = ``;
  for (let i = 1; i < 20; i++) {
    if (finalfood[0][`strIngredient${i}`]) {
      ingredents += `<li class="alert alert-info m-2 p-1">${
        finalfood[0][`strIngredient${i}`]
      }${finalfood[0][`strMeasure${i}`]}</li>`;
    }
  }

  let tags = finalfood[0].strTags?.split(",");
  if (!tags) tags = [];
  // console.log(tags);
  let tagStr = ``;
  for (let i = 0; i < tags.length; i++) {
    tagStr += `
            <li class="alert alert-danger m-2 p-1">${tags[i]}</li>
            `;
  }

  row.innerHTML = "";
  let cartona = `
        <div class="col-md-4 mt-5">
                <img class="w-100 rounded-2" src="${finalfood[0].strMealThumb}" alt="">
                <h2>${finalfood[0].strMeal}</h2>  
            </div>
            <div class="col-md-8 mt-5">
                <h2>Instructions</h2>
                <p> 
                ${finalfood[0].strInstructions}
                    </p>
                    <div><h2><strong>Area</strong> :  ${finalfood[0].strArea} </h2></div>
                    <div><h2><strong>Category </strong> : ${finalfood[0].strCategory}</h2></div>
                    <div><h2><strong>Recipes </strong>:</h2> 
                        <ul class="d-flex g-3 flex-wrap m-0 p-0">
                            ${ingredents} 
                        </ul>
                        <div><h2>Tags :</h2></div>
                        <ul class="d-flex g-3 flex-wrap m-0 p-0">
                       ${tagStr}
                        </ul>
                            <a target="_blank" class="btn btn-success" href="${finalfood[0].strSource}">Source</a>
                            <a target="_blank" class="btn btn-danger" href="${finalfood[0].strYoutube}">Youtube</a>
                    </div>
            </div>
        `;
  row.innerHTML = cartona;
  $(".loading-screen").fadeOut(500);
  $(".loading-screen i").fadeOut(500);
  $("body").css("overflow", "visible");
}

//start making the ingredents....

//https://www.themealdb.com/api/json/v1/1/list.php?i=list

async function getIngredients() {
  $(".loading-screen").fadeIn(500);
  $(".loading-screen i").fadeIn(500);
  //  $("body").css("overflow", "visible")
  let api = await fetch(
    "https://www.themealdb.com/api/json/v1/1/list.php?i=list"
  );
  let response = await api.json();
  let meals = response.meals;
  // console.log(meals);
  let cartona = ``;

  for (let i = 0; i < 20; i++) {
    cartona += `
            <div onclick="ingredientInfo('${
              meals[i].strIngredient
            }')" class="col-md-3 text-center pt-5">
                <i class="fa-solid fa-drumstick-bite text-white icon-area"></i>
                 <h3 class="mt-2">${meals[i].strIngredient}</h3>
                 <p class="text-center">${meals[i].strDescription.slice(
                   0,
                   108
                 )}</p>
             </div>
            
            `;
  }
  row.innerHTML = cartona;
  $(".loading-screen").fadeOut(500);
  $(".loading-screen i").fadeOut(500);
  $("body").css("overflow", "visible");
}

ingredientBtn.addEventListener("click", function () {
  getIngredients();
});

async function ingredientInfo(idIngredient) {
  $(".loading-screen").fadeIn(500);
  $(".loading-screen i").fadeIn(500);
  //  $("body").css("overflow", "visible")

  let api = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${idIngredient}`
  );
  let response = await api.json();
  let finalIngredient = response.meals;
  //   console.log(finalIngredient[0]);

  let cartona = ``;
  for (let i = 0; i < finalIngredient.length; i++) {
    cartona += `

            <div class="col-md-3">
            <div class="box" onclick="displayEachOneingredient(${finalIngredient[i].idMeal})">
                <img class="w-100" src="${finalIngredient[i].strMealThumb}" alt="">
                <div class="overlay text-black">
                    ${finalIngredient[i].strMeal}
                    
                </div>
            </div>
        </div>
            
            `;

    row.innerHTML = cartona;
    $(".loading-screen").fadeOut(500);
    $(".loading-screen i").fadeOut(500);
    //  $("body").css("overflow", "visible")
  }
}

async function displayEachOneingredient(idMeal) {
  $(".loading-screen").fadeIn(500);
  $(".loading-screen i").fadeIn(500);
  //  $("body").css("overflow", "visible")

  let api = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`
  );
  let response = await api.json();
  let finalEachIngreident = response.meals;
  let ingredents = ``;
  for (let i = 1; i < 20; i++) {
    if (finalEachIngreident[0][`strIngredient${i}`]) {
      ingredents += `<li class="alert alert-info m-2 p-1">${
        finalEachIngreident[0][`strIngredient${i}`]
      }${finalEachIngreident[0][`strMeasure${i}`]}</li>`;
    }
  }

  let tags = finalEachIngreident[0].strTags?.split(",");
  if (!tags) tags = [];
  // console.log(tags);
  let tagStr = ``;
  for (let i = 0; i < tags.length; i++) {
    tagStr += `
            <li class="alert alert-danger m-2 p-1">${tags[i]}</li>
            `;
  }

  row.innerHTML = "";
  let cartona = `
        <div class="col-md-4 mt-5">
                <img class="w-100 rounded-2" src="${finalEachIngreident[0].strMealThumb}" alt="">
                <h2>${finalEachIngreident[0].strMeal}</h2>  
            </div>
            <div class="col-md-8 mt-5">
                <h2>Instructions</h2>
                <p> 
                ${finalEachIngreident[0].strInstructions}
                    </p>
                    <div><h2><strong>Area</strong> :  ${finalEachIngreident[0].strArea} </h2></div>
                    <div><h2><strong>Category </strong> : ${finalEachIngreident[0].strCategory}</h2></div>
                    <div><h2><strong>Recipes </strong>:</h2> 
                        <ul class="d-flex g-3 flex-wrap m-0 p-0">
                            ${ingredents} 
                        </ul>
                        <div><h2>Tags :</h2></div>
                        <ul class="d-flex g-3 flex-wrap m-0 p-0">
                       ${tagStr}
                        </ul>
                            <a target="_blank" class="btn btn-success" href="${finalEachIngreident[0].strSource}">Source</a>
                            <a target="_blank" class="btn btn-danger" href="${finalEachIngreident[0].strYoutube}">Youtube</a>
                    </div>
            </div>
        `;
  row.innerHTML = cartona;
  $(".loading-screen").fadeOut(500);
  $(".loading-screen i").fadeOut(500);
  $("body").css("overflow", "visible");
}

// start making the validation of inputssssssssssssssssssss

function displayContacts() {
  row.innerHTML = `
    <div class="contact min-vh-100 d-flex justify-content-center align-items-center">
                <div class="container w-75 text-center">
                <form action="../connect.php" method="post">
                    <div class="row g-4">
                    
                        <div class="col-md-6">
                            <input id="nameInput" name="name" onkeyup="inputsValidation()" type="text" class="form-control" placeholder="Enter Your Name">
                            <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                                Special characters and numbers not allowed
                            </div>
                        </div>
                        <div class="col-md-6">
                            <input name="email" id="emailInput" onkeyup="inputsValidation()" type="email" class="form-control " placeholder="Enter Your Email">
                            <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
                                Email not valid *exemple@yyy.zzz
                            </div>
                        </div>
                        <div class="col-md-6">
                            <input name="phone" id="phoneInput" onkeyup="inputsValidation()" type="text" class="form-control " placeholder="Enter Your Phone">
                            <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                                Enter valid Phone Number
                            </div>
                        </div>
                        <div class="col-md-6">
                            <input name="age" id="ageInput" onkeyup="inputsValidation()" type="number" class="form-control " placeholder="Enter Your Age">
                            <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
                                Enter valid age
                            </div>
                        </div>
                        <div class="col-md-6">
                            <input name="password"  id="passwordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Enter Your Password">
                            <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
                                Enter valid password *Minimum eight characters, at least one letter and one number:*
                            </div>
                        </div>
                        <div class="col-md-6">
                            <input name="repassword"  id="repasswordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Repassword">
                            <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
                                Enter valid repassword 
                            </div>
                            </div>
                            
                            </div>
                            <button id="submitBtn" disabled class="btn btn-outline-danger px-2 mt-3">Submit</button>
                            </form>
                </div>
            </div>
    
    `;
  document.getElementById("nameInput").addEventListener("focus", () => {
    nameInputTouched = true;
  });

  emailInput.addEventListener("focus", () => {
    emailInputTouched = true;
  });

  passwordInput.addEventListener("focus", () => {
    phoneInputTouched = true;
  });

  ageInput.addEventListener("focus", () => {
    ageInputTouched = true;
  });

  passwordInput.addEventListener("focus", () => {
    passwordInputTouched = true;
  });

  repasswordInput.addEventListener("focus", () => {
    repasswordInputTouched = true;
  });
}

contactusBtn.addEventListener("click", function () {
  displayContacts();
});

let nameInputTouched = false;
let emailInputTouched = false;
let phoneInputTouched = false;
let ageInputTouched = false;
let passwordInputTouched = false;
let repasswordInputTouched = false;

function inputsValidation() {
  if (nameInputTouched) {
    if (nameValidation()) {
      document
        .getElementById("nameAlert")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .getElementById("nameAlert")
        .classList.replace("d-none", "d-block");
    }
  }
  if (emailInputTouched) {
    if (emailValidation()) {
      document
        .getElementById("emailAlert")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .getElementById("emailAlert")
        .classList.replace("d-none", "d-block");
    }
  }

  if (phoneInputTouched) {
    if (phoneValidation()) {
      document
        .getElementById("phoneAlert")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .getElementById("phoneAlert")
        .classList.replace("d-none", "d-block");
    }
  }

  if (ageInputTouched) {
    if (ageValidation()) {
      document
        .getElementById("ageAlert")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .getElementById("ageAlert")
        .classList.replace("d-none", "d-block");
    }
  }

  if (passwordInputTouched) {
    if (passwordValidation()) {
      document
        .getElementById("passwordAlert")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .getElementById("passwordAlert")
        .classList.replace("d-none", "d-block");
    }
  }
  if (repasswordInputTouched) {
    if (repasswordValidation()) {
      document
        .getElementById("repasswordAlert")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .getElementById("repasswordAlert")
        .classList.replace("d-none", "d-block");
    }
  }

  if (
    nameValidation() &&
    emailValidation() &&
    phoneValidation() &&
    ageValidation() &&
    passwordValidation() &&
    repasswordValidation()
  ) {
    submitBtn.removeAttribute("disabled");
  } else {
    submitBtn.setAttribute("disabled", true);
  }
}

function nameValidation() {
  return /^[a-zA-Z ]+$/.test(document.getElementById("nameInput").value);
}

function emailValidation() {
  return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    document.getElementById("emailInput").value
  );
}

function phoneValidation() {
  return /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(
    document.getElementById("phoneInput").value
  );
}

function ageValidation() {
  return /^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(
    document.getElementById("ageInput").value
  );
}

function passwordValidation() {
  return /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(
    document.getElementById("passwordInput").value
  );
}

function repasswordValidation() {
  return (
    document.getElementById("repasswordInput").value ==
    document.getElementById("passwordInput").value
  );
}

// start making the search inputtttt

function showSearchInputs() {
  row.innerHTML = `
    <div class="row py-4 ">
        <div class="col-md-6 ">
            <input id="searchName" onkeyup="searchByName(this.value)" class="form-control bg-transparent text-white" type="text" placeholder="Search By Name">
        </div>
        <div class="col-md-6">
            <input id="letter" onkeyup="searchByFLetter(this.value)" maxlength="1" class="form-control bg-transparent text-white" type="text" placeholder="Search By First Letter">
        </div>
    </div>
        <div class="container">
        <div id="theshow" class="row searchName py-4">
        </div>  
        </div>  
    
    
    `;
}

searchBtn.addEventListener("click", function () {
  showSearchInputs();
});

let searchname = document.getElementById("searchnamee");

async function searchByName(searchName) {
  $(".loading-screen").fadeIn(500);
  $(".loading-screen i").fadeIn(500);

  let api = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchName}`
  );

  let response = await api.json();
  if (response) {
    $(".loading-screen").fadeOut(500);
    $(".loading-screen i").fadeOut(500);
    $("body").css("overflow", "visible");
  }

  let searchNameMeals = response.meals;
  console.log(searchNameMeals);
  let cartona = ``;
  for (let i = 0; i < response.meals.length; i++) {
    cartona += `
            
              <div class="col-md-3">
              <div class="box" onclick="displayEachOneName(${response.meals[i].idMeal})">
                  <img class="w-100" src="${response.meals[i].strMealThumb}" alt="">
                  <div class="overlay text-black">
                      ${response.meals[i].strMeal}
                      
                  </div>
              </div>
              
          </div>
              
              `;
  }
  document.getElementById("theshow").innerHTML = cartona;
  $(".loading-screen").fadeOut(500);
  $(".loading-screen i").fadeOut(500);
  $("body").css("overflow", "visible");
}

async function displayEachOneName(idMeal) {
  $(".loading-screen").fadeIn(500);
  $(".loading-screen i").fadeIn(500);
  // $("body").css("overflow", "visible");
  let api = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`
  );
  let response = await api.json();

  let finalEachIngreident = response.meals;
  let ingredents = ``;
  for (let i = 1; i < 20; i++) {
    if (finalEachIngreident[0][`strIngredient${i}`]) {
      ingredents += `<li class="alert alert-info m-2 p-1">${
        finalEachIngreident[0][`strIngredient${i}`]
      }${finalEachIngreident[0][`strMeasure${i}`]}</li>`;
    }
  }

  let tags = finalEachIngreident[0].strTags?.split(",");
  if (!tags) tags = [];
  // console.log(tags);
  let tagStr = ``;
  for (let i = 0; i < tags.length; i++) {
    tagStr += `
                        <li class="alert alert-danger m-2 p-1">${tags[i]}</li>
                        `;
  }

  row.innerHTML = "";
  let carton = `
                    <div class="col-md-4 mt-5">
                            <img class="w-100 rounded-2" src="${finalEachIngreident[0].strMealThumb}" alt="">
                            <h2>${finalEachIngreident[0].strMeal}</h2>  
                        </div>
                        <div class="col-md-8 mt-5">
                            <h2>Instructions</h2>
                            <p> 
                            ${finalEachIngreident[0].strInstructions}
                                </p>
                                <div><h2><strong>Area</strong> :  ${finalEachIngreident[0].strArea} </h2></div>
                                <div><h2><strong>Category </strong> : ${finalEachIngreident[0].strCategory}</h2></div>
                                <div><h2><strong>Recipes </strong>:</h2> 
                                    <ul class="d-flex g-3 flex-wrap m-0 p-0">
                                        ${ingredents} 
                                    </ul>
                                    <div><h2>Tags :</h2></div>
                                    <ul class="d-flex g-3 flex-wrap m-0 p-0">
                                   ${tagStr}
                                    </ul>
                                        <a target="_blank" class="btn btn-success" href="${finalEachIngreident[0].strSource}">Source</a>
                                        <a target="_blank" class="btn btn-danger" href="${finalEachIngreident[0].strYoutube}">Youtube</a>
                                </div>
                        </div>
                    `;
  row.innerHTML = carton;
  $(".loading-screen").fadeOut(500);
  $(".loading-screen i").fadeOut(500);
  $("body").css("overflow", "visible");
}

//start search by Fletter

async function searchByFLetter(serchFname) {
  $(".loading-screen").fadeIn(500);
  $(".loading-screen i").fadeIn(500);
  // $("body").css("overflow", "visible");
  let letter = document.getElementById("letter").value;
  if (letter === "") {
    $(".loading-screen").fadeOut(500);
    $(".loading-screen i").fadeOut(500);
    $("body").css("overflow", "visible");
  }
  let api = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?f=${serchFname}`
  );
  let response = await api.json();
  let finalSearchFname = response.meals;
  let cartona = ``;
  for (let i = 0; i < response.meals.length; i++) {
    cartona = `
            
              <div class="col-md-3">
              <div class="box" onclick="displayEachOneName(${response.meals[i].idMeal})">
                  <img class="w-100" src="${response.meals[i].strMealThumb}" alt="">
                  <div class="overlay text-black">
                      ${response.meals[i].strMeal}
                      
                  </div>
              </div>
          </div>
              
              `;
  }

  document.getElementById("theshow").innerHTML = cartona;
  $(".loading-screen").fadeOut(500);
  $(".loading-screen i").fadeOut(500);
  $("body").css("overflow", "visible");
}
