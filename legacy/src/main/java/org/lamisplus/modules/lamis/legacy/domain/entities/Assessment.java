/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package org.lamisplus.modules.lamis.legacy.domain.entities;

import lombok.Data;
import org.hibernate.annotations.ResultCheckStyle;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.time.LocalDate;

@Data
@Entity
@Table(name = "ASSESSMENT")
@SQLDelete(sql = "update assessment set archived = true, last_modified = current_timestamp where id = ?", check = ResultCheckStyle.COUNT)
@Where(clause = "archived = false")
public class Assessment extends TransactionEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    private LocalDate dateVisit;

    private String clientCode;

    private String question1;

    private String question2;

    private Integer question3;

    private Integer question4;

    private Integer question5;

    private Integer question6;

    private Integer question7;

    private Integer question8;

    private Integer question9;

    private Integer question10;

    private Integer question11;

    private Integer question12;
  
    private Integer sti1;

    private Integer sti2;

    private Integer sti3;

    private Integer sti4;

    private Integer sti5;

    private Integer sti6;

    private Integer sti7;

    private Integer sti8;

/*
    @Basic(optional = false)
    @NotNull
    @JoinColumn(name = "DEVICECONFIG_ID")
    @ManyToOne
    private DeviceConfig deviceConfig;
*/
}
