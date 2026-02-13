function fixieResize() {
    var fixies = document.querySelectorAll("[class^='fixie']");
    
    for (var i = 0; i < fixies.length; i++) {
        var offset = fixies[i].offsetWidth;
        var fixieWidth = parseFloat(fixies[i].getAttribute("data-fixieWidth")) * 1.01;
        if (fixieWidth) {
            fixies[i].style.fontSize = (offset / fixieWidth) + "em";
        }
    }
}

function fixieMeasure() {
    var fixies = document.querySelectorAll("[class^='fixie']");
    
    for (var i = 0; i < fixies.length; i++) {
        var columns = parseInt(fixies[i].className.split("_")[1]);
        
        // Create a temporary ruler element
        var ruler = document.createElement("code");
        ruler.style.position = "absolute";
        ruler.style.visibility = "hidden";
        ruler.style.fontSize = "1em";
        ruler.innerText = new Array(columns + 1).join("F");
        
        document.body.appendChild(ruler);
        fixies[i].setAttribute("data-fixieWidth", ruler.offsetWidth);
        document.body.removeChild(ruler);
    }
}

function fixieInit() {
    fixieMeasure();
    fixieResize();
    
    // Debounced resize handler
    var resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function() {
            fixieResize();
        }, 100);
    });
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', fixieInit);
} else {
    fixieInit();
}
