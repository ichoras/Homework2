var DETAIL_IMAGE_SELECTOR = '[data-image-role="target"]';
var DETAIL_TITLE_SELECTOR = '[data-image-role="title"]';
var DETAIL_FRAME_SELECTOR = '[data-image-role="frame"]';
var THUMBNAIL_LINK_SELECTOR = '[data-image-role="trigger"]';
var PREV_ARROW_SELECTOR = '[data-image-role="moveleft"]';
var NEXT_ARROW_SELECTOR = '[data-image-role="moveright"]';
var THUMBNAIL_INDEX = '[data-image-role="number"]';
var HIDDEN_DETAIL_CLASS = 'hidden-detail';
var TINY_EFFECT_CLASS = 'is-tiny';
var ESC_KEY = 27;
var INDEX = 1;

function setDetails(imageUrl, titleText, indexNumber) {
    'use strict';
    var detailImage = document.querySelector(DETAIL_IMAGE_SELECTOR);
    detailImage.setAttribute('src', imageUrl);

    var detailTitle = document.querySelector(DETAIL_TITLE_SELECTOR);
    detailTitle.textContent = titleText;

    var detailIndex = document.querySelector(THUMBNAIL_INDEX);
    detailIndex.textContent = indexNumber;
}

function imageFromThumb(thumbnail) {
    'use strict';
    return thumbnail.getAttribute('data-image-url');
}

function titleFromThumb(thumbnail) {
    'use strict';
    return thumbnail.getAttribute('data-image-title');
}

function indexFromThumb(thumbnail) {
    'use strict';
    if(thumbnail.getAttribute('data-image-number') === "one") {
        INDEX = 1;
    }
    else if(thumbnail.getAttribute('data-image-number') === "two") {
        INDEX = 2;
    }
    else if(thumbnail.getAttribute('data-image-number') === "three") {
        INDEX = 3;
    }
    else if(thumbnail.getAttribute('data-image-number') === "four") {
        INDEX = 4;
    }
    else if(thumbnail.getAttribute('data-image-number') === "five") {
        INDEX = 5;
    }
    return thumbnail.getAttribute('data-image-number');
}

function setDetailsFromThumb(thumbnail) {
    'use strict';
    setDetails(imageFromThumb(thumbnail), titleFromThumb(thumbnail), indexFromThumb(thumbnail));
}

function setDetailsFromPrevArrow(arrow) {
    'use strict';
    if(INDEX === 1) {
        INDEX = 5;
        setDetails("img/otter5.jpg", "To Love Somebody", "5");
    }
    else if(INDEX === 2) {
        INDEX = 1;
        setDetails("img/otter1.jpg", "Stayin' Alive", "1");
    }
    else if(INDEX === 3) {
        INDEX = 2;
        setDetails("img/otter2.jpg", "How Deep Is Your Love", "2");
    }
    else if(INDEX === 4) {
        INDEX = 3;
        setDetails("img/otter3.jpg", "You Should Be Dancing", "3");
    }
    else if(INDEX === 5) {
        INDEX = 4;
        setDetails("img/otter4.jpg", "Night Fever", "4");
    }
}

function setDetailsFromNextArrow(arrow) {
    'use strict';
    if(INDEX === 1) {
        INDEX = 2;
        setDetails("img/otter2.jpg", "How Deep Is Your Love", "2");
    }
    else if(INDEX === 2) {
        INDEX = 3;
        setDetails("img/otter3.jpg", "You Should Be Dancing", "3");
    }
    else if(INDEX === 3) {
        INDEX = 4;
        setDetails("img/otter4.jpg", "Night Fever", "4");
    }
    else if(INDEX === 4) {
        INDEX = 5;
        setDetails("img/otter5.jpg", "To Love Somebody", "5");
    }
    else if(INDEX === 5) {
        INDEX = 1;
        setDetails("img/otter1.jpg", "Stayin' Alive", "1");
    }
}

function addThumbClickHandler(thumb) {
    'use strict';
    thumb.addEventListener('click', function (event) {
        event.preventDefault();
        setDetailsFromThumb(thumb);
        showDetails();
    });
}

function addPrevArrowClickHandler(arrow) {
    'use strict';
    arrow.addEventListener('click', function (event) {
        event.preventDefault();
        setDetailsFromPrevArrow(arrow);
        showDetails();
    });
}

function addNextArrowClickHandler(arrow) {
    'use strict';
    arrow.addEventListener('click', function (event) {
        event.preventDefault();
        setDetailsFromNextArrow(arrow);
        showDetails();
    });
}

function getThumbnailsArray() {
    'use strict';
    var thumbnails = document.querySelectorAll(THUMBNAIL_LINK_SELECTOR);
    var thumbnailArray = [].slice.call(thumbnails);
    return thumbnailArray;
}

function getPrevArrowArray() {
    'use strict';
    var arrows = document.querySelectorAll(PREV_ARROW_SELECTOR);
    var prevArrowArray = [].slice.call(arrows);
    return prevArrowArray;
}

function getNextArrowArray() {
    'use strict';
    var arrows = document.querySelectorAll(NEXT_ARROW_SELECTOR);
    var nextArrowArray = [].slice.call(arrows);
    return nextArrowArray;
}

function hideDetails() {
    'use strict';
    document.body.classList.add(HIDDEN_DETAIL_CLASS);
}

function showDetails() {
    'use strict';
    var frame = document.querySelector(DETAIL_FRAME_SELECTOR);
    document.body.classList.remove(HIDDEN_DETAIL_CLASS);
    frame.classList.add(TINY_EFFECT_CLASS);
    setTimeout(function () {
        frame.classList.remove(TINY_EFFECT_CLASS);
    }, 50);
}

function addKeyPressHandler() {
    'use strict';
    document.body.addEventListener('keyup', function (event) {
        event.preventDefault();
        console.log(event.keyCode);
        if (event.keyCode === ESC_KEY) {
            hideDetails();
        }
    });
}

function initializeEvents() {
    'use strict';
    var thumbnails = getThumbnailsArray();
    thumbnails.forEach(addThumbClickHandler);
    var prevarrow = getPrevArrowArray();
    var nextarrow = getNextArrowArray();
    prevarrow.forEach(addPrevArrowClickHandler);
    nextarrow.forEach(addNextArrowClickHandler);
    addKeyPressHandler();
}

initializeEvents();