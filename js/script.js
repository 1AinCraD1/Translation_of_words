const words = [
    { english: "behavior", ukrainian: "поведінка" },
    { english: "cook", ukrainian: "готувати" },
	{ english: "train", ukrainian: "потяг" },
	{ english: "ground", ukrainian: "земля" },
	{ english: "space", ukrainian: "космос" },
	{ english: "land", ukrainian: "суша" },
	{ english: "ride a bike", ukrainian: "кататись на велосипеді" },
	{ english: "responsible", ukrainian: "відповідальний" },
	{ english: "foreign", ukrainian: "іноземний" },
	{ english: "victory", ukrainian: "перемога" },
];

let currentStep = 1;
let correctCount = 0;
let incorrectCount = 0;
let usedWords = [];

function getRandomWord() {
    const availableWords = words.filter(word => !usedWords.includes(word));
    if (availableWords.length === 0) {
        usedWords.length = 0;
        return words[Math.floor(Math.random() * words.length)];
    }
    const selectedWord = availableWords[Math.floor(Math.random() * availableWords.length)];
    usedWords.push(selectedWord);
    return selectedWord;
}

function displayWord() {
    const word = getRandomWord();
    $("#word").text(word.english);
    $("#translation").val("");
    $("#progress").text(`${currentStep}/${words.length}`);
}

function checkTranslation() {
    if (currentStep > words.length) {
        return;
    }
    const word = $("#word").text();
    const userTranslation = $("#translation").val().trim().toLowerCase();
    const correctTranslation = words.find(w => w.english === word).ukrainian.toLowerCase();

    if (userTranslation === correctTranslation) {
        correctCount++;
        $("#correctCount").text(`Вірно: ${correctCount}`);
    } else {
        incorrectCount++;
        $("#incorrectCount").text(`Невірно: ${incorrectCount}`);
    }

    currentStep++;

    if (currentStep <= words.length) {
        displayWord();
    } else {
        setTimeout(showResult, 0);
    }
}

function showResult() {
    const accuracy = (correctCount / words.length) * 100;
    const resultMessage = `Вірно: ${correctCount}, Невірно: ${incorrectCount}, Точність: ${accuracy.toFixed(2)}%`;
    $("#result").text(resultMessage);
    alert(resultMessage);

    updateCounters();

    correctCount = 0;
    incorrectCount = 0;

    currentStep = 1;

    displayWord();
}

function updateCounters() {
    $("#correctCount").text(`Вірно: 0`);
    $("#incorrectCount").text(`Невірно: 0`);
}

function navigate(step) {
    currentStep += step;
    if (currentStep < 1) {
        currentStep = 1;
    } else if (currentStep > words.length) {
        currentStep = words.length;
    }
    displayWord();
}

$(document).ready(function () {
    displayWord();

    $("#card").on("click", function () {
        checkTranslation();
    });
});

function navigate(step) {
    const minStep = 1;
    const maxStep = words.length;

    if ((step === -1 && currentStep > minStep) || (step === 1 && currentStep < maxStep)) {
        currentStep += step;
        displayWord();
    }
}
