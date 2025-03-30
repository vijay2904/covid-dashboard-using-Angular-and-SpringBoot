import { Component, NgModule, OnInit } from '@angular/core';
import * as jspdf from 'jspdf';
import { BasicAuthSeviceService } from '../../service/http/basic-auth-sevice.service';
import { FileDownloadFormat } from 'src/app/components/payloadsFolder/fileDownloadFormat';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as XLSX from 'xlsx';
import * as fileSaver from 'file-saver';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import htmlToPdfmake from "html-to-pdfmake";
 
@Component({
  selector: 'app-download-reports',
  templateUrl: './download-reports.component.html',
  styleUrls: ['./download-reports.component.css'],
  
})


export class DownloadReportsComponent implements OnInit  {

    ngOnInit(): void {
        // this.name=this.route.snapshot.params['name']
        this.getAllDatabaseStates();
       
  }
  state:string = 'andhra'
  selectedState:string = "";
  selectedType:string;
  activatedPDF:boolean = false
  downloadErrorActivated:boolean = false;
  downloadError:string = ""
  selected = ""
  states = []
  cities2 = [
    {id: 1, name: 'Vilnius'},
    {id: 2, name: 'Kaunas'},
    {id: 3, name: 'Pavilnys', disabled: true},
    {id: 4, name: 'Pabradė'},
    {id: 5, name: 'Klaipėda'}
  ];


  downloadOptions = [
    {
      id:1,
      option:"PDF"
    },
    {
      id:2,
      option:"CSV"
    }
  ]

  IndianStates = [
    {
    id: 1,
    state: "Andhra Pradesh"
    },
    {
        id: 2,
        state: "Arunachal Pradesh"
    },
    {
        id: 3,
        state: "Assam"
    },
    {
        id: 4,
        state: "Bihar"
    },
    {
        id: 5,
        state: "Chhattisgarh"
    },
    {
        id: 6,
        state: "Goa"
    },
    {
        id: 7,
        state: "Gujarat"
    },
    {
        id: 8,
        state: "Haryana"
    },
    {
        id: 9,
        state: "Himachal Pradesh"
    },
    {
        id: 10,
        state: "Jammu and Kashmir"
    },
    {
        id: 11,
        state: "Jharkhand"
    },
    {
        id: 12,
        state: "Karnataka"
    },
    {
        id: 13,
        state: "Kerala"
    },
    {
        id: 14,
        state: "Madhya Pradesh"
    },
    {
        id: 15,
        state: "Maharashtra"
    },
    {
        id: 16,
        state: "Manipur"
    },
    {
        id: 17,
        state: "Meghalaya"
    },
    {
        id: 18,
        state: "Mizoram"
    },
    {
        id: 19,
        state: "Nagaland"
    },
    {
        id: 20,
        state: "Odisha"
    },
    {
        id: 21,
        state: "Punjab"
    },
    {
        id: 22,
        state: "Rajasthan"
    },
    {
        id: 23,
        state: "Sikkim"
    },
    {
        id: 24,
        state: "Tamil Nadu"
    },
    {
        id: 25,
        state: "Telangana"
    },
    {
        id: 26,
        state: "Tripura"
    },
    {
        id: 27,
        state: "Uttarakhand"
    },
    {
        id: 28,
        state: "Uttar Pradesh"
    },
    {
        id: 29,
        state: "West Bengal"
    },
    {
        id: 30,
        state: "Andaman and Nicobar Islands"
    },
    {
        id: 31,
        state: "Chandigarh"
    },
    {
        id: 32,
        state: "Dadra and Nagar Haveli"
    },
    {
        id: 33,
        state: "Daman and Diu"
    },
    {
        id: 34,
        state: "Delhi"
    },
    {
        id: 35,
        state: "Lakshadweep"
    },
    {
        id: 36,
        state: "Puducherry"
    }
  ]

  downloadJsonHref:string = ''

  downloadsForm:FormGroup;
  downloadPdfFormat: FileDownloadFormat;
  cases:any
  sendFormat:sendEmailFormat
  scheduleMailForm:FormGroup
  emailForm:FormGroup
  enteredEmail:string = ''
  errorMessage = ""
  errorActivated:boolean=false
  successActivated:boolean = false
  mailFormActivated:boolean = false
  constructor(private basicAuthService:BasicAuthSeviceService, private formBuilder: FormBuilder) { 
    this.emailForm = this.formBuilder.group({
        enteredEmail:[null, Validators.required]
    })
    this.sendFormat = {
      toEmail : ""
    }

    this.downloadsForm = this.formBuilder.group({
      state: [null, Validators.required],
      type: [null, Validators.required],
    })

    this.downloadPdfFormat = {
      state: '',
      type: ''
    }

  }

  getAllDatabaseStates() {
    this.basicAuthService.getAllDatabaseStates().subscribe(data => {
      this.states = data;
    })
  }
  downloadPDF() {

    if(this.selected === "" || this.selected === null) {
        this.downloadError = "Please select a state"
        this.downloadErrorActivated = true; 
     } else {
        this.downloadErrorActivated = false;
        this.basicAuthService.downloadPDF(this.selected).subscribe(data => {
        this.cases = data 
        this.activatedPDF = true
        })
    }
  }

  afterComplete() {
        this.downloadErrorActivated = false; 
        var element = document.getElementById('pdfDownloadFormat');
        var doc = new jspdf('l', 'pt', 'a4');
        doc.fromHTML(element,100,15);
        doc.save(this.selected + new Date() + ".pdf")
      
  }
  afterCompletecsv(): void
  {
    /* pass here the table id */
    let element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);
 
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
 
    /* save to file */  
    XLSX.writeFile(wb, this.selected+".xlsx");
 
  }

  downloadJSON() {
        
    this.basicAuthService.downloadPDF("telangana").subscribe(response => {
        let blob:any = new Blob([JSON.stringify(response)], { type: 'text/json; charset=utf-8' });
        //const url= window.URL.createObjectURL(blob);
        //window.open(url);
        //window.location.href = response.url;
        //console.log(response)
        fileSaver.saveAs(blob, this.selected + '.json');
    }), error => console.log('Error downloading the file'),
             () => console.info('File downloaded successfully');
  }

  sendEmail() {
    //console.log(this.enteredEmail)
    this.sendFormat.toEmail = this.enteredEmail
    this.basicAuthService.sendEmail(this.sendFormat).subscribe(data =>{
      if(data.message+"" ===("Message sent")) {
        this.successActivated = true;
        this.errorActivated = false;
      } else {

        this.errorMessage = data.message
        this.errorActivated = true;
        this.successActivated=false
      }
    });
  }

  activateMailForm(){
      this.mailFormActivated = true;
  }

    
}


class Cases { 
  id:number
  state:string
  place:string
  totalCases:string
  activeCases: string
  recoveredCases: string
  deceasedCases:string

  constructor(userResponse:any) {
    this.id = userResponse.id;
    this.state = userResponse.state;
    this.activeCases = userResponse.activeCases;
    this.deceasedCases = userResponse.deceasedCases;
    this.recoveredCases = userResponse.recoveredCases;
    this.totalCases = userResponse.totalCases;
    this.place = userResponse.place;
  }

  getState() {
    return this.state
  }
  
} 

 
  

export class sendEmailFormat {
    toEmail:string
}
