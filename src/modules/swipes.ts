import { dispatcher } from './dispatcher';

const swipeMinLengthPx = 15;
const swipeStraightness = 1;

let touchStart = { x: 0, y: 0 };
let touchEnd = { x: 0, y: 0 };

function checkForSwipe() {
    const moveX = touchEnd.x - touchStart.x;
    const moveY = touchEnd.y - touchStart.y;

    if (Math.abs(moveX) > Math.abs(moveY * swipeStraightness)) {
        if (moveX > swipeMinLengthPx) {
            dispatcher.dispatch('swipe-right');
        }
        if (moveX < -swipeMinLengthPx) {
            dispatcher.dispatch('swipe-left');
        }
    }
}

document.addEventListener('touchstart', e => {
    touchStart.x = e.changedTouches[0].screenX;
    touchStart.y = e.changedTouches[0].screenY;
});

document.addEventListener('touchend', e => {
    touchEnd.x = e.changedTouches[0].screenX;
    touchEnd.y = e.changedTouches[0].screenY;
    checkForSwipe();
});
