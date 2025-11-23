package org.koder.miniprojectbackend.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class ImageKitResponse {
    public String fileId;
    public String name;
    public int size;
    public VersionInfo versionInfo;
    public String filePath;
    public String url;
    public String fileType;
    public int height;
    public int width;
    public String thumbnailUrl;
    @JsonProperty("AITags")
    public Object aITags;
    public String description;

    public class VersionInfo {
        public String id;
        public String name;
    }
}
