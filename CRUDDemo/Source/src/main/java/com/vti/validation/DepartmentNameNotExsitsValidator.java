package com.vti.validation;

import com.vti.repository.IDepartmentRepository;
import org.springframework.beans.factory.annotation.Autowired;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class DepartmentNameNotExsitsValidator implements ConstraintValidator<DepartmentNameNotExsits, String> {
    @Autowired
    private IDepartmentRepository repository;

    @Override
    public boolean isValid(String name, ConstraintValidatorContext context) {
        return !repository.existsByName(name);
    }
}
