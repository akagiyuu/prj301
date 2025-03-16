package com.prj301.user.services;

import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.GetObjectRequest;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;
import software.amazon.awssdk.services.s3.model.S3Exception;

import java.io.File;
import java.io.InputStream;

@Service
public class S3Service {
    @Value("${s3.bucket}")
    private String bucketName;

    @Autowired
    private S3Client s3Client;

    public boolean upload(String key, File file) {
        try {
            PutObjectRequest putObjectRequest = PutObjectRequest
                .builder()
                .bucket(bucketName)
                .key(key)
                .build();
            s3Client.putObject(putObjectRequest, RequestBody.fromFile(file));

            return true;
        } catch (S3Exception e) {
            return false;
        }
    }

    public InputStream download(String key) {
        try {
            GetObjectRequest getObjectRequest = GetObjectRequest
                .builder()
                .bucket(bucketName)
                .key(key)
                .build();
            return s3Client.getObject(getObjectRequest);
        } catch (S3Exception e) {
            return null;
        }
    }
}