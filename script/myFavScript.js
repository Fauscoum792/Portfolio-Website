document.addEventListener("DOMContentLoaded", function () {
    const track = document.getElementById("image-track");
    const images = track.getElementsByClassName("images");
    const imageName = document.getElementById("imageName");
    const imagePercentage = [
        [-100, -66.666, "Hyper Light Drifter", "Colour", "#ca3cca"],
        [-66.666, -33.333, "Elden Ring", "Character Design", "#BDBEB5 "],
        [-33.333, 0, "Hollow Knight", "Enviormental Storytelling", "#35B83D"],
      ];


    window.onmousedown = e => {//tracking when mouse is clicked for start of slider
        track.dataset.mouseDownAt = e.clientX;  
    }

    window.onmouseup = () => {//tracks the position of the slider when you let go of mouse so it dosent reset
        track.dataset.mouseDownAt = "0";
        track.dataset.prevPercentage = track.dataset.percentage; 
    }

    window.onmousemove = e => {  //Moves and animates the image track with mouse drag
        if(track.dataset.mouseDownAt === "0") return; //check if mouse clicked

        const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
            maxDelta = window.innerWidth / 2;//relative position

        const percentage =(mouseDelta / maxDelta) * -100, //percentage of scroll used
            nextPercentage = parseFloat(track.dataset.prevPercentage) + percentage;
            
        const minPercentage = -100; //limits scroll to a range
        const maxPercentage = 10;
        const clampedPercentage = Math.min(Math.max(nextPercentage, minPercentage), maxPercentage);
        track.dataset.percentage = clampedPercentage;
    
        track.animate(
            { transform: `translate(${clampedPercentage}%, -50%)`},
            { duration: 1200, fill: "forwards"}
        );
        

        for(const image of track.getElementsByClassName("image")){ //making the images move within their frame using scroll percentage
            image.animate(
                {objectPosition: `${clampedPercentage + 100}% 50%`}, 
                {duration: 1200, fill: "forwards"} 
            );
        }

        // Update image name based on clamped percentage
        const pair = findFloatPair(clampedPercentage, imagePercentage);
        if (pair) {
            imageName.textContent = pair[2]; // Display the corresponding image name
            gameAspect.textContent = pair[3];
            gameAspect.style.color = pair[4];
        }
    };

    const findFloatPair = (x, pairs) => {  //checking % to see if the center of the screen is within a image
        for (let i = 0; i < pairs.length; i++) {
            const pair = pairs[i];
            if (x >= pair[0] && x <= pair[1]) {
                return pair;
            }
        }
        return null;
      };        

});