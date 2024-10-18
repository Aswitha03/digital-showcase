
$(document).ready(() => {
  $('#hamburger-menu').click(() => {
      $('#hamburger-menu').toggleClass('active')
      $('#nav-menu').toggleClass('active')
  })
  // Function to initiate fade-in effect for text
function fadeInText() {
  const fadeElements = document.querySelectorAll('.fade-in');
  fadeElements.forEach((element, index) => {
      setTimeout(() => {
          element.style.opacity = '1';
      }, index * 1000); // Delay each fade-in by 1 second
  });
}

// Function to initiate typing effect for the quote
function typingEffect() {
  const quoteElement = document.getElementById('typing-quote');
  quoteElement.style.animationPlayState = 'running';
}

// Trigger animations on page load
window.onload = () => {
  displayRandomQuote();
  fadeInText();
  setTimeout(typingEffect, 3000); // Start typing effect after 3 seconds
};

// Trigger animations for character cards on page load
function triggerCharacterAnimations() {
  const characterCards = document.querySelectorAll('.character-card');
  characterCards.forEach((card, index) => {
      setTimeout(() => {
          card.classList.add('fade-in');
      }, index * 500);
  });
}

window.onload = () => {
  displayRandomQuote();
  fadeInText();
  typingEffect();
  triggerCharacterAnimations();
};

window.onload = () => {
  displayRandomQuote();
  fadeInEffect(); // Trigger the fade-in effect on page load
};

// YouTube API Key
const API_KEY = "YOUR_API_KEY";

// DOM elements
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const videoContainer = document.getElementById('video-container');

// Function to search for a Marvel movie trailer
async function searchTrailer() {
    const query = searchInput.value.trim();
    if (!query) {
        alert("Please enter a movie name.");
        return;
    }

    // Clear the video container
    videoContainer.innerHTML = '<p>Loading trailer...</p>';

    try {
        // Make the search more specific by adding "official trailer" to the search query
        const searchQuery = `${query} official Marvel trailer`;
        const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(searchQuery)}&key=${API_KEY}&type=video&maxResults=1`);
        
        // Check if the response is okay
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        // Check if items are returned
        if (data.items && data.items.length > 0) {
            const videoId = data.items[0].id.videoId;
            displayVideo(videoId);
        } else {
            // Display a message if no results are found
            videoContainer.innerHTML = '<p>No trailer found. Please try another search or check your spelling.</p>';
        }
    } catch (error) {
        console.error("Error fetching trailer:", error);
        videoContainer.innerHTML = '<p>Error loading trailer. Please try again later.</p>';
    }
}

// Function to display the video in the video container
function displayVideo(videoId) {
    videoContainer.innerHTML = `
        <iframe 
            src="https://www.youtube.com/embed/${videoId}" 
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
            allowfullscreen>
        </iframe>
    `;
}

// Event listener for the search button
searchButton.addEventListener('click', searchTrailer);

// Event listener for pressing Enter key in the search input
searchInput.addEventListener('keyup', (event) => {
    if (event.key === "Enter") {
        searchTrailer();
    }
});


// Array of Marvel Cinematic Universe quotes
const marvelQuotes = [
  "I can do this all day. – Captain America",
  "I am Iron Man. – Tony Stark",
  "We are Groot. – Groot",
  "I am inevitable. – Thanos",
  "Wakanda Forever! – T'Challa",
  "With great power, comes great responsibility. – Uncle Ben",
  "Hulk smash! – Hulk",
  "That’s my secret, Captain. I’m always angry. – Bruce Banner",
  "Avengers Assemble! – Captain America",
  "I have nothing to prove to you. – Captain Marvel"
];

// Function to display a random quote
function displayRandomQuote() {
  const randomIndex = Math.floor(Math.random() * marvelQuotes.length);
  const quoteText = document.getElementById("quote-text");
  quoteText.textContent = marvelQuotes[randomIndex];
  
  // Add animation class
  quoteText.classList.add("fade-in");

  // Remove animation class after animation ends
  setTimeout(() => {
      quoteText.classList.remove("fade-in");
  }, 30000); // Adjust to match the animation duration
}

// Display a random quote when the page loads
window.onload = displayRandomQuote;

// Update the quote every 60 seconds
setInterval(displayRandomQuote, 60000);

// Quiz questions and answers
const quizQuestions = [
  {
      question: "Who is the leader of the Avengers?",
      options: ["Iron Man", "Captain America", "Black Widow", "Thor"],
      answerIndex: 1 // Index of the correct answer in the options array
  },
  {
      question: "Which superhero has a shield made of vibranium?",
      options: ["Iron Man", "Black Panther", "Captain America", "Thor"],
      answerIndex: 2
  },
  {
      question: "What is the real name of the superhero Iron Man?",
      options: ["Tony Stark", "Bruce Banner", "Steve Rogers", "Peter Parker"],
      answerIndex: 0
  },
  {
      question: "Which Infinity Stone was embedded in Vision's forehead?",
      options: ["Mind Stone", "Power Stone", "Reality Stone", "Space Stone"],
      answerIndex: 0
  }
];

let currentQuestionIndex = 0; // Track current question index

// DOM elements
const questionTextElement = document.getElementById('question-text');
const optionsListElement = document.getElementById('options-list');
const resultMessageElement = document.getElementById('result-message');
const nextButton = document.getElementById('next-button');
const questionContainer = document.getElementById('question-container');
const resultContainer = document.getElementById('result-container');

// Function to initialize the quiz
function initializeQuiz() {
  displayQuestion();
}

// Function to display the current question
function displayQuestion() {
  const currentQuestion = quizQuestions[currentQuestionIndex];
  questionTextElement.textContent = currentQuestion.question;

  // Clear previous options
  optionsListElement.innerHTML = '';

  // Display options
  currentQuestion.options.forEach((option, index) => {
      const li = document.createElement('li');
      li.textContent = option;
      li.classList.add('option');
      li.setAttribute('data-index', index);
      li.addEventListener('click', checkAnswer);
      optionsListElement.appendChild(li);
  });

  // Show question container
  questionContainer.classList.remove('hidden');
  resultContainer.classList.remove('show');
}

// Function to check selected answer
function checkAnswer(event) {
  const selectedOptionIndex = parseInt(event.target.getAttribute('data-index'));
  const currentQuestion = quizQuestions[currentQuestionIndex];

  if (selectedOptionIndex === currentQuestion.answerIndex) {
      showResultMessage('Correct!', '#4caf50');
  } else {
      showResultMessage('Wrong!', '#f44336');
  }

  // Disable further clicks on options
  optionsListElement.querySelectorAll('.option').forEach(option => {
      option.removeEventListener('click', checkAnswer);
  });

  // Show next button
  nextButton.style.display = 'block';
}

// Function to display result message
function showResultMessage(message, color) {
  resultMessageElement.textContent = message;
  resultMessageElement.style.color = color;
  resultContainer.classList.add('show');
}

// Function to handle next question button click
nextButton.addEventListener('click', () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < quizQuestions.length) {
      displayQuestion();
      nextButton.style.display = 'none';
  } else {
      // End of quiz
      questionContainer.classList.add('hidden');
      resultContainer.classList.remove('show');
      nextButton.style.display = 'none';
      currentQuestionIndex = 0; // Reset quiz
  }
});

// Initialize quiz on page load
window.onload = initializeQuiz;

  // setting owl carousel

  let navText = ["<i class='bx bx-chevron-left'></i>", "<i class='bx bx-chevron-right'></i>"]

  document.getElementById("learn-more-btn").addEventListener("click", function() {
    var extraInfo = document.getElementById("extra-info");
    if (extraInfo.classList.contains("hidden")) {
        extraInfo.classList.remove("hidden");
    } else {
        extraInfo.classList.add("hidden");
    }
});

  $('#hero-carousel').owlCarousel({
      items: 1,
      dots: false,
      loop: true,
      nav:true,
      navText: navText,
      autoplay: true,
      autoplayHoverPause: true
  })

  $('#top-movies-slide').owlCarousel({
      items: 2,
      dots: false,
      loop: true,
      autoplay: true,
      autoplayHoverPause: true,
      responsive: {
          500: {
              items: 3
          },
          1280: {
              items: 4
          },
          1600: {
              items: 6
          }
      }
  })

  $('.movies-slide').owlCarousel({
      items: 2,
      dots: false,
      nav:true,
      navText: navText,
      margin: 15,
      responsive: {
          500: {
              items: 2
          },
          1280: {
              items: 4
          },
          1600: {
              items: 6
          }
      }
  })
})