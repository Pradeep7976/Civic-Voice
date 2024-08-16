package org.koder.miniprojectbackend.util;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.koder.miniprojectbackend.entity.ImageKitResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpEntity;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.util.Assert;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.http.HttpHeaders;

import java.io.IOException;
import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;
import java.util.Base64;

@Component
public class imageKitUtil {

    @Autowired
    private RestTemplate restTemplate;

    @Autowired
    private ObjectMapper objectMapper;

    //    @Value("${imagekit.publicKey}")
    private static final String publicKey = "public_54egNKOJriAp5xKY7+e6SMh+mGo=";

    //    @Value("${imagekit.privateKey}")
    private static final String privateKey = "private_E4UmIvFXD/XV2EIlSIrTwjIgRCA=";

    //        @Value("${Imagekit.UrlEndpoint}")
    private static final String urlEndpoint = "https://ik.imagekit.io/aj4rz7nxsa/";

    public static String getCredentials() {
        String username = privateKey;
        String password = "";
        String usernameAndPassword = username + ":" + password;
        Charset charset = StandardCharsets.ISO_8859_1;
        String encoded = Base64.getEncoder().encodeToString(usernameAndPassword.getBytes(charset));
        return "Basic " + encoded;
    }

    public static HttpHeaders getHeaders() {
        String credential = getCredentials();
        HttpHeaders headers = new HttpHeaders();
        headers.add("Accept-Encoding", "application/json");
        headers.add("Content-Type", MediaType.MULTIPART_FORM_DATA_VALUE);
        headers.add("Authorization", credential);
        return headers;
    }

    public ImageKitResponse uploadFile(MultipartFile multipartFile) throws IOException {

        String apiUrl = "https://upload.imagekit.io/api/v1/files/upload";
        HttpHeaders headers = getHeaders();

        ByteArrayResource resource = new ByteArrayResource(multipartFile.getBytes()) {
            @Override
            public String getFilename() {
                return multipartFile.getOriginalFilename();
            }
        };

        MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
        body.add("file", resource);
        body.add("fileName", multipartFile.getOriginalFilename());
        HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(body, headers);

        ResponseEntity<String> response = restTemplate.postForEntity(apiUrl, requestEntity, String.class);
        String responseBody = response.getBody();

        return objectMapper.readValue(responseBody, ImageKitResponse.class);
    }
}