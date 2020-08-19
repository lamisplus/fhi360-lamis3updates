package org.lamisplus.modules.lamis.legacy.domain.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import org.hibernate.annotations.ResultCheckStyle;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;
import org.springframework.data.domain.Persistable;

import java.io.Serializable;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.validation.constraints.Size;

@Entity
@Table(name = "PARTICIPANT")
@SQLDelete(sql = "update participant set archived = true, last_modified = current_timestamp where id = ?", check = ResultCheckStyle.COUNT)
@Where(clause = "archived = false")
@Data
public class Participant extends TransactionEntity implements Serializable, Persistable<Long> {

    private static final long serialVersionUID = 1L;

    @Size(max = 12)
    @Column(name = "PHONE")
    private String phone;

    @Column(name = "AGE")
    private Integer age;

    @Size(max = 7)
    @Column(name = "GENDER")
    private String gender;

    @Size(max = 100)
    @Column(name = "LOCATION")
    private String location;

    @Column(name = "ACTIVE")
    private Boolean active;

    @Column(name = "LOCAL_ID")
    @JsonIgnore
    private Long localId;
}
