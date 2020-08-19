package org.lamisplus.modules.lamis.legacy.domain.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.databind.JsonNode;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.hibernate.annotations.ResultCheckStyle;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Type;
import org.hibernate.annotations.Where;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.Serializable;

@Entity
@Data
@SQLDelete(sql = "update laboratory_line set archived = true, last_modified = current_timestamp where id = ?", check = ResultCheckStyle.COUNT)
@Where(clause = "archived = false")
@EqualsAndHashCode(callSuper = true)
public class LaboratoryLine extends TransactionEntity implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    private Long id;

    @ManyToOne
    @JoinColumn(nullable = false)
    @JsonIgnore
    private Patient patient;

    @ManyToOne
    @JoinColumn(nullable = false)
    private Laboratory laboratory;

    @Size(max = 10)
    @Column(name = "RESULT")
    private String result;

    @Size(max = 100)
    @Column(name = "COMMENT")
    private String comment;

    private String indication;

    @Basic(optional = false)
    @NotNull
    @JoinColumn(name = "LAB_TEST_ID")
    @ManyToOne
    private LabTest labTest;

    @Type(type = "jsonb-node")
    @Column(columnDefinition = "jsonb")
    private JsonNode extra;

    @Override
    public boolean isNew() {
        return id == null;
    }
}
