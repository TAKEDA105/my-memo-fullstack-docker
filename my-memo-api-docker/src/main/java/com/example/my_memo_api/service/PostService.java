package com.example.my_memo_api.service;

import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.example.my_memo_api.entity.Post;
import com.example.my_memo_api.repository.PostRepository;
import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class PostService {

    private final PostRepository postRepository;

    /**
     * 全ての投稿を取得します。
     */
    public List<Post> getAllPosts() {
        return postRepository.findAll();
    }

    public Post savePost(Post post) {
        return postRepository.save(post);
    }

    public void deletePost(Long id) {
        postRepository.deleteById(id);
    }

    public Post updatePost(Long id, Post postDetails) {
        // 1. まず、指定されたIDのデータがあるか確認（なければエラーを投げる）
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Post not found with id: " + id));
        
        // 2. データがあれば、内容を更新して保存_画面から送られてきた内容（postDetails）で、取得したデータを上書き
        post.setTitle(postDetails.getTitle());
        post.setContent(postDetails.getContent());

        // 3. 上書きしたデータを保存（ここで内部的に UPDATE 文が走る）
        return postRepository.save(post);
    }
}