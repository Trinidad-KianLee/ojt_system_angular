import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

@Component({
  selector: 'app-registration-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss']
})
export class RegistrationFormComponent implements OnInit {
  formData: any = {
    nameOfBusiness: '',
    nameOfBusinessOwner: '',
    floorUnit: '',
    bldgName: '',
    street: '',
    barangay: '',
    city: '',
    province: '',
    region: '',
    zipCode: '',
    sexOwner: '',
    socialClassificationOwner: '',
    telephoneOwner: '',
    emailOwner: '',
    mobileOwner: '',
    websiteOwner: '',
    nameOfWarehouseOwner: '',
    sexWarehouseOwner: '',
    socialClassificationWarehouseOwner: '',
    telephoneWarehouseOwner: '',
    emailWarehouseOwner: '',
    mobileWarehouseOwner: '',
    websiteWarehouseOwner: '',
    productsStored: '',
    brandList: '',
    supplierName: ''
  };

   // Define all form field positions in one place
   private formFieldPositions = {
    // Business Information
    nameOfBusiness: { x: 200, y: 630, size: 10 },
    
    // Address Information
    floorUnit: { x: 196, y: 605, size: 9 },
    bldgName: { x: 286, y: 605, size: 9 },
    street: { x: 410, y: 605, size: 9 },
    barangay: { x: 517, y: 605, size: 9 },
    city: { x: 188, y: 577, size: 9 },
    province: { x: 275, y: 577, size: 9 },
    region: { x: 410, y: 577, size: 9 },
    zipCode: { x: 519, y: 577, size: 9 },
    
    // Business Owner Information
    nameOfBusinessOwner: { x: 250, y: 550, size: 10 },

    socialClassificationOwner: { x: 415, y: 522, size: 9 },

    telephoneOwner: { x: 175, y: 500, size: 9 },
    
    emailOwner: { x: 430, y: 500, size: 9 },

    mobileOwner: { x: 175, y: 482, size: 9 },

    websiteOwner: { x: 420, y: 482, size: 9 },
    
    // Warehouse Owner Information
    nameOfWarehouseOwner: { x: 220, y: 550, size: 10 },

    socialClassificationWarehouseOwner: { x: 430, y: 440, size: 9 },
    telephoneWarehouseOwner: { x: 175, y: 450, size: 9 },
    emailWarehouseOwner: { x: 350, y: 450, size: 9 },
    mobileWarehouseOwner: { x: 175, y: 430, size: 9 },
    websiteWarehouseOwner: { x: 350, y: 430, size: 9 },
    
    // Product Information
    productsStored: { x: 175, y: 400, size: 9 },
    brandList: { x: 175, y: 365, size: 9 },
    supplierName: { x: 175, y: 330, size: 9 },
    
    // Checkboxes
    checkboxes: {
      maleOwner: { x: 196, y: 526, size: 10 },
      femaleOwner: { x: 223, y: 526, size: 10 },
      maleWarehouseOwner: { x: 196, y: 472, size: 10 },
      femaleWarehouseOwner: { x: 223, y: 472, size: 10 }
    }
  };

  showModal = false;

  constructor(private router: Router) {}

  ngOnInit() {}

