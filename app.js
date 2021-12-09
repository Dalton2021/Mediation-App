const app = () => {
	const song = document.querySelector(".song");
	const play = document.querySelector(".play");
	const outline = document.querySelector(".moving-outline circle");
	const video = document.querySelector(".vid-container video");

	//Sounds
	const sounds = document.querySelectorAll(".sound-picker button");
	//Time Display
	const timeDisplay = document.querySelector(".time-display");
	const timeSelect = document.querySelectorAll(".time-select button");
	//Get Length of The Outline
	const outlineLength = outline.getTotalLength();
	//Duration
	let fakeDuration = 600;
	outline.style.strokeDasharray = outlineLength;
	outline.style.strokeDashoffset = outlineLength;

	//Sound Selection
	sounds.forEach(sound => {
		sound.addEventListener('click', function(){
			song.src = this.getAttribute('data-sound')
			video.src = this.getAttribute('data-video')
			checkPlaying(song)
		})
	})

	//Play Sound
	play.addEventListener("click", () => {
		checkPlaying(song);
	});

	//Select Sound
	timeSelect.forEach((option) => {
		option.addEventListener("click", function () {
			fakeDuration = this.getAttribute("data-time");
			timeDisplay.textContent = `${Math.floor(
				fakeDuration / 60
			)}: ${Math.floor(fakeDuration % 60)}`;
		});
	});

	//Stop and play sound
	const checkPlaying = (song) => {
		if (song.paused) {
			song.play();
			play.src = "./svg/pause.svg";
			video.play();
		} else {
			song.pause();
			play.src = "./svg/play.svg";
			video.pause();
		}
	};

	//Circle Animation
	song.ontimeupdate = () => {
		let currentTime = song.currentTime;
		let elapsedTime = fakeDuration - currentTime;
		let seconds = Math.floor(elapsedTime % 60);
		let minutes = Math.floor(elapsedTime / 60);

		//Animate Bar
		let progress =
			outlineLength - (currentTime / fakeDuration) * outlineLength;
		outline.style.strokeDashoffset = progress;

		//Animate Time Text
		timeDisplay.textContent = `${minutes}:${seconds}`;

		if(currentTime >= fakeDuration) {
			song.pause()
			song.currentTime = 0;
			play.src = './svg/play.svg'
			video.pause()
		}
	};
};

app();
