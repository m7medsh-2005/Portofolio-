var nameWord = "MOHAMED SHERIF";
var roleText = "E-learning Developer";
var startMs = 650;
var maxCharacters = nameWord.length;

var typed = document.getElementById("typed");
var glyphs = [];

for (var i = 0; i < maxCharacters; i++) {
  var glyph = document.createElement("span");
  glyph.className = "glyph empty";
  glyph.dataset.index = i;
  typed.appendChild(glyph);
  makeLetterDraggable(glyph);
  glyphs.push(glyph);
}

function makeLetterDraggable(glyph) {
  var active = false;
  var startX = 0;
  var startY = 0;

  glyph.addEventListener("pointerdown", function(event) {
    if (glyph.classList.contains("empty")) {
      return;
    }
    if (event.button !== undefined && event.button !== 0) {
      return;
    }
    active = true;
    startX = event.clientX;
    startY = event.clientY;
    glyph.setPointerCapture(event.pointerId);
    glyph.classList.remove("releasing");
    glyph.classList.add("is-dragging");
    event.stopPropagation();
  });

  glyph.addEventListener("pointermove", function(event) {
    if (!active) {
      return;
    }
    var dx = event.clientX - startX;
    var dy = event.clientY - startY;
    glyph.style.transform = "translate(" + dx + "px, " + dy + "px) rotate(" + (dx * 0.08) + "deg)";
  });

  function release(event) {
    if (!active) {
      return;
    }
    active = false;
    glyph.classList.remove("is-dragging");
    glyph.classList.add("releasing");
    glyph.style.transform = "";
    setTimeout(function() {
      glyph.classList.remove("releasing");
    }, 650);
    if (glyph.hasPointerCapture(event.pointerId)) {
      glyph.releasePointerCapture(event.pointerId);
    }
  }

  glyph.addEventListener("pointerup", release);
  glyph.addEventListener("pointercancel", release);
}

function setGlyph(glyph, character, index, initial) {
  glyph.classList.remove("ghost", "morph", "empty", "space");
  if (character === undefined) {
    if (glyph.textContent !== "") {
      glyph.classList.add("ghost");
      setTimeout(function() {
        glyph.textContent = "";
        glyph.classList.remove("ghost");
        glyph.classList.add("empty");
      }, 260 + (index * 24));
    } else {
      glyph.classList.add("empty");
    }
    return;
  }
  glyph.textContent = character;
  if (character === " ") {
    glyph.classList.add("space");
  } else {
    glyph.classList.remove("space");
  }
  if (!initial) {
    void glyph.offsetWidth;
    glyph.classList.add("morph");
    setTimeout(function() {
      glyph.classList.remove("morph");
    }, 640);
  }
}

function morphTo(word, initial) {
  for (var i = 0; i < glyphs.length; i++) {
    (function(index) {
      var delay = 0;
      if (initial) {
        delay = index * 38;
      } else {
        delay = index * 42;
      }
      setTimeout(function() {
        setGlyph(glyphs[index], word[index], index, initial);
      }, delay);
    })(i);
  }
}

function typeRoleWithGsap() {
  var el = document.getElementById("gsap-role");
  if (!el || !window.gsap) {
    return;
  }
  var state = { i: 0 };
  el.textContent = "";
  gsap.to(state, {
    i: roleText.length,
    duration: 1.6,
    ease: "power1.inOut",
    delay: 0.15,
    onUpdate: function() {
      var currentNumber = Math.round(state.i);
      el.textContent = roleText.slice(0, currentNumber);
    }
  });
}

