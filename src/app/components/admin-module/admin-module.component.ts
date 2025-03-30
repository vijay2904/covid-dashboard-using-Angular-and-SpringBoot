import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CasesAPIFormat } from '../payloadsFolder/CasesApiformat';
import { Router } from '@angular/router';
import { CasesRESTAPIsService } from '../../service/data/cases-restapis.service';
import { BasicAuthSeviceService } from 'src/app/service/http/basic-auth-sevice.service';


@Component({
  selector: 'app-admin-module',
  templateUrl: './admin-module.component.html',
  styleUrls: ['./admin-module.component.css']
})
export class AdminModuleComponent implements OnInit {


  addButtonClicked:boolean = false;
  errorMessageActivated:boolean = false;


  errorMessage: string = "Please fill all the details";

  selectedState:string;
  state:string = "Telangana";
  id:number;
  selected:string = ""

  IndianStates = [{
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
}]

  districtsActivated:boolean = false
  casesForm: FormGroup;
  updateCasesForm: FormGroup;
  casesApiFormat: CasesAPIFormat;
  rForm: FormGroup;
  name:string = '';
  description:string = '';
  stateSelectedNow:string = '';
  post:any;
  states = [];
  districts = []
  stateSelectError = ""
  stateSelectErrorActivated = false
  EpassActivate:boolean = false

  epassRequests = []

  constructor(private formBuilder: FormBuilder, private casesRestAPIsService: CasesRESTAPIsService,private route:Router, private basicAuthService:BasicAuthSeviceService) { 
    this.casesForm = this.formBuilder.group({
      state: [null, Validators.required],
      place: [null, Validators.required],
      totalCases: [null, Validators.required],
      activeCases: [null, Validators.required],
      recoveredCases: [null, Validators.required],
      deceasedCases: [null, Validators.required],
      latitude: [null, Validators.required],
      longitude: [null, Validators.required]
    })

    this.rForm = this.formBuilder.group({
        name: [null, Validators.required],
        description: [null, Validators.required]
    })

    this.updateCasesForm = this.formBuilder.group({
      state: '',
      place: '',
      totalCases: '',
      activeCases: '',
      recoveredCases: '',
      deceasedCases: '',
      latitude: '',
      longitude: ''
    })



    this.casesApiFormat = {
      state: '',
      place: '',
      totalCases: null,
      activeCases: null,
      recoveredCases: null,
      deceasedCases: null,
      latitude: null,
      longitude: null
    }


  }

  ngOnInit(): void {
        // this.name=this.route.snapshot.params['name']
        this.getAllDatabaseStates();
        this.getAllEpassRequests();
       
  }


  AddButtonClicked() {
    this.addButtonClicked = !this.addButtonClicked;
    this.EpassActivate = false;
  }


  getAllDatabaseStates() {
    this.basicAuthService.getAllDatabaseStates().subscribe(data => {
      this.states = data;
    })
  }


  EpassActivated() {
      this.EpassActivate = true;
  }
  addCases() {

    
      
    //this.casesApiFormat.state = this.casesForm.get('state').value;
    //this.casesApiFormat.place = this.casesForm.get('state').value;
    
    
            
            this.casesApiFormat.state = this.selectedState;
            this.casesApiFormat.place = this.casesForm.get('place').value;
            this.casesApiFormat.activeCases = +this.casesForm.get('activeCases').value;
            this.casesApiFormat.totalCases = +this.casesForm.get('totalCases').value;
            this.casesApiFormat.recoveredCases = +this.casesForm.get('recoveredCases').value;
            this.casesApiFormat.deceasedCases = +this.casesForm.get('deceasedCases').value;
            this.casesApiFormat.latitude = this.casesForm.get('latitude').value;
            this.casesApiFormat.longitude = this.casesForm.get('longitude').value;
            if(this.casesForm.get('activeCases').value == null) {
                this.errorMessage = "active cases can't be empty";
                this.errorMessageActivated = true;
                return false;
            } else {

                this.casesRestAPIsService.addCases(this.casesApiFormat).subscribe(data => {
                    this.errorMessage = data.message;
                    this.errorMessageActivated = true;
                })
            }
        }
    
        
    getDistricts() {
        if(this.selected === "") {
            this.stateSelectErrorActivated = true;
            this.stateSelectError = "Select a state"
        } else {
            this.basicAuthService.getDistricts(this.selected).subscribe(data => {
                this.districts = data;
            })
        }
    }

    getAllEpassRequests() {
        this.basicAuthService.getAllEpassRequests().subscribe(data => {
            this.epassRequests = data;
            console.log(this.epassRequests)
        })
    }

    acceptEpassRequest(refID) {
        this.basicAuthService.acceptEpassRequest(refID).subscribe(data => {
            console.log(data)
        })
    }

    rejectEpassRequest(refID) {
        this.basicAuthService.rejectEpassRequest(refID).subscribe(data => {
            console.log(data)
        })
    }
}




  

  


