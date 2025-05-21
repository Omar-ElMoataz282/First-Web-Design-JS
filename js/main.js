// Show Ul-List

let bar = document.querySelector(".fa-bars");
let ulList = document.querySelector(".list-links");

bar.onclick = function (e) {
  e.stopPropagation();
  ulList.classList.toggle("open");
};

//Click AnyWhere To Close Ul-List
document.addEventListener("click", (el) => {
  if (el.target !== bar && el.target !== ulList) {
    if (ulList.classList.contains("open")) {
      ulList.classList.remove("open");
    }
  }
});

ulList.onclick = function (e) {
  e.stopPropagation();
};

//////////////////////////////////////////////////////////////////

// Setting-Box
document.querySelector(".setting-box .setting-icon .fa-gear").onclick =
  function () {
    this.classList.toggle("fa-spin");

    document.querySelector(".setting-box").classList.toggle("open");
  };

// Colors-Change And Add Color To Local-Storage

// Add Color To Local-Storage
let mainColor = localStorage.getItem("Main-Color");

if (mainColor !== null) {
  document.documentElement.style.setProperty("--main-color", mainColor);

  document
    .querySelectorAll(".setting-box .setting-container .colors-option li")
    .forEach((el) => {
      el.classList.remove("active");

      if (el.dataset.color === mainColor) {
        el.classList.add("active");
      }
    });
}

// Colors-Change
let colors = document.querySelectorAll(
  ".setting-box .setting-container .colors-option li"
);

colors.forEach((el) => {
  el.addEventListener("click", (e) => {
    document.documentElement.style.setProperty(
      "--main-color",
      e.target.dataset.color
    );

    localStorage.setItem("Main-Color", e.target.dataset.color);

    handleActive(e);
  });
});

/////////////////////////////////////////////////////////////////////////

let backgroundOption = true;

let backgroundInterval;

//Add Background_images To LocalStorage

let backgroundLocalItem = localStorage.getItem("Background-Image");

if (backgroundLocalItem !== null) {
  document
    .querySelectorAll(
      ".setting-box .setting-container .option-box .random-bg span"
    )
    .forEach((element) => {
      element.classList.remove("active");
    });

  if (backgroundLocalItem === "true") {
    backgroundOption = true;

    document.querySelector(".random-bg .yes").classList.add("active");
  } else {
    backgroundOption = false;

    document.querySelector(".random-bg .no").classList.add("active");
  }
}

//Setting Background-Color And Add Active

let bgChange = document.querySelectorAll(
  ".setting-box .setting-container .option-box .random-bg span"
);

bgChange.forEach((el) => {
  el.addEventListener("click", (el) => {
    handleActive(el);

    if (el.target.dataset.background === "yes") {
      backgroundOption = true;
      recognizeImages();
      localStorage.setItem("Background-Image", true);
    } else {
      backgroundOption = false;
      clearInterval(backgroundInterval);
      localStorage.setItem("Background-Image", false);
    }
  });
});

//Change Background-Color

let landingPage = document.querySelector(".header-page");

let imgsArray = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg"];

function recognizeImages() {
  if (backgroundOption === true) {
    backgroundInterval = setInterval(() => {
      let randomNumber = Math.floor(Math.random() * imgsArray.length);

      landingPage.style.backgroundImage =
        'url("img/' + imgsArray[randomNumber] + '")';
    }, 5000);
  }
}

recognizeImages();

//////////////////////////////////////////////////////////////////////////

// Reach The Skills
let skills = document.querySelector(".skills");
let spans = document.querySelectorAll(
  ".skills .container .skill-box .skill-progress span"
);

//Reach The Features
let features = document.querySelector(".features");
let featuresSpans = document.querySelectorAll(
  ".features .container .features-content"
);

//////////////////////////////////
//Top Page Button
let topPage = document.querySelector(".top");

topPage.onclick = function () {
  window.scrollTo({
    top: 0,
  });
};

//////////////////////////////////

window.onscroll = function () {
  //Skills
  if (window.scrollY >= skills.offsetTop - 300) {
    spans.forEach((el) => {
      el.style.width = el.dataset.progress;
    });
  }

  //Features
  if (window.scrollY >= features.offsetTop - 450) {
    featuresSpans.forEach((ele) => {
      ele.classList.add("show");
    });
  }

  //Top Page
  if (window.scrollY >= 900) {
    topPage.style.display = "block";
  } else {
    topPage.style.display = "none";
  }
};

//////////////////////////////////////////////////////////////////////////

//Filter Team

let liList = document.querySelectorAll(".team .container ul li");
let sectionTeams = document.querySelectorAll(
  ".team .container .team-members .member"
);

liList.forEach((li) => {
  li.addEventListener("click", removeAvtive);
  li.addEventListener("click", manageImage);
});

function removeAvtive() {
  liList.forEach((li) => {
    li.classList.remove("active");
    this.classList.add("active");
  });
}

function manageImage() {
  sectionTeams.forEach((team) => {
    team.style.display = "none";
  });
  document.querySelectorAll(this.dataset.team).forEach((team) => {
    team.style.display = "block";
  });
}

//////////////////////////////////////////////////////////////////////////

// Display Images

let allImages = document.querySelectorAll(
  ".gallery .container .images-container img"
);

allImages.forEach((el) => {
  el.addEventListener("click", (e) => {
    //Create Overlay
    let overLay = document.createElement("div");
    overLay.className = "popup-overlay";
    document.body.appendChild(overLay);

    //Create Box Image
    let boxImage = document.createElement("div");
    boxImage.className = "popup-image";

    //Add Alt Text To The Box Image
    if (el.alt !== null) {
      let imageHeader = document.createElement("h3");
      imageHeader.className = "popup-iheader";
      let imageHeaderText = document.createTextNode(el.alt);
      imageHeader.appendChild(imageHeaderText);
      boxImage.appendChild(imageHeader);
    }

    //Create Image In The Box
    let imageInBox = document.createElement("img");
    imageInBox.src = el.src;

    //Create Close Button
    let closeButton = document.createElement("h3");
    closeButton.className = "close-button";
    closeButton.innerHTML = "X";

    boxImage.appendChild(imageInBox);
    boxImage.appendChild(closeButton);

    document.body.appendChild(boxImage);
  });
});

document.addEventListener("click", (e) => {
  if (e.target.className == "close-button") {
    e.target.parentNode.remove();

    document.querySelector(".popup-overlay").remove();
  }

  if (e.target.className == "popup-overlay") {
    e.target.remove();

    document.querySelector(".popup-image").remove();
  }
});

//////////////////////////////////////////////////////////////////////////

//Reset Options

let resetButton = document.querySelector(".reset");

resetButton.addEventListener("click", (el) => {
  localStorage.removeItem("Main-Color");
  localStorage.removeItem("Background-Image");

  window.location.reload();
});

//////////////////////////////////////////////////////////////////////////

// Add And Remove Avtive To Element

function handleActive(ev) {
  // Remove Active Class From All Childrens
  ev.target.parentElement.querySelectorAll(".active").forEach((element) => {
    element.classList.remove("active");
  });

  // Add Active Class On Self
  ev.target.classList.add("active");
}
