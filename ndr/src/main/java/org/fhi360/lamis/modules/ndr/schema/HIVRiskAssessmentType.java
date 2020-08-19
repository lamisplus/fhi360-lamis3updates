
package org.fhi360.lamis.modules.ndr.schema;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for HIVRiskAssessmentType complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="HIVRiskAssessmentType">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="EverHadSexualIntercourse" type="{http://www.w3.org/2001/XMLSchema}boolean"/>
 *         &lt;element name="BloodTransfussionInLast3Months" type="{http://www.w3.org/2001/XMLSchema}boolean"/>
 *         &lt;element name="UnprotectedSexWithCasualPartnerinLast3Months" type="{http://www.w3.org/2001/XMLSchema}boolean"/>
 *         &lt;element name="UnprotectedSexWithRegularPartnerInLast3Months" type="{http://www.w3.org/2001/XMLSchema}boolean"/>
 *         &lt;element name="MoreThan1SexPartnerDuringLast3Months" type="{http://www.w3.org/2001/XMLSchema}boolean"/>
 *         &lt;element name="STIInLast3Months" type="{http://www.w3.org/2001/XMLSchema}boolean"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "HIVRiskAssessmentType", propOrder = {
    "everHadSexualIntercourse",
    "bloodTransfussionInLast3Months",
    "unprotectedSexWithCasualPartnerinLast3Months",
    "unprotectedSexWithRegularPartnerInLast3Months",
    "moreThan1SexPartnerDuringLast3Months",
    "stiInLast3Months"
})
public class HIVRiskAssessmentType {

    @XmlElement(name = "EverHadSexualIntercourse")
    protected boolean everHadSexualIntercourse;
    @XmlElement(name = "BloodTransfussionInLast3Months")
    protected boolean bloodTransfussionInLast3Months;
    @XmlElement(name = "UnprotectedSexWithCasualPartnerinLast3Months")
    protected boolean unprotectedSexWithCasualPartnerinLast3Months;
    @XmlElement(name = "UnprotectedSexWithRegularPartnerInLast3Months")
    protected boolean unprotectedSexWithRegularPartnerInLast3Months;
    @XmlElement(name = "MoreThan1SexPartnerDuringLast3Months")
    protected boolean moreThan1SexPartnerDuringLast3Months;
    @XmlElement(name = "STIInLast3Months")
    protected boolean stiInLast3Months;

    /**
     * Gets the value of the everHadSexualIntercourse property.
     * 
     */
    public boolean isEverHadSexualIntercourse() {
        return everHadSexualIntercourse;
    }

    /**
     * Sets the value of the everHadSexualIntercourse property.
     * 
     */
    public void setEverHadSexualIntercourse(boolean value) {
        this.everHadSexualIntercourse = value;
    }

    /**
     * Gets the value of the bloodTransfussionInLast3Months property.
     * 
     */
    public boolean isBloodTransfussionInLast3Months() {
        return bloodTransfussionInLast3Months;
    }

    /**
     * Sets the value of the bloodTransfussionInLast3Months property.
     * 
     */
    public void setBloodTransfussionInLast3Months(boolean value) {
        this.bloodTransfussionInLast3Months = value;
    }

    /**
     * Gets the value of the unprotectedSexWithCasualPartnerinLast3Months property.
     * 
     */
    public boolean isUnprotectedSexWithCasualPartnerinLast3Months() {
        return unprotectedSexWithCasualPartnerinLast3Months;
    }

    /**
     * Sets the value of the unprotectedSexWithCasualPartnerinLast3Months property.
     * 
     */
    public void setUnprotectedSexWithCasualPartnerinLast3Months(boolean value) {
        this.unprotectedSexWithCasualPartnerinLast3Months = value;
    }

    /**
     * Gets the value of the unprotectedSexWithRegularPartnerInLast3Months property.
     * 
     */
    public boolean isUnprotectedSexWithRegularPartnerInLast3Months() {
        return unprotectedSexWithRegularPartnerInLast3Months;
    }

    /**
     * Sets the value of the unprotectedSexWithRegularPartnerInLast3Months property.
     * 
     */
    public void setUnprotectedSexWithRegularPartnerInLast3Months(boolean value) {
        this.unprotectedSexWithRegularPartnerInLast3Months = value;
    }

    /**
     * Gets the value of the moreThan1SexPartnerDuringLast3Months property.
     * 
     */
    public boolean isMoreThan1SexPartnerDuringLast3Months() {
        return moreThan1SexPartnerDuringLast3Months;
    }

    /**
     * Sets the value of the moreThan1SexPartnerDuringLast3Months property.
     * 
     */
    public void setMoreThan1SexPartnerDuringLast3Months(boolean value) {
        this.moreThan1SexPartnerDuringLast3Months = value;
    }

    /**
     * Gets the value of the stiInLast3Months property.
     * 
     */
    public boolean isSTIInLast3Months() {
        return stiInLast3Months;
    }

    /**
     * Sets the value of the stiInLast3Months property.
     * 
     */
    public void setSTIInLast3Months(boolean value) {
        this.stiInLast3Months = value;
    }

}
