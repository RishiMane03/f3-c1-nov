    const hoursInput = document.getElementById("hours");
    const minutesInput = document.getElementById("minutes");
    const secondsInput = document.getElementById("seconds");
    const setButton = document.getElementById("setButton");
    const timersContainer = document.getElementById("timersContainer");
    const timerAudio = document.getElementById("timerAudio");
    const ptag = document.getElementById('ptag')

    setButton.addEventListener("click", function () {

        let all = document.createElement('div')
        all.className = "all";

        let timeLeft = document.createElement("p")
        timeLeft.innerText = "Time Left :"

    ptag.style.display = 'none'
    const hours = parseInt(hoursInput.value) || 0;
    const minutes = parseInt(minutesInput.value) || 0;
    const seconds = parseInt(secondsInput.value) || 0;

    if (hours === 0 && minutes === 0 && seconds === 0) {
        alert("Please enter a valid timer duration.");
        return;
    }

    const timerElement = document.createElement("div");
    timerElement.className = 'newTimer'
    timerElement.classList.add("timer");

    // Calculate total seconds
    const totalSeconds = hours * 3600 + minutes * 60 + seconds;
    let remainingSeconds = totalSeconds;

    // Function to update the timer display
    function updateTimerDisplay() {
        const formattedHours = Math.floor(remainingSeconds / 3600);
        const formattedMinutes = Math.floor((remainingSeconds % 3600) / 60);
        const formattedSeconds = remainingSeconds % 60;
        timerElement.textContent = `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
    }

    updateTimerDisplay();

    // Function to start the timer
    const timerInterval = setInterval(function () {
        if (remainingSeconds === 0) {
        clearInterval(timerInterval);
        //   timerElement.textContent = "Time's up!";
        let h1 = document.createElement('h1')
            h1.className = 'timeUp';
            h1.textContent = "Time's Up!!"
            all.appendChild(h1);
            deleteButton.style.display = "none";
            pauseButton.style.display = "none";
            timeLeft.style.display = "none";
            timerElement.style.display = "none";
            all.style.backgroundColor = "#F0F757"
            h1.style.color = "#34344A"

            let stopBtn = document.createElement('button') 
            stopBtn.className = "stopBtn"
            stopBtn.textContent = "Stop"
            all.appendChild(stopBtn)

            stopBtn.addEventListener('click',()=>{
                stopBtn.parentElement.remove()
            })

        timerAudio.play(); // Play audio when the timer completes
        } else {
        remainingSeconds--;
        updateTimerDisplay();
        }
    }, 1000);

    // Delete button
    const deleteButton = document.createElement("button");
    deleteButton.className = "deleteBtn"
    deleteButton.classList.add("delete-button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", function () {
        clearInterval(timerInterval);
        deleteButton.parentElement.remove();
        timerElement.remove();
        deleteButton.remove();
        pauseButton.remove();
        timeLeft.remove();
    });

    // Pause button
    const pauseButton = document.createElement("button");
    pauseButton.className = "pauseBtn"
    pauseButton.classList.add("pause-button");
    pauseButton.textContent = "Pause";
    let isPaused = false;
    pauseButton.addEventListener("click", function () {
        if (isPaused) {
        // Resume the timer
        timerInterval = setInterval(function () {
            if (remainingSeconds === 0) {
            clearInterval(timerInterval);
            timerElement.textContent = "Time's up!";
            timerAudio.play();
            } else {
            remainingSeconds--;
            updateTimerDisplay();
            }
        }, 1000);
        isPaused = false;
        pauseButton.textContent = "Pause";
        } else {
        // Pause the timer
        clearInterval(timerInterval);
        isPaused = true;
        pauseButton.textContent = "Resume";
        }
    });

    // Append the timer, delete button, and pause button to the container
    all.appendChild(timeLeft);
    all.appendChild(timerElement);
    all.appendChild(deleteButton);
    all.appendChild(pauseButton);
    timersContainer.appendChild(all)

    // Clear input fields
    hoursInput.value = "";
    minutesInput.value = "";
    secondsInput.value = "";
    });
