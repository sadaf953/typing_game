const wordCategories = {
  fruits: [
    "apple", "banana", "orange", "strawberry", "kiwi", "grape", 
    "melon", "cherry", "peach", "pineapple", "mango", "blueberry", 
    "pear", "watermelon", "plum", "papaya", "coconut", "avocado", 
    "blackberry", "fig", "guava", "dragonfruit", "passionfruit",
    "lemon", "lime", "raspberry", "apricot", "pomegranate", 
    "tangerine", "persimmon", "passion", "starfruit", "elderberry", 
    "gooseberry", "mulberry", "jackfruit", "longan", "rambutan", 
    "durian", "mangosteen", "custardapple", "soursop"
  ],
  programming: [
    "function", "variable", "array", "object", "class", "method", 
    "algorithm", "database", "interface", "inheritance", "polymorphism", 
    "recursion", "debugging", "compiler", "framework", "library", 
    "syntax", "loop", "condition", "module",
    "closure", "promise", "callback", "prototype", "async", 
    "await", "generator", "decorator", "middleware", "lambda", 
    "tuple", "enum", "typedef", "namespace", "singleton", 
    "iterator", "coroutine", "memoization", "blockchain", "refactoring"
  ],
  animals: [
    "lion", "elephant", "giraffe", "zebra", "tiger", "cheetah", 
    "rhinoceros", "hippopotamus", "gorilla", "penguin", "dolphin", 
    "whale", "kangaroo", "koala", "panda", "eagle", "wolf", "fox", 
    "bear", "leopard",
    "jaguar", "hyena", "crocodile", "komodo", "orangutan", 
    "mongoose", "platypus", "sloth", "armadillo", "lemur", 
    "chameleon", "octopus", "narwhal", "gazelle", "bison", 
    "wolverine", "tapir", "capybara", "axolotl", "quokka"
  ],
  countries: [
    "france", "germany", "japan", "canada", "australia", "brazil", 
    "india", "china", "russia", "italy", "spain", "mexico", "egypt", 
    "kenya", "argentina", "sweden", "norway", "denmark", "finland", 
    "switzerland",
    "portugal", "greece", "turkey", "vietnam", "thailand", 
    "indonesia", "philippines", "malaysia", "singapore", "korea", 
    "morocco", "nigeria", "south africa", "new zealand", "iceland", 
    "ireland", "scotland", "belgium", "netherlands", "austria"
  ],
  food: [
    "pizza", "burger", "sushi", "pasta", "salad", "sandwich", 
    "taco", "curry", "noodles", "steak", "sashimi", "risotto", 
    "paella", "lasagna", "ramen", "kebab", "dumpling", "falafel", 
    "quesadilla", "shawarma",
    "spaghetti", "enchilada", "gyoza", "pho", "risotto", 
    "bruschetta", "gnocchi", "tempura", "pad thai", "bibimbap", 
    "moussaka", "pierogi", "ceviche", "tiramisu", "cannoli", 
    "baklava", "croissant", "empanada", "churros", "gelato"
  ]
};

let time = 60;
let score = 0;
let totalTyped = 0;
let correctTyped = 0;
let currentWord = "";
let currentCategory = "fruits";

const timeDisplay = document.getElementById("time");
const scoreDisplay = document.getElementById("score");
const accuracyDisplay = document.getElementById("accuracy");
const wordDisplay = document.getElementById("word-display");
const inputBox = document.getElementById("input-box");
const startButton = document.getElementById("start-button");
const categorySelect = document.getElementById("category-select");

let timerInterval;

// Generate a random word from selected category
function generateWord() {
  const categoryWords = wordCategories[currentCategory];
  const randomIndex = Math.floor(Math.random() * categoryWords.length);
  currentWord = categoryWords[randomIndex];
  wordDisplay.textContent = currentWord;
}

// Start the game
function startGame() {
  // Get selected category
  currentCategory = categorySelect.value;

  time = 60;
  score = 0;
  totalTyped = 0;
  correctTyped = 0;

  inputBox.value = "";
  inputBox.disabled = false;
  inputBox.focus();
  startButton.disabled = true;

  generateWord();
  updateStats();

  timerInterval = setInterval(() => {
    time--;
    updateStats();
    if (time <= 0) {
      endGame();
    }
  }, 1000);
}

// End the game
function endGame() {
  clearInterval(timerInterval);
  inputBox.disabled = true;
  startButton.disabled = false;
  wordDisplay.textContent = `Game Over! Final Score: ${score}`;
}

// Update game stats
function updateStats() {
  timeDisplay.textContent = time;
  scoreDisplay.textContent = score;

  const accuracy = totalTyped > 0 ? Math.round((correctTyped / totalTyped) * 100) : 100;
  accuracyDisplay.textContent = accuracy;
}

// Handle input
inputBox.addEventListener("input", () => {
  const typedText = inputBox.value;
  totalTyped++;

  if (typedText.trim() === currentWord) {
    score++;
    correctTyped++;
    generateWord();
    inputBox.value = "";
  }

  updateStats();
});

// Attach event listener to start button
startButton.addEventListener("click", startGame);
