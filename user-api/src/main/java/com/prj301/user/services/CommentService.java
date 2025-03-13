package com.prj301.user.services;

import com.prj301.user.models.dto.comment.CommentRequest;
import com.prj301.user.models.dto.comment.CommentResponse;
import com.prj301.user.models.entity.Book;
import com.prj301.user.models.entity.Comment;
import com.prj301.user.models.entity.User;
import com.prj301.user.repositories.BookRepository;
import com.prj301.user.repositories.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class CommentService {
    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private BookRepository bookRepository;

    public List<CommentResponse> getCommentsById(UUID bookId){
        Book book = bookRepository.findById(bookId)
                .orElseThrow(() -> new RuntimeException("Book Not Found!"));
        List<Comment> comments = commentRepository.findByBook(book);
        return comments.stream().map(this::toRespone).collect(Collectors.toList());
    }

    public CommentResponse addComment(UUID bookId, CommentRequest commentRequest, User user){
        Book book = bookRepository.findById(bookId)
                .orElseThrow(() -> new RuntimeException("Book Not Found!"));
        Comment comment = Comment.builder()
                .book(book)
                .user(user)
                .content(commentRequest.getContent())
                .build();
        Comment savedComment = commentRepository.save(comment);
        return toRespone(savedComment);
    }

    private CommentResponse toRespone(Comment comment){
        return new CommentResponse(
                comment.getId(),
                comment.getUser().getUsername(),
                comment.getContent(),
                comment.getCreatedAt()
        );
    }
}
