
// function that loads the header for all pages
function loadHeader() {
    var header = document.createElement("header");
    var h1 = document.createElement("h1");
    h1.textContent = "HES-SO Vs - 64-31 - HTML/CSS/JavaScript";
    header.appendChild(h1);
  
    var nav = document.createElement("nav");
    var ul = document.createElement("ul");
  
    var hamburgerLi = document.createElement("li");
    hamburgerLi.classList.add("hamburger");
    var hamburgerImg = document.createElement("img");
    hamburgerImg.src = "../../../ressources/site/hamburger_icon.svg";
    hamburgerLi.appendChild(hamburgerImg);
    ul.appendChild(hamburgerLi);
  
    var menuItems = [
      { href: "description.html", text: "Description" },
      { href: "sketch.html", text: "Sketch" },
      { href: "mockup.html", text: "Mockup" },
      { href: "flow.html", text: "Flow" },
      { href: "logbook.html", text: "Logbook" },
      { href: "game.html", text: "Game" },
    ];
  
    menuItems.forEach(function (menuItem) {
      var li = document.createElement("li");
      var a = document.createElement("a");
      a.href = menuItem.href;
      a.textContent = menuItem.text;
      li.appendChild(a);
      ul.appendChild(li);
    });
  
    nav.appendChild(ul);
    header.appendChild(nav);
  
    document.body.insertBefore(header, document.body.firstChild);
  }
  