  submitForm(myForm: NgForm) {
    if (!myForm.valid) {
      myForm.control.markAllAsTouched();
      return;
    }
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  /**
   * Helper function to draw text at specified position
   */
  private drawFormText(page: any, text: string, position: any, font: any) {
    if (text) {
      page.drawText(text, {
        x: position.x,
        y: position.y,
        size: position.size,
        font: font,
        color: rgb(0, 0, 0)
      });
    }
  }

  /**
   * Helper function to draw a cross in a checkbox
   */
  private drawCheckboxCross(page: any, checkbox: any) {
    const halfSize = checkbox.size / 2;
    // Draw the cross
    page.drawLine({
      start: { x: checkbox.x - halfSize, y: checkbox.y - halfSize },
      end: { x: checkbox.x + halfSize, y: checkbox.y + halfSize },
      thickness: 1,
      color: rgb(0, 0, 0)
    });
    page.drawLine({
      start: { x: checkbox.x - halfSize, y: checkbox.y + halfSize },
      end: { x: checkbox.x + halfSize, y: checkbox.y - halfSize },
      thickness: 1,
      color: rgb(0, 0, 0)
    });
  }

  async downloadPDF() {
    try {
      const existingPdfBytes = await fetch('/assets/cwr_template.pdf').then(res => res.arrayBuffer());
      const pdfDoc = await PDFDocument.load(existingPdfBytes);
      const pages = pdfDoc.getPages();
      const firstPage = pages[0];
      const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
      
      // Business Information
      this.drawFormText(firstPage, this.formData.nameOfBusiness, this.formFieldPositions.nameOfBusiness, font);
      
      // Address Information
      this.drawFormText(firstPage, this.formData.floorUnit, this.formFieldPositions.floorUnit, font);
      this.drawFormText(firstPage, this.formData.bldgName, this.formFieldPositions.bldgName, font);
      this.drawFormText(firstPage, this.formData.street, this.formFieldPositions.street, font);
      this.drawFormText(firstPage, this.formData.barangay, this.formFieldPositions.barangay, font);
      this.drawFormText(firstPage, this.formData.city, this.formFieldPositions.city, font);
      this.drawFormText(firstPage, this.formData.province, this.formFieldPositions.province, font);
      this.drawFormText(firstPage, this.formData.region, this.formFieldPositions.region, font);
      this.drawFormText(firstPage, this.formData.zipCode, this.formFieldPositions.zipCode, font);
      
      // Business Owner Information
      this.drawFormText(firstPage, this.formData.nameOfBusinessOwner, this.formFieldPositions.nameOfBusinessOwner, font);
      this.drawFormText(firstPage, this.formData.socialClassificationOwner, this.formFieldPositions.socialClassificationOwner, font);
      this.drawFormText(firstPage, this.formData.telephoneOwner, this.formFieldPositions.telephoneOwner, font);
      this.drawFormText(firstPage, this.formData.emailOwner, this.formFieldPositions.emailOwner, font);
      this.drawFormText(firstPage, this.formData.mobileOwner, this.formFieldPositions.mobileOwner, font);
      this.drawFormText(firstPage, this.formData.websiteOwner, this.formFieldPositions.websiteOwner, font);
      
      // Sex Checkbox for Business Owner
      if (this.formData.sexOwner === 'M') {
        this.drawCheckboxCross(firstPage, this.formFieldPositions.checkboxes.maleOwner);
      } else if (this.formData.sexOwner === 'F') {
        this.drawCheckboxCross(firstPage, this.formFieldPositions.checkboxes.femaleOwner);
      }
      
      // Warehouse Owner Information
      this.drawFormText(firstPage, this.formData.nameOfWarehouseOwner, this.formFieldPositions.nameOfWarehouseOwner, font);
      this.drawFormText(firstPage, this.formData.socialClassificationWarehouseOwner, this.formFieldPositions.socialClassificationWarehouseOwner, font);
      this.drawFormText(firstPage, this.formData.telephoneWarehouseOwner, this.formFieldPositions.telephoneWarehouseOwner, font);
      this.drawFormText(firstPage, this.formData.emailWarehouseOwner, this.formFieldPositions.emailWarehouseOwner, font);
      this.drawFormText(firstPage, this.formData.mobileWarehouseOwner, this.formFieldPositions.mobileWarehouseOwner, font);
      this.drawFormText(firstPage, this.formData.websiteWarehouseOwner, this.formFieldPositions.websiteWarehouseOwner, font);
      
      // Sex Checkbox for Warehouse Owner
      if (this.formData.sexWarehouseOwner === 'M') {
        this.drawCheckboxCross(firstPage, this.formFieldPositions.checkboxes.maleWarehouseOwner);
      } else if (this.formData.sexWarehouseOwner === 'F') {
        this.drawCheckboxCross(firstPage, this.formFieldPositions.checkboxes.femaleWarehouseOwner);
      }
      
      // Product Information
      this.drawFormText(firstPage, this.formData.productsStored, this.formFieldPositions.productsStored, font);
      this.drawFormText(firstPage, this.formData.brandList, this.formFieldPositions.brandList, font);
      this.drawFormText(firstPage, this.formData.supplierName, this.formFieldPositions.supplierName, font);
      
      // Save and download the PDF
      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'Certificate_of_Warehouse_Registration.pdf';
      link.click();
      URL.revokeObjectURL(url);
      
      this.closeModal();
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  }

  async testCoordinates() {
    try {
      const existingPdfBytes = await fetch('/assets/cwr_template.pdf').then(res => res.arrayBuffer());
      const pdfDoc = await PDFDocument.load(existingPdfBytes);
      const pages = pdfDoc.getPages();
      const firstPage = pages[0];
      const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
      
      // Draw horizontal and vertical lines for better visualization
      for (let x = 100; x <= 500; x += 50) {
        firstPage.drawLine({
          start: { x, y: 300 },
          end: { x, y: 750 },
          thickness: 0.5,
          color: rgb(0.8, 0.8, 0.8)
        });
      }
      
      for (let y = 300; y <= 750; y += 50) {
        firstPage.drawLine({
          start: { x: 100, y },
          end: { x: 500, y },
          thickness: 0.5,
          color: rgb(0.8, 0.8, 0.8)
        });
      }
      
      // Draw coordinate points
      for (let x = 100; x <= 500; x += 50) {
        for (let y = 300; y <= 750; y += 50) {
          // Draw a small circle at each intersection
          firstPage.drawCircle({
            x,
            y,
            size: 2,
            color: rgb(1, 0, 0)
          });
          
          // Label the coordinates
          firstPage.drawText(`${x},${y}`, {
            x: x + 5,
            y: y - 5,
            size: 6,
            font,
            color: rgb(0, 0, 1)
          });
        }
      }
      
      // Mark checkbox positions
      const checkboxPositions = [
        { name: "Male Owner", ...this.formFieldPositions.checkboxes.maleOwner },
        { name: "Female Owner", ...this.formFieldPositions.checkboxes.femaleOwner },
        { name: "Male Warehouse Owner", ...this.formFieldPositions.checkboxes.maleWarehouseOwner },
        { name: "Female Warehouse Owner", ...this.formFieldPositions.checkboxes.femaleWarehouseOwner }
      ];
      
      checkboxPositions.forEach(checkbox => {
        firstPage.drawCircle({
          x: checkbox.x,
          y: checkbox.y,
          size: 3,
          color: rgb(0, 0.5, 0)
        });
        
        firstPage.drawText(checkbox.name, {
          x: checkbox.x - 10,
          y: checkbox.y + 10,
          size: 8,
          font,
          color: rgb(0, 0.5, 0)
        });
        
        // Draw example cross
        this.drawCheckboxCross({ 
          drawLine: firstPage.drawLine.bind(firstPage),
          font: font
        }, checkbox);
      });
      
      // Save and download the PDF
      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'CWR_Test_Grid.pdf';
      link.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error generating test PDF:', error);
    }
  }
} 