
package org.fhi360.lamis.modules.ndr.schema;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for KnowledgeAssessmentType complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="KnowledgeAssessmentType">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="PreviouslyTestedHIVNegative" type="{http://www.w3.org/2001/XMLSchema}boolean"/>
 *         &lt;element name="ClientInformedAboutHIVTransmissionRoutes" type="{http://www.w3.org/2001/XMLSchema}boolean"/>
 *         &lt;element name="ClientPregnant" type="{http://www.w3.org/2001/XMLSchema}boolean" minOccurs="0"/>
 *         &lt;element name="ClientInformedOfHIVTransmissionRiskFactors" type="{http://www.w3.org/2001/XMLSchema}boolean"/>
 *         &lt;element name="ClientInformedAboutPreventingHIV" type="{http://www.w3.org/2001/XMLSchema}boolean"/>
 *         &lt;element name="ClientInformedAboutPossibleTestResults" type="{http://www.w3.org/2001/XMLSchema}boolean"/>
 *         &lt;element name="InformedConsentForHIVTestingGiven" type="{http://www.w3.org/2001/XMLSchema}boolean"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "KnowledgeAssessmentType", propOrder = {
    "previouslyTestedHIVNegative",
    "clientInformedAboutHIVTransmissionRoutes",
    "clientPregnant",
    "clientInformedOfHIVTransmissionRiskFactors",
    "clientInformedAboutPreventingHIV",
    "clientInformedAboutPossibleTestResults",
    "informedConsentForHIVTestingGiven"
})
public class KnowledgeAssessmentType {

    @XmlElement(name = "PreviouslyTestedHIVNegative")
    protected boolean previouslyTestedHIVNegative;
    @XmlElement(name = "ClientInformedAboutHIVTransmissionRoutes")
    protected boolean clientInformedAboutHIVTransmissionRoutes;
    @XmlElement(name = "ClientPregnant")
    protected Boolean clientPregnant;
    @XmlElement(name = "ClientInformedOfHIVTransmissionRiskFactors")
    protected boolean clientInformedOfHIVTransmissionRiskFactors;
    @XmlElement(name = "ClientInformedAboutPreventingHIV")
    protected boolean clientInformedAboutPreventingHIV;
    @XmlElement(name = "ClientInformedAboutPossibleTestResults")
    protected boolean clientInformedAboutPossibleTestResults;
    @XmlElement(name = "InformedConsentForHIVTestingGiven")
    protected boolean informedConsentForHIVTestingGiven;

    /**
     * Gets the value of the previouslyTestedHIVNegative property.
     * 
     */
    public boolean isPreviouslyTestedHIVNegative() {
        return previouslyTestedHIVNegative;
    }

    /**
     * Sets the value of the previouslyTestedHIVNegative property.
     * 
     */
    public void setPreviouslyTestedHIVNegative(boolean value) {
        this.previouslyTestedHIVNegative = value;
    }

    /**
     * Gets the value of the clientInformedAboutHIVTransmissionRoutes property.
     * 
     */
    public boolean isClientInformedAboutHIVTransmissionRoutes() {
        return clientInformedAboutHIVTransmissionRoutes;
    }

    /**
     * Sets the value of the clientInformedAboutHIVTransmissionRoutes property.
     * 
     */
    public void setClientInformedAboutHIVTransmissionRoutes(boolean value) {
        this.clientInformedAboutHIVTransmissionRoutes = value;
    }

    /**
     * Gets the value of the clientPregnant property.
     * 
     * @return
     *     possible object is
     *     {@link Boolean }
     *     
     */
    public Boolean isClientPregnant() {
        return clientPregnant;
    }

    /**
     * Sets the value of the clientPregnant property.
     * 
     * @param value
     *     allowed object is
     *     {@link Boolean }
     *     
     */
    public void setClientPregnant(Boolean value) {
        this.clientPregnant = value;
    }

    /**
     * Gets the value of the clientInformedOfHIVTransmissionRiskFactors property.
     * 
     */
    public boolean isClientInformedOfHIVTransmissionRiskFactors() {
        return clientInformedOfHIVTransmissionRiskFactors;
    }

    /**
     * Sets the value of the clientInformedOfHIVTransmissionRiskFactors property.
     * 
     */
    public void setClientInformedOfHIVTransmissionRiskFactors(boolean value) {
        this.clientInformedOfHIVTransmissionRiskFactors = value;
    }

    /**
     * Gets the value of the clientInformedAboutPreventingHIV property.
     * 
     */
    public boolean isClientInformedAboutPreventingHIV() {
        return clientInformedAboutPreventingHIV;
    }

    /**
     * Sets the value of the clientInformedAboutPreventingHIV property.
     * 
     */
    public void setClientInformedAboutPreventingHIV(boolean value) {
        this.clientInformedAboutPreventingHIV = value;
    }

    /**
     * Gets the value of the clientInformedAboutPossibleTestResults property.
     * 
     */
    public boolean isClientInformedAboutPossibleTestResults() {
        return clientInformedAboutPossibleTestResults;
    }

    /**
     * Sets the value of the clientInformedAboutPossibleTestResults property.
     * 
     */
    public void setClientInformedAboutPossibleTestResults(boolean value) {
        this.clientInformedAboutPossibleTestResults = value;
    }

    /**
     * Gets the value of the informedConsentForHIVTestingGiven property.
     * 
     */
    public boolean isInformedConsentForHIVTestingGiven() {
        return informedConsentForHIVTestingGiven;
    }

    /**
     * Sets the value of the informedConsentForHIVTestingGiven property.
     * 
     */
    public void setInformedConsentForHIVTestingGiven(boolean value) {
        this.informedConsentForHIVTestingGiven = value;
    }

}
