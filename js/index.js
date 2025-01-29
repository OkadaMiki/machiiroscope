const welcome = document.querySelector(".welcome");
const main = document.querySelector(".main");
const start = document.querySelector(".startBtn");
const items = document.querySelectorAll(".item");
const resetBtn = document.querySelector(".resetBtn");
const nextBtn = document.querySelector(".nextBtn");
const backBtn = document.querySelector(".backBtn");
const texts = document.querySelectorAll(".welcomeText");
let currentText = 0;

// 初期状態設定
texts[currentText].classList.add("active");

// 次へボタンのクリックイベント
nextBtn.addEventListener("click", () => {
    texts[currentText].classList.remove("active"); // 現在のテキストを非表示
    currentText++; // 次のインデックスへ

    // 次のテキストを表示
    texts[currentText].classList.add("active");

    // ボタンの状態を更新
    backBtn.disabled = false; // もどるボタンを有効化
    if (currentText === texts.length - 1) {
        nextBtn.classList.add("hidden"); // 次へボタンを隠す
        startBtn.classList.remove("hidden"); // スタートボタンを表示
    }
});

// もどるボタンのクリックイベント
backBtn.addEventListener("click", () => {
    texts[currentText].classList.remove("active"); // 現在のテキストを非表示
    currentText--; // 前のインデックスへ

    // 前のテキストを表示
    texts[currentText].classList.add("active");

    // ボタンの状態を更新
    nextBtn.classList.remove("hidden"); // 次へボタンを表示
    startBtn.classList.add("hidden"); // スタートボタンを隠す
    if (currentText === 0) {
        backBtn.disabled = true; // もどるボタンを無効化
    }
});

// スタートボタンが押された時
start.addEventListener("click", () => {
    welcome.style.display = "none";
    main.classList.remove("hidden");
});

// ローカルストレージから状態をロードして適用
function loadState() {
    items.forEach((item) => {
        const state = localStorage.getItem(item.dataset.text); // data-text をキーとして使用
        if (state === "clicked") {
            item.classList.add("clicked");
            const textElement = item.nextElementSibling;
            if (textElement) textElement.style.display = "inline-block"; // テキスト表示
        } else if (state === "completed") {
            item.classList.add("completed");
        }
    });
}

// 状態をローカルストレージに保存
function saveState(item, state) {
    localStorage.setItem(item.dataset.text, state);
}

// アイテムのクリックイベントを設定
items.forEach((item) => {
    item.addEventListener("click", () => {
        // "completed" 状態の場合は何もしない
        if (item.classList.contains("completed")) return;

        const textElement = item.nextElementSibling;

        // 状態の切り替え
        if (item.classList.contains("clicked")) {
            // 2回目のクリック: "completed" に切り替え
            item.classList.remove("clicked");
            item.classList.add("completed");
            saveState(item, "completed");
            if (textElement) textElement.style.display = "none"; // テキスト非表示
        } else {
            // 1回目のクリック: "clicked" に切り替え
            item.classList.add("clicked");
            saveState(item, "clicked");
            if (textElement) textElement.style.display = "inline-block"; // テキスト表示
        }
    });
});

// リセットボタンのクリックイベント
resetBtn.addEventListener("click", () => {
    // ローカルストレージをクリア
    localStorage.clear();

    // 全てのアイテムを初期化
    items.forEach((item) => {
        item.classList.remove("clicked", "completed");
        const textElement = item.nextElementSibling;
        if (textElement) textElement.style.display = "none"; // テキスト非表示
    });
});

// ページ読み込み時に状態を適用
window.addEventListener("DOMContentLoaded", loadState);
