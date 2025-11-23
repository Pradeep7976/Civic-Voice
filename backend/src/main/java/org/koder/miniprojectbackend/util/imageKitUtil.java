package org.koder.miniprojectbackend.util;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.koder.miniprojectbackend.entity.ImageKitResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpEntity;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.util.Assert;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestClient;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.http.HttpHeaders;
import tools.jackson.databind.util.JSONPObject;

import java.io.IOException;
import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;
import java.util.Base64;

@Component
public class imageKitUtil {
    @Autowired
    private RestClient restClient;

    @Value("${imagekit.privateKey}")
    private  String privateKey ;

    public  String getCredentials() {
        String username = this.privateKey;
        String password = "";
        String usernameAndPassword = username + ":" + password;
        Charset charset = StandardCharsets.ISO_8859_1;
        String encoded = Base64.getEncoder().encodeToString(usernameAndPassword.getBytes(charset));
        return "Basic " + encoded;
    }

    public  HttpHeaders getHeaders() {
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

        return restClient
                .post()
                .uri(apiUrl)
                .headers(reqHeaders -> reqHeaders.addAll(getHeaders()))
                .body(body)
                .retrieve()
                .body(ImageKitResponse.class);
    }
}