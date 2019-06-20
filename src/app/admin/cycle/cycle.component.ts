import { Component, OnInit, } from '@angular/core';
import {Dates} from 'date-format'
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';
import { NullInjector } from '@angular/core/src/di/injector';
import { AdminService } from '../../Services/admin.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-cycle',
  templateUrl: './cycle.component.html',
  styleUrls: ['./cycle.component.css']
})
export class CycleComponent implements OnInit {

  validateForm: FormGroup;
  dateFormat = 'yyyy-MM-dd HH:mm:ss';
  cycles = [];
  open= false;
  deadlines: any
  startDate: any
  selectedId: any;
  skills: any
  cyclesFetched = false;
  current = false;
  currentCycleId :any;
  error : any;
 

  editForm = new FormGroup({
    
    name: new FormControl(''),
    startDate: new FormControl('', [Validators.required]),
    endDate: new FormControl('', [Validators.required]),
    

  });
  deadlineForm = new FormGroup({      
    mentorDate: new FormControl('', [Validators.required]),
    menteeDate: new FormControl('', [Validators.required]),    

  });

  StartDateForm = new FormGroup({      
    mentorDate: new FormControl('', [Validators.required]),
    menteeDate: new FormControl('', [Validators.required]),    

  });

  skillsForm = new FormGroup({
    skillName : new FormControl('', [Validators.required]),
    skillType : new FormControl('', [Validators.required])
  })

  constructor(private fb: FormBuilder,
  private adminService: AdminService) { 
    this.error = false;
  }

  ngOnInit() {
    this.validateForm = this.fb.group({
      startDate     : Dates,
      endDate : Dates,
      cycleName    : [null ],
     
    });
    
    this.getCycles();
    this.adminService.getSkills().subscribe(res=>{

      this.skills=res;
      console.log(this.skills,res)
    
    
    })

    this.adminService.getDeadlines().subscribe(res=>{
      console.log('THIS IS RES', res)
      this.deadlines=res
      console.log(this.deadlines, "473985ytfh203re")
      this.setDeadlines(this.deadlines)
    }
    
    )
      
    
  }
editDeadline(){

  console.log(this.deadlines[0].id, "fHAIHIUAIHIUH")
  const mentorDeadline= new Date(this.deadlineForm.value.mentorDate)
  const menteeDeadline= new Date(this.deadlineForm.value.menteeDate)
  this.adminService.editDeadlines(mentorDeadline.toISOString(),menteeDeadline.toISOString(),this.deadlines[0].id).subscribe(res=>{
    console.log("deadline changed")
  })
}
editStartDate(){

  console.log(this.deadlines[0].id, "fHAIHIUAIHIUH")
  const mentorStartDate= new Date(this.StartDateForm.value.mentorDate)
  const menteeStartDate= new Date(this.StartDateForm.value.menteeDate)
  this.adminService.editStartDate(mentorStartDate.toISOString(),menteeStartDate.toISOString(),this.deadlines[0].id).subscribe(res=>{
    console.log("StartDate changed")
  })
}
  addSkill(skillId, cycleId){
    this.cyclesFetched= false;
    this.adminService.addSkilltoCycle(skillId,cycleId).subscribe(async (res) => {
      
      console.log("Skill added")
       await this.getCycles();
     
     
    }, (err) => {

      console.log("ERR")
    
    });
  }
  newCycle(){
    this.cyclesFetched= false;
    console.log(this.validateForm.value.startDate.toISOString(), "DATE")
    this.adminService.addCycle(this.validateForm.value.startDate.toISOString(),this.validateForm.value.endDate.toISOString(),this.validateForm.value.cycleName).subscribe(async (res) => {

      console.log("cycle added")
       await this.getCycles();
     
    }, (err) => {

      console.log("ERR")
    
    });
 
  }
  editCycle(){
    this.cyclesFetched= false;
    this.adminService.editCycle(this.selectedId,this.editForm.value.startDate.toISOString(),this.editForm.value.endDate.toISOString(),this.editForm.value.name).subscribe(async (res) => {
      this.open =false;
      console.log("cycle added")
       await this.getCycles();
       this.open =false;
     
    }, (err) => {

      console.log("ERR")
    
    });
 
  }

  getCycles(){
    this.adminService.getCycles().subscribe(async (res) => {

      this.cycles =  await res
      this.cyclesFetched= true;
      
      // console.log("*****CYCLES", this.cycles)
      //console.log("***************HELLLLLLOOOOOOOOOOO", this.cycles[0].start_date.toISOString())

      var now = new Date()

      var i;

      for (i = 0; i < this.cycles.length; i++) {
        if (now >= new Date(this.cycles[i].start_date) && now <= new Date(this.cycles[i].end_date)) {
          this.current = true;
          this.currentCycleId = this.cycles[i].id
          // console.log("INSIDE IF")
        }
        // console.log("iteration number ", i, " cycle id ", this.cycles[i].id)
      }

      // console.log(this.currentCycleId, "**************")

    }, (err) => {
      
    });
  }

  deleteCycle(id){
    this.cyclesFetched= false;
    console.log("DELETE")
    this.adminService.deleteCycle(id).subscribe(async (res) => {
      console.log("DELETE")
     await this.getCycles();
     
    if (id === this.currentCycleId) {
      this.currentCycleId = -1
      this.current = false
    }

   }, (err) => {
     
   });

  }

  
selectedCycle(cycle){

  // this.selectedEmp= employee;
  this.editForm.setValue({name:cycle.name, startDate: cycle.start_date, endDate: cycle.end_date })
  this.open = true;
  this.selectedId=cycle.id
  
  }

  setDeadlines(deadline){

    console.log(deadline,"HEERREE!!!!",deadline.mentor_DeadlineRegistration,deadline.mentee_DeadlineRegistration)
    // this.selectedEmp= employee;
    this.deadlineForm.setValue({mentorDate: deadline[0].mentor_DeadlineRegistration, menteeDate: deadline[0].mentee_DeadlineRegistration })
    
    console.log(this.deadlineForm.value)
  }

  newSkill() {
    if(this.skillsForm.value.skillName && this.skillsForm.value.skillType) {
      this.error = false;
      this.adminService.addSkill(this.skillsForm.value.skillName, this.skillsForm.value.skillType).subscribe(async (res) => {
        console.log("Skill Added")
        this.adminService.getSkills().subscribe(res=>{

          this.skills=res;
          console.log(this.skills,res)
      
      
        })
        
        this.skillsForm.reset()
      }, (err) => {

      });
    }

    else {
      this.error = true;
      console.log("EMPTY FIELD ERROR")
    }
  }
 


 


    
  

}
