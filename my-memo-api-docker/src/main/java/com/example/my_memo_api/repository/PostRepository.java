package com.example.my_memo_api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.my_memo_api.entity.Post;

/**
 * 投稿テーブル（posts）へのデータアクセスを担うインターフェース
 */
@Repository
public interface PostRepository extends JpaRepository<Post, Long> {
    // 継承するだけで、基本的な保存・検索・削除のメソッドが自動で作られる！
}

