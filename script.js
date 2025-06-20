// windowサイズチェック
function logHeights() {
    const windowHeight = window.innerHeight;
    const header = document.querySelector('header');
    const main = document.querySelector('main');
    const footer = document.querySelector('footer');

    console.log('--- サイズ情報 ---');
    console.log('window height:', windowHeight + 'px');
    console.log('header height:', header.offsetHeight + 'px');
    console.log('main height:', main.offsetHeight + 'px');
    console.log('footer height:', footer.offsetHeight + 'px');
}

// ハンバーガーメニュー生成。
function generateHambergerNav() {
    let h1List = document.querySelectorAll("h1");
    let ul = document.querySelector("#slide-menu-ul");
    h1List.forEach((h1E, i = 0) => {
        if (h1E.classList.contains("ignore-index")) return;
        if (!h1E.id) h1E.id = "ht-" + i;
        let liTag = document.createElement("li");
        let aTag = document.createElement("a");
        let txt = document.createTextNode(h1E.textContent);
        aTag.appendChild(txt);
        aTag.href = "#" + h1E.id;
        liTag.appendChild(aTag);
        ul.appendChild(liTag);
        i++;
    });

}

// テスト記事生成。
function genTestH1s() {
    let cc = document.querySelector("#contents-container");
    for (let i = 0; i < 40; i++) {
        let h1 = document.createElement("h1");
        let h1txt = document.createTextNode("h1: " + i);
        h1.appendChild(h1txt);
        let p = document.createElement("p");
        p.classList.add("article-container")
        let ptxt = document.createTextNode(i * 10221);
        let hr = document.createElement("hr");
        p.appendChild(ptxt);
        cc.appendChild(h1);
        cc.appendChild(p);
        cc.appendChild(hr);
    }
}

// 画像プロテクト(よわよわ)
document.addEventListener('contextmenu', function (e) {
    // 右クリックを許可したいクラス。
    const allowed = e.target.closest('.none-protect-image');

    // もしそのクラスが付いていないなら、右クリック無効。
    if (!allowed) {
        e.preventDefault();
        img.setAttribute('draggable', 'false');
        img.addEventListener('dragstart', e => e.preventDefault());

        // コピー禁止。
        img.addEventListener('copy', e => e.preventDefault());

        // 選択を徹底的に無効化(Safari対策)。
        img.addEventListener('mousedown', e => e.preventDefault());
    }
});

// ウィンドウサイズ変更時に実行。
// window.addEventListener('resize', logHeights);

window.onload = () => {
    //genTestH1s();
    // 初期表示で一度実行。
    generateHambergerNav();

    // ハンバーガーメニューの開閉。
    const btn = document.getElementById("menu-toggle");
    const menu = document.querySelector(".slide-menu");
    const main = document.querySelector("main");
    const header = document.querySelector('header');
    const footer = document.querySelector('footer')

    // メニューを開く/閉じる。
    function toggleMenu() {
        console.log((btn.checked) ? "\u001b[32mopen\u001b[0m" : "\u001b[31mclose\u001b[0m");
        menu.classList.toggle("open");
        main.classList.toggle("inactive");
        if (btn.checked) {
            header.classList.add('with-shadow');
            footer.classList.add('with-shadow');
        } else {
            header.classList.remove('with-shadow');
            footer.classList.remove('with-shadow');
        }
    }

    // メニュー開閉の状態に応じて main の状態も更新する。
    btn.addEventListener("change", () => {
        toggleMenu();
    });

    // メニュー外クリック時にメニューを閉じる。
    document.addEventListener("click", function (e) {
        const isInsideMenu = menu.contains(e.target);
        const isMenuButton = btn.contains(e.target);
        const isChecked = btn.checked;  // メニューが開いているかどうか。

        // メニュー外をクリックした場合にメニューを閉じる。
        if (!isInsideMenu && !isMenuButton && isChecked) {
            console.log("\u001b[35mscript\u001b[0m(out): \u001b[31mclose\u001b[0m")
            btn.checked = false;  // メニューを閉じる。
            toggleMenu(); // main の状態も戻す。
        }
    });

    // メニュー内のリンクがクリックされた場合にメニューを閉じる。
    document.querySelectorAll(".slide-menu a").forEach((a) => {
        a.addEventListener("click", (e) => {
            e.preventDefault(); // 通常のジャンプを止める
            const targetId = a.getAttribute("href").replace("#", "");
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: "smooth" });
            }
        
            // メニュー閉じる処理
            setTimeout(() => {
                console.log("\u001b[35mscript\u001b[0m(link): \u001b[31mclose\u001b[0m")
                btn.checked = false;
                toggleMenu();
            }, 100);
        });
    });

    // ×ボタンでもメニューを閉じる
    document.querySelector(".menu-button").addEventListener("click", (e) => {
        e.stopPropagation(); // こいつがないと、外側クリックも反応するので、触っちゃいけません。
        btn.checked = !btn.checked;  // メニュー状態切り替え。
        if (!btn.checked)console.log("\u001b[35mscript\u001b[0m(x): \u001b[31mclose\u001b[0m");
        toggleMenu(); // main の状態も戻す。
    });
}