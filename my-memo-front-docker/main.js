
window.fetchPosts = async function fetchPosts() {
    try {
        // Javaのエンドポイント
        const response = await fetch('http://localhost:8080/api/posts');
        const posts = await response.json();

        // 画面に表示する
        const ListContainer = document.querySelector('#post-list');

        ListContainer.innerHTML = posts.map(post => `
            <div id="post-${post.id}" style="border: 1px solid #646cff; margin: 10px; padding: 10px; border-radius: 8px;">
                <h3 class="title">${post.title}</h3>
                <p class="content">${post.content}</p>
                <small style="color: gray;">${post.createdAt || ''}</small>

                <div class="button-group" style="margin-top: 10px;">
                    <!-- 編集ボタンで編集モードに切り替え -->
                    <button
                        onclick="toggleEdit(${post.id})"
                        style="margin-top: 10px; background-color: #ff4b4b; color: white; border: none; padding: 5px 10px; border-radius: 4px; cursor: pointer;">
                        編集
                    </button>

                    <button
                        onclick="deletePost(${post.id})"
                        style="margin-top: 10px; background-color: #ff4b4b; color: white; border: none; padding: 5px 10px; border-radius: 4px; cursor: pointer;">
                        削除
                    </button>
                </div>

            </div>
        `).join('');
    } catch (error) {
        console.error("データが取れませんでした。Javaは起動してる？:", error);
    }
}

// 実行
fetchPosts();

// 1. 投稿ボタンをクリックした時のイベントを設定
document.querySelector('#submit-btn').addEventListener('click', async () => {

    // 2. フォームからタイトルと内容を取得
    const titleInput = document.querySelector('#post-title');
    const contentInput = document.querySelector('#post-content');

    // 送るデータを作成(JavaのPostクラスの構造に合わせる)
    const newPost = {
        title: titleInput.value,
        content: contentInput.value
    };

    if (!newPost.title) {
        alert("タイトルを入れてね！");
        return;
    }

    try {

        // javaのAPIにPOSTリクエストを送る
        const response = await fetch('http://localhost:8080/api/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newPost)
        });

        if (response.ok) {
            console.log("投稿が成功しました！");
            
            // 入力欄をきれいにする
            titleInput.value = '';
            contentInput.value = '';

            // 一覧を最新の状態に更新する（既存の表示関数を呼ぶ）
            fetchPosts();
        } else {
            alert("投稿に失敗しました。サーバーの状態を確認してね。");
        }
    } catch (error) {
        console.error("投稿の送信に失敗しました。Javaは起動してる？:", error);
    }
},

// 削除用の関数
window.deletePost = async (id) => {
    if (!confirm("本当に削除してもよろしいですか？")) return;

    try {
        const response = await fetch(`http://localhost:8080/api/posts/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            console.log(`ID:${id}の削除に成功しました`);
            // 画面を最新の状態にする
            fetchPosts();
        } else {
            alert("削除に失敗しました。サーバーの状態を確認してね。");
        }
    } catch (error) {
        console.error("通信エラー:", error);
    }
},

// 編集用の関数
window.editPost = async (id) => {
    const newTitle = prompt("新しいタイトルを入力してください");
    const newContent = prompt("新しい内容を入力してください");

    if (newTitle == null || newContent == null) {
        alert("タイトルと内容を入れてください！");
        return;
    }

    try {
        const response = await fetch(`http://localhost:8080/api/posts/${id}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ title: newTitle, content: newContent })
        });
        if (response.ok) {
            fetchPosts();
        }
    } catch (error) {
        console.error("更新失敗:", error);
    }
},

// 編集モードの切り替え関数
window.toggleEdit = (id) => {
    const container = document.querySelector(`#post-${id}`);

    // タイトルと内容の要素を取得
    const currentTitle = container.querySelector('.title').innerText;
    const currentContent = container.querySelector('.content').innerText;

    // containerの中身をまるごと入力フォームに書き換える
    container.innerHTML = `
        <div style="display: flex; flex-direction: column; gap: 10px;">
            <input type="text" id="edit-title-${id}" value="${currentTitle}" style="width: 100%; padding: 5px;">
            <textarea id="edit-content-${id}"style="width: 100%; height: 80px; padding: 5px;">${currentContent}</textarea>
                <div>
                    <button onclick="saveEdit(${id})" style="background-color: #2196f3; color: white; border: none; padding: 8px 15px; border-radius: 4px; cursor: pointer; margin-right: 5px;">保存</button>
                    <button onclick="fetchPosts()"style="background-color: #9e9e9e; color: white; border: none; padding: 8px 15px; border-radius: 4px; cursor: pointer;">キャンセル</button>
                </div>
        </div>
    `;
},

// javaのAPIPUTリクエストを送って保存する
window.saveEdit = async (id) => {
    const newTitle = document.querySelector(`#edit-title-${id}`).value;
    const newContent = document.querySelector(`#edit-content-${id}`).value;

    if (!newTitle) {
        alert("タイトルを入れてね！");
        return;
    }

    try {
        const response = await fetch(`http://localhost:8080/api/posts/${id}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ title: newTitle, content: newContent })
        });

        if (response.ok) {
            console.log(`ID:${id}の更新に成功しました`);
            // 保存が終わったら一覧を再取得して、表示モードに戻す
            window.fetchPosts();
        } else {
            alert("更新に失敗しました。");
        }
    } catch (error) {
        console.error("通信エラー:", error);
    }
}


);