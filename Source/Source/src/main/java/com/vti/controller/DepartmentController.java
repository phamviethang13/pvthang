package com.vti.controller;

import com.vti.dto.DepartmentDTO;
import com.vti.entity.Department;
import com.vti.form.DepartmentCreateForm;
import com.vti.form.DepartmentFilterForm;
import com.vti.form.DepartmentUpdateForm;
import com.vti.service.IDepartmentService;
import com.vti.validation.DepartmentIdExsits;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.SortDefault;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

@Validated
@RestController
@RequestMapping("/api/v1/department")
public class DepartmentController {

    @Autowired
    private ModelMapper mapper;

    @Autowired
    private IDepartmentService service;

    @GetMapping
    public Page<DepartmentDTO> findAll(@SortDefault(value = "totalMembers", direction = Sort.Direction.DESC) Pageable pageable, DepartmentFilterForm form){
        Page<Department> page = service.findAll(pageable, form);
        List<Department> departments = page.getContent();
        List<DepartmentDTO> dtos = mapper.map(departments, new TypeToken<List<DepartmentDTO>>(){}.getType());
        for (DepartmentDTO dto : dtos) {
            dto.add(linkTo(methodOn(DepartmentController.class).findById(dto.getId())).withSelfRel());
            List<DepartmentDTO.AccountDTO> accountDTOs = dto.getAccounts();
            for (DepartmentDTO.AccountDTO accountDTO : accountDTOs) {
                dto.add(linkTo(methodOn(AccountController.class).findById(dto.getId())).withSelfRel());
            }
        }
        return new PageImpl<>(dtos, pageable, page.getTotalElements());
    }

    @GetMapping("/{id}")
    public DepartmentDTO findById(@PathVariable("id") int id){
        Department department = service.findById(id);
        DepartmentDTO dto = mapper.map(department, DepartmentDTO.class);
        dto.add(linkTo(methodOn(DepartmentController.class).findById(id)).withSelfRel());
        return dto;
    }


    @PostMapping
    public void create(@RequestBody @Valid DepartmentCreateForm form){
        service.create(form);
    }

    @PutMapping("/{id}")
    public void update(@PathVariable ("id") @DepartmentIdExsits int id, @RequestBody DepartmentUpdateForm form){
        form.setId(id);
        service.update(form);
    }

    @DeleteMapping
    public void deleteAllById(@RequestBody List<Integer> ids){
        service.deleteAllById(ids);
    }

}
