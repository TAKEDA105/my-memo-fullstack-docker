
async function fetchPosts() {
    try {
        // Javaのエンドポイント
        const response = await fetch('http://localhost:8080/api/posts');
        const posts = await response.json();

        // 画面に表示する
        const ListContainer = document.querySelector('#post-list');

        ListContainer.innerHTML = posts.map(post => `
            <div style="border: 1px solid #646cff; margin: 10px; padding: 10px; border-radius: 8px;">
                <h3>${post.title}</h3>
                <p>${post.content}</p>
                <small style="color: gray;">${post.createdAt || ''}</small>

                <button
                    onclick="deletePost(${post.id})"
                    style="margin-top: 10px; background-color: #ff4b4b; color: white; border: none; padding: 5px 10px; border-radius: 4px; cursor: pointer;">
                    削除
                </button>
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
}

);