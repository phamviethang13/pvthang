package com.vti.validation;

import com.vti.repository.IAccountRepository;
import org.springframework.beans.factory.annotation.Autowired;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class AccountUserNameNotExsitsValidator implements ConstraintValidator<AccountUserNameNotExsits, String> {
    @Autowired
    private IAccountRepository repository;

    @Override
    public boolean isValid(String username, ConstraintValidatorContext constraintValidatorContext) {
        return !repository.existsByUsername(username);
    }
}