function initGsapMotion() {
  if (!window.gsap) {
    return;
  }
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

  gsap.from(".reveal-hero", {
    y: 46,
    opacity: 0,
    duration: 0.9,
    ease: "power3.out",
    stagger: 0.12,
    delay: 0.9
  });

  gsap.to(".hero-inner", {
    yPercent: -10,
    opacity: 0.25,
    ease: "none",
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "bottom top",
      scrub: true
    }
  });

  var revealElements = document.querySelectorAll(".reveal");
  for (var i = 0; i < revealElements.length; i++) {
    var element = revealElements[i];
    gsap.fromTo(
      element,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.85,
        ease: "power3.out",
        scrollTrigger: {
          trigger: element,
          start: "top 88%",
          toggleActions: "play none none none"
        }
      }
    );
  }

  gsap.to("#progress-bar", {
    scaleX: 1,
    ease: "none",
    scrollTrigger: {
      trigger: document.body,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.3
    }
  });

  var navLinks = document.querySelectorAll(".nav-link-gsap");
  for (var j = 0; j < navLinks.length; j++) {
    var link = navLinks[j];
    link.addEventListener("click", function(e) {
      var target = this.getAttribute("data-target") || this.getAttribute("href");
      if (!target || target.indexOf("#") !== 0) {
        return;
      }
      var node = document.querySelector(target);
      if (!node) {
        return;
      }
      e.preventDefault();
      gsap.to(window, {
        duration: 1.1,
        ease: "power3.inOut",
        scrollTo: { y: node, offsetY: 64 }
      });
    });
  }
}

var projectsData = {
  p01: {
    no: "P.01",
    title: "Spot the Phishing Attack",
    sub: "Interactive web course — vanilla JavaScript",
    badges: ["HTML5", "CSS3", "JavaScript"],
    cells: [
      {
        label: "Live website",
        desc: "Play the full phishing-awareness course in your browser.",
        btn: "Open live site →",
        href: "https://m7medsh-2005.github.io/Phishing/"
      },
      {
        label: "Storyboard",
        desc: "Scene-by-scene design: hotspot email inspection, 4 decision scenarios, quiz + results.",
        btn: "Open storyboard",
        href: "Media/Phishing/Spot%20the%20Phishing%20Attack%20-%20Web%20Storyboard.docx",
        download: "Media/Phishing/Spot%20the%20Phishing%20Attack%20-%20Web%20Storyboard.docx",
        downloadBtn: "Download ↓"
      }
    ]
  },
  p02: {
    no: "P.02",
    title: "How to Make Coffee",
    sub: "Beginner-friendly Storyline course",
    badges: ["Articulate Storyline", "SCORM", "Moodle"],
    cells: [
      {
        label: "Storyboard",
        desc: "Scene-by-scene design: drag-and-drop, brewing simulation, scored results.",
        btn: "Open storyboard",
        href: "Media/Coffee%20Course/Coffee%20Storyboard.docx",
        download: "Media/Coffee%20Course/Coffee%20Storyboard.docx",
        downloadBtn: "Download ↓"
      },
      {
        label: "Course link",
        desc: "Launch the full course as a learner.",
        btn: "Open course →",
        href: "https://m7medsh-2005.github.io/coffee-course/"
      },
      {
        label: "Demo video",
        desc: "Watch the course walkthrough.",
        video: "Media/Coffee%20Course/Coffe%20Course.mp4"
      }
    ]
  },
  p03: {
    no: "P.03",
    title: "Learn German Numbers 1–10",
    sub: "Interactive kids' language course",
    badges: ["Articulate Storyline", "Kids Learning"],
    cells: [
      {
        label: "Storyboard",
        desc: "Scene-by-scene design: number cards, sing-along review, quizzes + score screen.",
        btn: "Open storyboard",
        href: "Media/German%20Course/German%20Numbers.docx",
        download: "Media/German%20Course/German%20Numbers.docx",
        downloadBtn: "Download ↓"
      },
      {
        label: "Course link",
        desc: "Storyline course with name-entry greeting and German-language buttons.",
        btn: "Open course →",
        href: "https://m7medsh-2005.github.io/german-numbers/"
      },
      {
        label: "Demo video",
        desc: "Watch the course walkthrough.",
        video: "Media/German%20Course/German%20Course.mp4"
      }
    ]
  }
};

var modalOpen = false;

