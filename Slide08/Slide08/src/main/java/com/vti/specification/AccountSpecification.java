package com.vti.specification;

import com.vti.entity.Account;
import com.vti.form.AccountFilterForm;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.util.StringUtils;

import javax.persistence.criteria.Predicate;
import java.util.ArrayList;
import java.util.List;

public class AccountSpecification {
    public static Specification<Account> buildSpec(AccountFilterForm form){
        if(form == null) {
            return null;
        }
        return (root, query, builder) -> {
            final List<Predicate> predicates = new ArrayList<>();
            if (StringUtils.hasText(form.getSearch())){
                String pattern = "%" + form.getSearch() + "%";
                predicates.add(builder.or(
                        builder.like(root.get("username"), pattern),
                        builder.like((root.get("department").get("name")), pattern)));
            }
            if(form.getMinId() != null) {
                predicates.add(builder.greaterThanOrEqualTo(root.get("id"), form.getMinId()));
            }
            if(form.getMaxId() != null) {
                predicates.add(builder.lessThanOrEqualTo(root.get("id"), form.getMaxId()));
            }
            return builder.and(predicates.toArray(new Predicate[0]));
        };

    }
}
