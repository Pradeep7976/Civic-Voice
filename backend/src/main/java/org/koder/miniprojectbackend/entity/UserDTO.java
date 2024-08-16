package org.koder.miniprojectbackend.entity;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class UserDTO {
    private Long uid;
    private String name;
    private Integer age;
    private String phone;
    private String email;
    private String address;
    private String city;
    private String imageurl;
}