function buildCellHtml(cell) {
  var html = "";
  if (cell.video !== undefined) {
    var media = "";
    if (!cell.video) {
      media = '<div class="modal-video-ph">Demo video — coming soon</div>';
    } else {
      var isVideoFile = false;
      if (cell.video.indexOf(".mp4") !== -1 || cell.video.indexOf(".webm") !== -1 || cell.video.indexOf(".ogg") !== -1 || cell.video.indexOf(".mov") !== -1) {
        isVideoFile = true;
      }
      if (isVideoFile) {
        media = '<div class="modal-video">' +
          '<video src="' + cell.video + '" controls playsinline preload="metadata"></video>' +
          '<button class="video-fs-btn" data-fs aria-label="Fullscreen">⛶ Fullscreen</button>' +
          '</div>';
      } else {
        media = '<div class="modal-video">' +
          '<iframe src="' + cell.video + '" title="Demo video" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>' +
          '</div>';
      }
    }
    html = '<div class="modal-cell">' +
      '<span class="modal-cell-label">' + cell.label + '</span>' +
      '<p>' + cell.desc + '</p>' +
      media +
      '</div>';
    return html;
  }

  var openButton = "";
  if (cell.href) {
    openButton = '<a class="modal-btn" href="' + cell.href + '" target="_blank" rel="noopener">' + cell.btn + '</a>';
  } else {
    openButton = '<span class="modal-btn is-disabled">Coming soon</span>';
  }

  var downloadButton = "";
  if (cell.download) {
    var downloadText = "Download ↓";
    if (cell.downloadBtn) {
      downloadText = cell.downloadBtn;
    }
    downloadButton = '<a class="modal-btn modal-btn-dl" href="' + cell.download + '" download>' + downloadText + '</a>';
  }

  var actionButtons = "";
  if (downloadButton !== "") {
    actionButtons = '<div class="modal-btn-row">' + openButton + downloadButton + '</div>';
  } else {
    actionButtons = openButton;
  }

  html = '<div class="modal-cell">' +
    '<span class="modal-cell-label">' + cell.label + '</span>' +
    '<p>' + cell.desc + '</p>' +
    actionButtons +
    '</div>';
  return html;
}

function openProject(id) {
  var data = projectsData[id];
  if (!data) {
    return;
  }
  document.getElementById("modal-no").textContent = data.no;
  document.getElementById("modal-title").textContent = data.title;
  document.getElementById("modal-sub").textContent = data.sub;

  var badgesContainer = document.getElementById("modal-badges");
  var badgesHtml = "";
  for (var i = 0; i < data.badges.length; i++) {
    badgesHtml += '<span class="badge-x">' + data.badges[i] + '</span>';
  }
  badgesContainer.innerHTML = badgesHtml;

  var grid = document.getElementById("modal-grid");
  grid.className = "modal-grid cols-" + data.cells.length;

  var cellsHtml = "";
  for (var j = 0; j < data.cells.length; j++) {
    cellsHtml += buildCellHtml(data.cells[j]);
  }
  grid.innerHTML = cellsHtml;

  var overlay = document.getElementById("proj-modal");
  overlay.classList.add("open");
  overlay.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  modalOpen = true;

  if (window.gsap) {
    gsap.fromTo(overlay, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: "power2.out" });
    gsap.fromTo(".modal-card", { y: 46, scale: 0.96 }, { y: 0, scale: 1, duration: 0.5, ease: "power3.out" });
    gsap.fromTo(".modal-cell", { y: 26, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45, stagger: 0.08, delay: 0.1, ease: "power3.out" });
  } else {
    overlay.style.opacity = "1";
  }

  var closeBtn = document.getElementById("modal-close");
  if (closeBtn) {
    closeBtn.focus({ preventScroll: true });
  }
}

function closeProject() {
  if (!modalOpen) {
    return;
  }
  closeFsVideo();
  var overlay = document.getElementById("proj-modal");
  var allVideos = overlay.querySelectorAll("video");
  for (var i = 0; i < allVideos.length; i++) {
    try {
      allVideos[i].pause();
    } catch (e) {}
  }

  function finishClose() {
    overlay.classList.remove("open");
    overlay.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    document.getElementById("modal-grid").innerHTML = "";
    modalOpen = false;
    if (window.ScrollTrigger) {
      ScrollTrigger.refresh();
    }
  }

  if (window.gsap) {
    gsap.to(overlay, {
      opacity: 0,
      duration: 0.25,
      ease: "power2.in",
      onComplete: finishClose
    });
  } else {
    overlay.style.opacity = "0";
    finishClose();
  }
}

