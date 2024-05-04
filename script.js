var noButton = document.getElementById('no-btn');
var progressBar = document.getElementById('progress-bar');

var questions = [
  "Joshika, Do you believe in love at first sight?",
  "Joshika, Have you ever felt a connection with someone at first sight?",
  "Joshika, Are you good at cooking?",
  "Joshika, Can we be friends at least?",
  "Joshika, Do you know who i am?",

];

var animations = [
  
  "assets/lottie/Pleading.json",
  "assets/lottie/Wink.json",
  "assets/lottie/Party.json",
  "assets/lottie/Smiling.json",
  "assets/lottie/Injuried.json",
  "assets/lottie/Smiling.json",

];

var currentQuestionIndex = 0;

function nextQuestion(answer) {
  // Check if there are more questions
  if (currentQuestionIndex < questions.length - 1) {
    currentQuestionIndex++; // Move to the next question
    document.getElementById('question').textContent = questions[currentQuestionIndex]; // Display the next question

    // Load the corresponding animation for the next question
    loadLottieAnimation(animations[currentQuestionIndex]);
  } else {
    loadLottieAnimation(animations[5]);
    // No more questions, you can handle the end of the survey here
    document.getElementById('question').textContent = "Thank you for completing the survey!";
    // Optionally, you can hide the options/buttons here
    // Hide the options/buttons container
    document.querySelector('.options').style.display = 'none';

    document.querySelector('.endSpeech').textContent = "I really have a crush on you, but I'm not sure if you even know I exist. It's kind of nerve-wracking to confess like this, but it's a dare I couldn't resist. I hope you don't mind me being bold. I guess you might not even find out who I am. Try to find me! Oh, by the way, you might have to do some detective work to figure it out. 😉 If you do happen to find out, please don't be rude about it. Remember, it's all just for fun and a bit of harmless curiosity. Oh, and Also, I want you to know that I don't want any bad stuff to come out of this, just hoping for a good laugh and maybe some good conversation.";
    showEndNotes();
  }

  updateProgressBar(); // Update progress bar
}

function showEndNotes() {
  var endNotes = document.querySelector('.endnotes');
  if (endNotes) {
    endNotes.style.display = 'block';
  }
}
function moveNoButton(event) {
  // Check if the event is a touch event or mouse event
  var touchEvent = event.touches ? event.touches[0] : null;
  var clientX = touchEvent ? touchEvent.clientX : event.clientX;
  var clientY = touchEvent ? touchEvent.clientY : event.clientY;

  // Calculate the position relative to the body
  var offsetX = clientX;
  var offsetY = clientY;

  // Adjust the offsets to allow the button to move more within the body bounds
  var moveFactor = 100; // Adjust this value to control the movement range
  var bodyRect = document.body.getBoundingClientRect();
  var buttonRect = noButton.getBoundingClientRect();

  // Calculate the maximum allowable positions for the button
  var maxX = bodyRect.width - buttonRect.width - moveFactor;
  var maxY = bodyRect.height - buttonRect.height - moveFactor;

  // Ensure the offsets stay within bounds
  offsetX = Math.max(0, Math.min(offsetX, maxX));
  offsetY = Math.max(0, Math.min(offsetY, maxY));

  // Set the button's position relative to the body
  noButton.style.left = offsetX + 'px';
  noButton.style.top = offsetY + 'px';

  // Prevent the button from being stuck in the corner
  if (offsetX === maxX) {
    noButton.style.left = (offsetX - buttonRect.width) + 'px';
  }
  if (offsetY === maxY) {
    noButton.style.top = (offsetY - buttonRect.height) + 'px';
  }
}

function changeButtonText() {
  var noButton = document.getElementById('no-btn');
  noButton.textContent = "You Can't";
}

function preventTouch(event) {
  event.preventDefault();
}
noButton.addEventListener('mousemove', moveNoButton);
noButton.addEventListener('touchmove', moveNoButton);
noButton.addEventListener('touchstart', preventTouch);

function updateProgressBar() {
  var progress = ((currentQuestionIndex + 1) / questions.length) * 100; // Calculate progress percentage
  progressBar.innerHTML = '<div class="progress" style="width:' + progress + '%"></div>'; // Update progress bar
}

// Function to load Lottie animation
function loadLottieAnimation(animationPath) {
  // Get the existing animation container
  var lottieContainer = document.querySelector('.lottie-animation');

  // Remove any existing animation
  while (lottieContainer.firstChild) {
    lottieContainer.removeChild(lottieContainer.firstChild);
  }

  // Initialize Lottie animation
  var animation = bodymovin.loadAnimation({
    container: lottieContainer,
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: animationPath // Path to the animation file
  });
}

// Load the initial Lottie animation when the page loads
loadLottieAnimation(animations[currentQuestionIndex]);

document.addEventListener('click', function(event) {
  // Check if the click event occurred on the "Yes" button
  if (event.target.id === 'yes-btn') {
    nextQuestion('yes');
  }
});


  document.addEventListener('click', function(event) {
    // Get the coordinates of the click event
    var clickX = event.clientX;
    var clickY = event.clientY;

    // Create a new container element for the animation
    var lottieContainer = document.createElement('div');
    lottieContainer.classList.add('lottie-container');
    lottieContainer.style.position = 'absolute';
    lottieContainer.style.left = clickX + 'px';
    lottieContainer.style.top = clickY + 'px';
    lottieContainer.style.transform = 'translate(-50%, -50%)'; // Adjust the position to center the animation on the click
    lottieContainer.style.width = '200px'; // Set the width of the container
    lottieContainer.style.height = '200px'; // Set the height of the container
    document.body.appendChild(lottieContainer);

    // Initialize Lottie in the new container
    var animation = bodymovin.loadAnimation({
      container: lottieContainer,
      renderer: 'svg',
      loop: false,
      autoplay: true,
      path: 'assets/lottie/Love.json' // Path to your animation file
    });

    // Remove the container and animation after animation completion
    animation.addEventListener('complete', function() {
      document.body.removeChild(lottieContainer);
    });
  });

