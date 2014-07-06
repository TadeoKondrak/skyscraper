// Skyscraper game
// By Tadeo Kondrak
// LICENSE: http://tadeo.mit-license.org


if (localStorage.save) {
    var p = JSON.parse(atob(localStorage.save));
    setTimeout(function () {
        for (var i = 0; i < p.floors; i++) {
            addFloor();
        }
    }, 1000);
} else {
    var p = {
        money: 1000,
        floors: 0,
        floorcost: 1000,
        income: 0
    };
}
gameLoop();

function addFloor() {
    $('#floors').append('|=&nbsp;:::::::::::::&nbsp;=|&nbsp;<br />');
}

function floorUp() {
    if (p.money >= p.floorcost) {
        p.floors++;
        p.money -= p.floorcost;
        p.floorcost = p.floorcost * 1.1;
        p.income = p.floors * 18.75;
        updateView();
        addFloor();
    }
}

function gameLoop() {
    p.money += p.income;
    updateView();
    saveGame();
    if ($('img:hover').length === 0) {
        $('img').stop().fadeTo(100, 0.3);
        setTimeout(function () {
            $('img').stop().fadeTo(100, 1);
        }, 130);
    }
}
if (window.location.hash.slice(0, 14) == '#!/importsave/') {
    p = JSON.parse(atob(window.location.hash.substr(14)));
    gameLoop();
    setTimeout(function () {
        for (var i = 0; i < p.floors; i++) {
            addFloor();
        }
    }, 1000);
    location.hash = '';
    history.pushState({}, "", "/");
}

function updateView() {
    $('#floorCount').html(p.floors);
    $('#floorCost').html(Math.floor(p.floorcost));
    $('#money').html(Math.floor(p.money));
    $('#income').html(Math.floor(p.income));
}

function saveGame() {
    localStorage.save = btoa(JSON.stringify(p));
}

function exportSave() {
    prompt('This is your save. Keep it.', btoa(JSON.stringify(p)));
}

function importSave() {
    p = JSON.parse(atob(prompt('Enter your save here. Your previous save will not be saved.')));
    gameLoop();
    setTimeout(function () {
        for (var i = 0; i < p.floors; i++) {
            addFloor();
        }
    }, 1000);
}

function wipeSave() {
    if (confirm('Are you sure you would like to delete EVERYTHING?')) {
        clearInterval(gameLoopInterval);
        localStorage.save = "";
        alert('Deleted.');
        location.reload();
    } else {
        alert('Cancelled.');
    }
}

var gameLoopInterval = setInterval(gameLoop, 1000);

$(document).ready(function () {
    $(document).keypress(function (event) {
        if (event.keyCode == 10 || event.keyCode == 13) event.preventDefault();
    });
});