function initProjectModal() {
  var cards = document.querySelectorAll(".project-card.is-clickable");
  for (var i = 0; i < cards.length; i++) {
    var card = cards[i];
    card.addEventListener("click", function() {
      var projectId = this.getAttribute("data-project");
      openProject(projectId);
    });
    card.addEventListener("keydown", function(e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        var projectId = this.getAttribute("data-project");
        openProject(projectId);
      }
    });
  }

  var closeButton = document.getElementById("modal-close");
  if (closeButton) {
    closeButton.addEventListener("click", function() {
      closeProject();
    });
  }

  var modalGrid = document.getElementById("modal-grid");
  if (modalGrid) {
    modalGrid.addEventListener("click", function(e) {
      var btn = e.target.closest("[data-fs]");
      if (!btn) {
        return;
      }
      var video = btn.parentElement.querySelector("video");
      if (video) {
        openFsVideo(video);
      }
    });
  }

  var modalOverlay = document.getElementById("proj-modal");
  if (modalOverlay) {
    modalOverlay.addEventListener("click", function(e) {
      if (e.target.id === "proj-modal") {
        closeProject();
      }
    });
  }

  document.addEventListener("keydown", function(e) {
    if (e.key === "Escape") {
      if (document.fullscreenElement || document.webkitFullscreenElement) {
        return;
      }
      closeProject();
    }
  });
}

var fsVideo = null;
var fsHome = null;

function ensureFsStage() {
  var stage = document.getElementById("fs-stage");
  if (!stage) {
    stage = document.createElement("div");
    stage.id = "fs-stage";
    stage.setAttribute("aria-hidden", "true");
    stage.innerHTML = '<button class="modal-close fs-close" id="fs-close" aria-label="Exit fullscreen">✕</button>';
    document.body.appendChild(stage);

    var closeBtn = stage.querySelector("#fs-close");
    if (closeBtn) {
      closeBtn.addEventListener("click", function() {
        closeFsVideo();
      });
    }

    document.addEventListener("fullscreenchange", function() {
      if (!document.fullscreenElement) {
        if (stage.classList.contains("open")) {
          closeFsVideo();
        }
        if (window.ScrollTrigger) {
          ScrollTrigger.refresh();
        }
      }
    });
  }
  return stage;
}

function openFsVideo(video) {
  if (!video) {
    return;
  }
  var requestMethod =
    video.requestFullscreen ||
    video.webkitRequestFullscreen ||
    video.webkitEnterFullscreen ||
    video.msRequestFullscreen;

  if (requestMethod) {
    try {
      var promise = requestMethod.call(video);
      if (promise && typeof promise.catch === "function") {
        promise.catch(function() {
          openFsFallback(video);
        });
      }
      return;
    } catch (err) {
      openFsFallback(video);
      return;
    }
  }
  openFsFallback(video);
}

function openFsFallback(video) {
  var stage = ensureFsStage();
  fsVideo = video;
  fsHome = {
    parent: video.parentNode,
    next: video.nextSibling
  };
  stage.appendChild(video);
  stage.classList.add("open");
  stage.setAttribute("aria-hidden", "false");
  if (stage.requestFullscreen) {
    stage.requestFullscreen().catch(function() {});
  }
  video.play().catch(function() {});
}

function closeFsVideo() {
  var stage = document.getElementById("fs-stage");
  if (!stage || !stage.classList.contains("open")) {
    return;
  }
  if (document.fullscreenElement) {
    document.exitFullscreen().catch(function() {});
  }
  if (fsVideo && fsHome && fsHome.parent) {
    fsHome.parent.insertBefore(fsVideo, fsHome.next);
  }
  fsVideo = null;
  fsHome = null;
  stage.classList.remove("open");
  stage.setAttribute("aria-hidden", "true");
  if (window.ScrollTrigger) {
    ScrollTrigger.refresh();
  }
}

morphTo(nameWord, true);

setTimeout(function() {
  typeRoleWithGsap();
}, startMs + (nameWord.length * 38) + 350);

window.addEventListener("load", function() {
  initGsapMotion();
  initProjectModal();
  var yearElement = document.getElementById("year");
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
  if (window.ScrollTrigger) {
    setTimeout(function() {
      ScrollTrigger.refresh();
    }, 400);
  }
});

window.addEventListener("resize", function() {
  if (window.ScrollTrigger) {
    ScrollTrigger.refresh();
  }
});
