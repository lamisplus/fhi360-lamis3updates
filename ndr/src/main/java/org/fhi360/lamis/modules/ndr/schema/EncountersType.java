
package org.fhi360.lamis.modules.ndr.schema;

import java.util.ArrayList;
import java.util.List;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for EncountersType complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="EncountersType">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="HIVEncounter" type="{}HIVEncounterType" maxOccurs="unbounded" minOccurs="0"/>
 *         &lt;element name="AntenatalRegistration" type="{}AntenatalRegistrationType" maxOccurs="unbounded" minOccurs="0"/>
 *         &lt;element name="DeliveryEncounter" type="{}DeliveryEncounterType" maxOccurs="unbounded" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "EncountersType", propOrder = {
    "hivEncounter",
    "antenatalRegistration",
    "deliveryEncounter"
})
public class EncountersType {

    @XmlElement(name = "HIVEncounter")
    protected List<HIVEncounterType> hivEncounter;
    @XmlElement(name = "AntenatalRegistration")
    protected List<AntenatalRegistrationType> antenatalRegistration;
    @XmlElement(name = "DeliveryEncounter")
    protected List<DeliveryEncounterType> deliveryEncounter;

    /**
     * Gets the value of the hivEncounter property.
     * 
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the hivEncounter property.
     * 
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getHIVEncounter().add(newItem);
     * </pre>
     * 
     * 
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link HIVEncounterType }
     * 
     * 
     */
    public List<HIVEncounterType> getHIVEncounter() {
        if (hivEncounter == null) {
            hivEncounter = new ArrayList<HIVEncounterType>();
        }
        return this.hivEncounter;
    }

    /**
     * Gets the value of the antenatalRegistration property.
     * 
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the antenatalRegistration property.
     * 
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getAntenatalRegistration().add(newItem);
     * </pre>
     * 
     * 
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link AntenatalRegistrationType }
     * 
     * 
     */
    public List<AntenatalRegistrationType> getAntenatalRegistration() {
        if (antenatalRegistration == null) {
            antenatalRegistration = new ArrayList<AntenatalRegistrationType>();
        }
        return this.antenatalRegistration;
    }

    /**
     * Gets the value of the deliveryEncounter property.
     * 
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the deliveryEncounter property.
     * 
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getDeliveryEncounter().add(newItem);
     * </pre>
     * 
     * 
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link DeliveryEncounterType }
     * 
     * 
     */
    public List<DeliveryEncounterType> getDeliveryEncounter() {
        if (deliveryEncounter == null) {
            deliveryEncounter = new ArrayList<DeliveryEncounterType>();
        }
        return this.deliveryEncounter;
    }

}
