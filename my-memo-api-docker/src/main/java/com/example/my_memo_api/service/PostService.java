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
}