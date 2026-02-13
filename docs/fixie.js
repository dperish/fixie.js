function fixieResize() {

        var fixies = document.querySelectorAll("[class^='fixie']")

        for (var i = 0; i < fixies.length; i++) {
          var offset = fixies[i].offsetWidth,
              fixieWidth = (fixies[i].getAttribute("data-fixieWidth") * 1.01);
          fixies[i].style.fontSize = (offset / fixieWidth) + "em";
        }

      }

      function fixieMeasure() {

        var fixies = document.querySelectorAll("[class^='fixie']"),
            ruler = document.createElement("code"),
            text = document.createTextNode("");

        ruler.id = "fixieRuler";

        for (var i = 0; i < fixies.length; i++) {

          document.body.insertBefore(ruler, fixies[i]);

          var columns = parseInt(fixies[i].className.split("_")[1]);
          ruler.innerText = new Array(columns + 1).join("F").toString();
          ruler.style.fontSize = fixies[i].style.fontSize;
          fixies[i].setAttribute("data-fixieWidth", ruler.offsetWidth);

          ruler.parentNode.removeChild(ruler);

        }

      }

      function fixieInit() {

        fixieMeasure();
        window.onresize = function () { fixieResize(); };
        fixieResize();

      }

      (function () {
        fixieInit();
      } ());
