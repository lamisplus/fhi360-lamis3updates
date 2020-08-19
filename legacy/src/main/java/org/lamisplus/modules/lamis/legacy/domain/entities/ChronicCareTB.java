package org.lamisplus.modules.lamis.legacy.domain.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.NonNull;
import org.hibernate.annotations.ResultCheckStyle;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;
import org.springframework.data.domain.Persistable;

import javax.persistence.*;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Where(clause = "archived = false")
@SQLDelete(sql = "update chronic_care_tb set archived = true, last_modified = current_timestamp where id = ?", check = ResultCheckStyle.COUNT)
@Data
@Table(name = "chronic_care_tb")
public class ChronicCareTB  implements Serializable, Persistable<Long> {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    protected Long id;

    @Column(name = "LAST_MODIFIED")
    @JsonIgnore
    protected LocalDateTime lastModified;

    @Size(max = 36)
    @Column(name = "UUID")
    protected String uuid;

    @ManyToOne
    @NonNull
    private ChronicCare chronicCare;

    @ManyToOne
    @NonNull
    @JoinColumn(name = "tb_screen_id")
    private TBScreen tbScreen;

    private String description;

    protected Boolean archived = false;

    @Override
    public boolean isNew() {
        return id == null;
    }

    @PrePersist
    public void preSave() {
        uuid = UUID.randomUUID().toString();
        lastModified = LocalDateTime.now();
    }

    @PreUpdate
    public void preUpdate() {
        if (uuid == null) {
            uuid = UUID.randomUUID().toString();
        }
        lastModified = LocalDateTime.now();
    }
}
