
package org.fhi360.lamis.modules.ndr.schema;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlSchemaType;
import javax.xml.bind.annotation.XmlType;
import javax.xml.datatype.XMLGregorianCalendar;


/**
 * <p>Java class for RecencyTestingType complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="RecencyTestingType">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="TestName">
 *           &lt;simpleType>
 *             &lt;restriction base="{}CodeType">
 *               &lt;enumeration value="AS"/>
 *               &lt;enumeration value="OTH"/>
 *             &lt;/restriction>
 *           &lt;/simpleType>
 *         &lt;/element>
 *         &lt;element name="TestDate" type="{http://www.w3.org/2001/XMLSchema}date"/>
 *         &lt;element name="RapidRecencyAssay">
 *           &lt;simpleType>
 *             &lt;restriction base="{}CodeType">
 *               &lt;enumeration value="R"/>
 *               &lt;enumeration value="L"/>
 *             &lt;/restriction>
 *           &lt;/simpleType>
 *         &lt;/element>
 *         &lt;element name="ViralLoadConfirmationResult" type="{http://www.w3.org/2001/XMLSchema}double" minOccurs="0"/>
 *         &lt;element name="ViralLoadConfirmationTestDate" type="{http://www.w3.org/2001/XMLSchema}date" minOccurs="0"/>
 *         &lt;element name="FinalRecencyTestResult">
 *           &lt;simpleType>
 *             &lt;restriction base="{}CodeType">
 *               &lt;enumeration value="R"/>
 *               &lt;enumeration value="L"/>
 *             &lt;/restriction>
 *           &lt;/simpleType>
 *         &lt;/element>
 *         &lt;element name="Consent" type="{}YNCodeType"/>
 *         &lt;element name="RecencyNumber" type="{http://www.w3.org/2001/XMLSchema}string"/>
 *         &lt;element name="ControlLine" type="{}YNCodeType"/>
 *         &lt;element name="VerificationLine" type="{}YNCodeType"/>
 *         &lt;element name="LongTermLine" type="{}YNCodeType"/>
 *         &lt;element name="RecencyInterpretation">
 *           &lt;simpleType>
 *             &lt;restriction base="{}CodeType">
 *               &lt;enumeration value="R"/>
 *               &lt;enumeration value="L"/>
 *               &lt;enumeration value="Neg"/>
 *               &lt;enumeration value="Inv"/>
 *             &lt;/restriction>
 *           &lt;/simpleType>
 *         &lt;/element>
 *         &lt;element name="ViralLoadRequest" type="{}YNCodeType"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "RecencyTestingType", propOrder = {
    "testName",
    "testDate",
    "rapidRecencyAssay",
    "viralLoadConfirmationResult",
    "viralLoadConfirmationTestDate",
    "finalRecencyTestResult",
    "consent",
    "recencyNumber",
    "controlLine",
    "verificationLine",
    "longTermLine",
    "recencyInterpretation",
    "viralLoadRequest"
})
public class RecencyTestingType {

    @XmlElement(name = "TestName", required = true)
    protected String testName;
    @XmlElement(name = "TestDate", required = true)
    @XmlSchemaType(name = "date")
    protected XMLGregorianCalendar testDate;
    @XmlElement(name = "RapidRecencyAssay", required = true)
    protected String rapidRecencyAssay;
    @XmlElement(name = "ViralLoadConfirmationResult")
    protected Double viralLoadConfirmationResult;
    @XmlElement(name = "ViralLoadConfirmationTestDate")
    @XmlSchemaType(name = "date")
    protected XMLGregorianCalendar viralLoadConfirmationTestDate;
    @XmlElement(name = "FinalRecencyTestResult", required = true)
    protected String finalRecencyTestResult;
    @XmlElement(name = "Consent", required = true)
    @XmlSchemaType(name = "string")
    protected YNCodeType consent;
    @XmlElement(name = "RecencyNumber", required = true)
    protected String recencyNumber;
    @XmlElement(name = "ControlLine", required = true)
    @XmlSchemaType(name = "string")
    protected YNCodeType controlLine;
    @XmlElement(name = "VerificationLine", required = true)
    @XmlSchemaType(name = "string")
    protected YNCodeType verificationLine;
    @XmlElement(name = "LongTermLine", required = true)
    @XmlSchemaType(name = "string")
    protected YNCodeType longTermLine;
    @XmlElement(name = "RecencyInterpretation", required = true)
    protected String recencyInterpretation;
    @XmlElement(name = "ViralLoadRequest", required = true)
    @XmlSchemaType(name = "string")
    protected YNCodeType viralLoadRequest;

    /**
     * Gets the value of the testName property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getTestName() {
        return testName;
    }

    /**
     * Sets the value of the testName property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setTestName(String value) {
        this.testName = value;
    }

    /**
     * Gets the value of the testDate property.
     * 
     * @return
     *     possible object is
     *     {@link XMLGregorianCalendar }
     *     
     */
    public XMLGregorianCalendar getTestDate() {
        return testDate;
    }

    /**
     * Sets the value of the testDate property.
     * 
     * @param value
     *     allowed object is
     *     {@link XMLGregorianCalendar }
     *     
     */
    public void setTestDate(XMLGregorianCalendar value) {
        this.testDate = value;
    }

    /**
     * Gets the value of the rapidRecencyAssay property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getRapidRecencyAssay() {
        return rapidRecencyAssay;
    }

    /**
     * Sets the value of the rapidRecencyAssay property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setRapidRecencyAssay(String value) {
        this.rapidRecencyAssay = value;
    }

    /**
     * Gets the value of the viralLoadConfirmationResult property.
     * 
     * @return
     *     possible object is
     *     {@link Double }
     *     
     */
    public Double getViralLoadConfirmationResult() {
        return viralLoadConfirmationResult;
    }

    /**
     * Sets the value of the viralLoadConfirmationResult property.
     * 
     * @param value
     *     allowed object is
     *     {@link Double }
     *     
     */
    public void setViralLoadConfirmationResult(Double value) {
        this.viralLoadConfirmationResult = value;
    }

    /**
     * Gets the value of the viralLoadConfirmationTestDate property.
     * 
     * @return
     *     possible object is
     *     {@link XMLGregorianCalendar }
     *     
     */
    public XMLGregorianCalendar getViralLoadConfirmationTestDate() {
        return viralLoadConfirmationTestDate;
    }

    /**
     * Sets the value of the viralLoadConfirmationTestDate property.
     * 
     * @param value
     *     allowed object is
     *     {@link XMLGregorianCalendar }
     *     
     */
    public void setViralLoadConfirmationTestDate(XMLGregorianCalendar value) {
        this.viralLoadConfirmationTestDate = value;
    }

    /**
     * Gets the value of the finalRecencyTestResult property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getFinalRecencyTestResult() {
        return finalRecencyTestResult;
    }

    /**
     * Sets the value of the finalRecencyTestResult property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setFinalRecencyTestResult(String value) {
        this.finalRecencyTestResult = value;
    }

    /**
     * Gets the value of the consent property.
     * 
     * @return
     *     possible object is
     *     {@link YNCodeType }
     *     
     */
    public YNCodeType getConsent() {
        return consent;
    }

    /**
     * Sets the value of the consent property.
     * 
     * @param value
     *     allowed object is
     *     {@link YNCodeType }
     *     
     */
    public void setConsent(YNCodeType value) {
        this.consent = value;
    }

    /**
     * Gets the value of the recencyNumber property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getRecencyNumber() {
        return recencyNumber;
    }

    /**
     * Sets the value of the recencyNumber property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setRecencyNumber(String value) {
        this.recencyNumber = value;
    }

    /**
     * Gets the value of the controlLine property.
     * 
     * @return
     *     possible object is
     *     {@link YNCodeType }
     *     
     */
    public YNCodeType getControlLine() {
        return controlLine;
    }

    /**
     * Sets the value of the controlLine property.
     * 
     * @param value
     *     allowed object is
     *     {@link YNCodeType }
     *     
     */
    public void setControlLine(YNCodeType value) {
        this.controlLine = value;
    }

    /**
     * Gets the value of the verificationLine property.
     * 
     * @return
     *     possible object is
     *     {@link YNCodeType }
     *     
     */
    public YNCodeType getVerificationLine() {
        return verificationLine;
    }

    /**
     * Sets the value of the verificationLine property.
     * 
     * @param value
     *     allowed object is
     *     {@link YNCodeType }
     *     
     */
    public void setVerificationLine(YNCodeType value) {
        this.verificationLine = value;
    }

    /**
     * Gets the value of the longTermLine property.
     * 
     * @return
     *     possible object is
     *     {@link YNCodeType }
     *     
     */
    public YNCodeType getLongTermLine() {
        return longTermLine;
    }

    /**
     * Sets the value of the longTermLine property.
     * 
     * @param value
     *     allowed object is
     *     {@link YNCodeType }
     *     
     */
    public void setLongTermLine(YNCodeType value) {
        this.longTermLine = value;
    }

    /**
     * Gets the value of the recencyInterpretation property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getRecencyInterpretation() {
        return recencyInterpretation;
    }

    /**
     * Sets the value of the recencyInterpretation property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setRecencyInterpretation(String value) {
        this.recencyInterpretation = value;
    }

    /**
     * Gets the value of the viralLoadRequest property.
     * 
     * @return
     *     possible object is
     *     {@link YNCodeType }
     *     
     */
    public YNCodeType getViralLoadRequest() {
        return viralLoadRequest;
    }

    /**
     * Sets the value of the viralLoadRequest property.
     * 
     * @param value
     *     allowed object is
     *     {@link YNCodeType }
     *     
     */
    public void setViralLoadRequest(YNCodeType value) {
        this.viralLoadRequest = value;
    }

}
