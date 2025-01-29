const welcome = document.querySelector(".welcome");
const main = document.querySelector(".main");
const start = document.querySelector(".startBtn");
const items = document.querySelectorAll(".item");
const resetBtn = document.querySelector(".resetBtn");

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
