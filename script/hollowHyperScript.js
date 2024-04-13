document.addEventListener("DOMContentLoaded", function () {

    function applyImageHoverEffect(element) {

        function isElementFullyInViewport() { //checks if element fully in viewpoint
            const rect = element.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            const windowWidth = window.innerWidth;

            return ( 
                rect.top >= 0 &&
                rect.bottom <= windowHeight &&
                rect.left >= 0 &&
                rect.right <= windowWidth
            );
        }

        //Animation trigger to unapply greyscale
        document.addEventListener('scroll', () => {
            if (isElementFullyInViewport()) {
                element.style.setProperty('--_p', '75%');
                element.style.filter = 'grayscale(0%)';
            } else {
                element.style.setProperty('--_p', '25%');
                element.style.filter = 'grayscale(100%)';
            }
        });
    }

    applyImageHoverEffect(document.getElementById('mantislords'));
    applyImageHoverEffect(document.getElementById('oom'));
    applyImageHoverEffect(document.getElementById('map'));
    applyImageHoverEffect(document.getElementById('hyper1'));
    applyImageHoverEffect(document.getElementById('radahn'));
    applyImageHoverEffect(document.getElementById('margit'));
    applyImageHoverEffect(document.getElementById('malenia'));


});