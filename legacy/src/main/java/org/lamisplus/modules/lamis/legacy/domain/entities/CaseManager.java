package org.lamisplus.modules.lamis.legacy.domain.entities;

import lombok.Data;
import org.apache.commons.lang3.StringUtils;
import org.apache.commons.text.WordUtils;
import org.hibernate.annotations.ResultCheckStyle;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

import javax.persistence.*;
import javax.validation.constraints.Size;
import java.io.Serializable;

@Entity
@Table(name = "CASE_MANAGER")
@SQLDelete(sql = "update case_manager set archived = true, last_modified = current_timestamp where id = ?", check = ResultCheckStyle.COUNT)
@Where(clause = "archived = false")
@Data
public class CaseManager extends TransactionEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    @Size(max = 100)
    @Column(name = "NAME")
    private String name;

    @Size(max = 50)
    @Column(name = "GENDER")
    private String gender;

    @Size(max = 30)
    @Column(name = "AGE")
    private String age;

    @Size(max = 80)
    @Column(name = "PHONE_NUMBER")
    private String phoneNumber;

    @Size(max = 50)
    @Column(name = "RELIGION")
    private String religion;

    @Size(max = 300)
    @Column(name = "ADDRESS")
    private String address;

    @PreUpdate
    @PrePersist
    public void update() {
        name = WordUtils.capitalize(name);
        address = WordUtils.capitalize(StringUtils.replace(StringUtils.trimToEmpty(address), ",", ", ").replaceAll("\\s+", " "));
    }
}
