package com.vti.dto;

import com.vti.entity.Account;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProfileDTO {
    private Integer id;
    private Account.Role role;
    private String username;
    private String fullName;
    private String departmentName;
}
