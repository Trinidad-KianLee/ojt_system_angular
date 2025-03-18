import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

@Component({
  selector: 'app-age-gating-reg',
  imports: [CommonModule, FormsModule],
  templateUrl: './age-gating-reg.component.html',
  styleUrl: './age-gating-reg.component.css'
})

export class AgeGatingRegComponent implements OnInit {
  formData: any = {
    typeApplication: '',
    nameOfCompany: '',
    companyType: '',
    bldgName: '',
    street: '',
    barangay: '',
    city: '',
    province: '',
    region: '',
    zipCode: '',
    websiteOwner: '',
    telephoneOwner: '',
    FaxNumber: '',
    emailOwner: '',
    dateIssued: '',
    TINOwner: '',
    nameOfOwner: '',
    nameOfAuthorizedRepresentative: '',
    contactRepresentative: '',
    emailRepresentative: ''
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
      const existingPdfBytes = await fetch('/assets/age-gating_application.pdf').then(res => res.arrayBuffer());
      const pdfDoc = await PDFDocument.load(existingPdfBytes);
      const pages = pdfDoc.getPages();
      const firstPage = pages[0];
      const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

      firstPage.drawText(this.formData.typeApplication, {
        x: 170,
        y: 740,
        size: 12,
        font,
        color: rgb(0, 0, 0)
      });

      firstPage.drawText(this.formData.nameOfCompany, {
        x: 170,
        y: 740,
        size: 12,
        font,
        color: rgb(0, 0, 0)
      });

      firstPage.drawText(this.formData.companyType, {
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

      firstPage.drawText(this.formData.localFloorUnit, {
        x: 105,
        y: 710,
        size: 10,
        font,
        color: rgb(0, 0, 0)
      });
      firstPage.drawText(this.formData.localBldgName, {
        x: 200,
        y: 710,
        size: 10,
        font,
        color: rgb(0, 0, 0)
      });
      firstPage.drawText(this.formData.localStreet, {
        x: 300,
        y: 710,
        size: 10,
        font,
        color: rgb(0, 0, 0)
      });
      firstPage.drawText(this.formData.localBarangay, {
        x: 405,
        y: 710,
        size: 10,
        font,
        color: rgb(0, 0, 0)
      });

      firstPage.drawText(this.formData.localCity, {
        x: 105,
        y: 693,
        size: 10,
        font,
        color: rgb(0, 0, 0)
      });
      firstPage.drawText(this.formData.localProvince, {
        x: 200,
        y: 693,
        size: 10,
        font,
        color: rgb(0, 0, 0)
      });
      firstPage.drawText(this.formData.localRegion, {
        x: 300,
        y: 693,
        size: 10,
        font,
        color: rgb(0, 0, 0)
      });
      firstPage.drawText(this.formData.localZipCode, {
        x: 405,
        y: 693,
        size: 10,
        font,
        color: rgb(0, 0, 0)
      })

      firstPage.drawText(this.formData.websiteOwner, {
        x: 170,
        y: 675,
        size: 12,
        font,
        color: rgb(0, 0, 0)
      });

      firstPage.drawText(this.formData.telephoneOwner, {
        x: 85,
        y: 655,
        size: 12,
        font,
        color: rgb(0, 0, 0)
      });
      firstPage.drawText(this.formData.FaxNumber, {
        x: 265,
        y: 655,
        size: 12,
        font,
        color: rgb(0, 0, 0)
      });

      firstPage.drawText(this.formData.emailOwner, {
        x: 85,
        y: 635,
        size: 12,
        font,
        color: rgb(0, 0, 0)
      });
      firstPage.drawText(this.formData.dateIssued, {
        x: 265,
        y: 635,
        size: 12,
        font,
        color: rgb(0, 0, 0)
      });

      firstPage.drawText(this.formData.TINOwner, {
        x: 85,
        y: 615,
        size: 12,
        font,
        color: rgb(0, 0, 0)
      });
      firstPage.drawText(this.formData.nameOfOwner, {
        x: 265,
        y: 615,
        size: 12,
        font,
        color: rgb(0, 0, 0)
      });

      firstPage.drawText(this.formData.nameOfAuthorizedRepresentative, {
        x: 170,
        y: 595,
        size: 12,
        font,
        color: rgb(0, 0, 0)
      });

      firstPage.drawText(this.formData.contactRepresentative, {
        x: 85,
        y: 575,
        size: 12,
        font,
        color: rgb(0, 0, 0)
      });
      firstPage.drawText(this.formData.emailRepresentative, {
        x: 265,
        y: 575,
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

