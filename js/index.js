const items = document.querySelectorAll(".item");

items.forEach((item) => {
    item.addEventListener("click", () => {
        // 既に "completed" クラスがある場合は何もしない
        if (item.classList.contains("completed")) return;

        // "clicked" クラスを持っているかどうかを判定
        if (item.classList.contains("clicked")) {
            // 2回目のクリック: 文字を非表示にして背景をグレーに変更
            item.classList.remove("clicked");
            item.classList.add("completed");
        } else {
            // 1回目のクリック: 文字を表示してアニメーションを停止
            item.classList.add("clicked");
        }
    });
});
