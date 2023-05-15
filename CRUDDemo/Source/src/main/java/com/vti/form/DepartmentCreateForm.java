package com.vti.form;

import com.vti.entity.Department;
import com.vti.validation.AccountUserNameNotExsits;
import com.vti.validation.DepartmentNameNotExsits;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;

import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.PositiveOrZero;
import java.util.List;

@Getter
@Setter
public class DepartmentCreateForm {
    @NotBlank(message = "{DepartmentForm.name.NotBlank}")
    @Length(max = 50, message = "{DepartmentForm.name.Length}")
    @DepartmentNameNotExsits
    private String name;

    @PositiveOrZero(message = "Greater than or equal to zero.")
    @NotNull(message = "not null.")
    private Integer totalMembers;

    @Pattern(   regexp = "DEVELOPER|TESTER|SCRUM_MASTER|PROJECT_MANAGER",
                message = "Department type must be DEVELOPER or TESTER or SCRUM_MASTER or PROJECT_MANAGER.")
    private String type;

    private List<@Valid Account> accounts;

    @Getter
    @Setter
    public static class Account{
        @NotBlank(message = "account username must be NOT blank.")
        @Length(max = 50, message = "Account user name has max 50 characters.")
        @AccountUserNameNotExsits
        private String username;
        private String password;
        private String firstName;
        private String lastName;
        private String role;
    }
}
