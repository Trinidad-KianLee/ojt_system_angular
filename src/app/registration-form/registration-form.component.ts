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

  async downloadPDF() {
    try {
      const existingPdfBytes = await fetch('/assets/cwr_template.pdf').then(res => res.arrayBuffer());
      const pdfDoc = await PDFDocument.load(existingPdfBytes);
      const pages = pdfDoc.getPages();
      const firstPage = pages[0];
      const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

      firstPage.drawText(this.formData.nameOfBusiness, {
        x: 170,
        y: 740,
        size: 12,
        font,
        color: rgb(0, 0, 0)
      });

      firstPage.drawText(this.formData.floorUnit, {
        x: 105,
        y: 710,
        size: 10,
        font,
        color: rgb(0, 0, 0)
      });
      firstPage.drawText(this.formData.bldgName, {
        x: 200,
        y: 710,
        size: 10,
        font,
        color: rgb(0, 0, 0)
      });
      firstPage.drawText(this.formData.street, {
        x: 300,
        y: 710,
        size: 10,
        font,
        color: rgb(0, 0, 0)
      });
      firstPage.drawText(this.formData.barangay, {
        x: 405,
        y: 710,
        size: 10,
        font,
        color: rgb(0, 0, 0)
      });

      firstPage.drawText(this.formData.city, {
        x: 105,
        y: 693,
        size: 10,
        font,
        color: rgb(0, 0, 0)
      });
      firstPage.drawText(this.formData.province, {
        x: 200,
        y: 693,
        size: 10,
        font,
        color: rgb(0, 0, 0)
      });
      firstPage.drawText(this.formData.region, {
        x: 300,
        y: 693,
        size: 10,
        font,
        color: rgb(0, 0, 0)
      });
      firstPage.drawText(this.formData.zipCode, {
        x: 405,
        y: 693,
        size: 10,
        font,
        color: rgb(0, 0, 0)
      });

      firstPage.drawText(this.formData.nameOfBusinessOwner, {
        x: 170,
        y: 675,
        size: 12,
        font,
        color: rgb(0, 0, 0)
      });

      firstPage.drawText(this.formData.sexOwner, {
        x: 85,
        y: 655,
        size: 12,
        font,
        color: rgb(0, 0, 0)
      });
      firstPage.drawText(this.formData.socialClassificationOwner, {
        x: 265,
        y: 655,
        size: 12,
        font,
        color: rgb(0, 0, 0)
      });

      firstPage.drawText(this.formData.telephoneOwner, {
        x: 85,
        y: 635,
        size: 12,
        font,
        color: rgb(0, 0, 0)
      });
      firstPage.drawText(this.formData.emailOwner, {
        x: 265,
        y: 635,
        size: 12,
        font,
        color: rgb(0, 0, 0)
      });

      firstPage.drawText(this.formData.mobileOwner, {
        x: 85,
        y: 615,
        size: 12,
        font,
        color: rgb(0, 0, 0)
      });
      firstPage.drawText(this.formData.websiteOwner, {
        x: 265,
        y: 615,
        size: 12,
        font,
        color: rgb(0, 0, 0)
      });

      firstPage.drawText(this.formData.nameOfWarehouseOwner, {
        x: 170,
        y: 595,
        size: 12,
        font,
        color: rgb(0, 0, 0)
      });

      firstPage.drawText(this.formData.sexWarehouseOwner, {
        x: 85,
        y: 575,
        size: 12,
        font,
        color: rgb(0, 0, 0)
      });
      firstPage.drawText(this.formData.socialClassificationWarehouseOwner, {
        x: 265,
        y: 575,
        size: 12,
        font,
        color: rgb(0, 0, 0)
      });

      firstPage.drawText(this.formData.telephoneWarehouseOwner, {
        x: 85,
        y: 555,
        size: 12,
        font,
        color: rgb(0, 0, 0)
      });
      firstPage.drawText(this.formData.emailWarehouseOwner, {
        x: 265,
        y: 555,
        size: 12,
        font,
        color: rgb(0, 0, 0)
      });

      firstPage.drawText(this.formData.mobileWarehouseOwner, {
        x: 85,
        y: 535,
        size: 12,
        font,
        color: rgb(0, 0, 0)
      });
      firstPage.drawText(this.formData.websiteWarehouseOwner, {
        x: 265,
        y: 535,
        size: 12,
        font,
        color: rgb(0, 0, 0)
      });

      firstPage.drawText(this.formData.productsStored, {
        x: 85,
        y: 510,
        size: 12,
        font,
        color: rgb(0, 0, 0)
      });

      firstPage.drawText(this.formData.brandList, {
        x: 85,
        y: 490,
        size: 12,
        font,
        color: rgb(0, 0, 0)
      });

      firstPage.drawText(this.formData.supplierName, {
        x: 85,
        y: 470,
        size: 12,
        font,
        color: rgb(0, 0, 0)
      });

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
}
