import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild('myModal') model: ElementRef | undefined;
  studentObj: Student = new Student();
  studentList: any[] = [
    { name: 'John Doe', email: 'john@example.com', city: 'New York', state: 'NY', pincode: '10001', address: '123 Street' },
    { name: 'Jane Smith', email: 'jane@example.com', city: 'Los Angeles', state: 'CA', pincode: '90001', address: '456 Avenue' }
  ];
  filteredList: any[] = [...this.studentList];
  searchTerm: string = '';

  currentPage: number = 1;
  itemsPerPage: number = 5;

  ngOnInit(): void {
    if (typeof localStorage !== 'undefined') {
      const localData = localStorage.getItem("Studentdata");
      if (localData != null) {
        this.studentList = JSON.parse(localData);
        
        
      }
    }
  }

  filterStudents(): void {
    if (this.searchTerm.trim() === ''){
      this.filteredList = [...this.studentList];
      
    }else{
    const term = this.searchTerm.toLowerCase();
    this.studentList = this.studentList.filter(student =>
      student.name.toLowerCase().includes(term) ||
      student.email.toLowerCase().includes(term) ||
      student.city.toLowerCase().includes(term)  ||
      student.state.toLowerCase().includes(term)
    );
  
  }
  

  }
  

  openModel() {
    const model = document.getElementById("myModal");
    if (model != null) {
      model.style.display = 'block';
    }
  }

  closeModel() {
    this.studentObj = new Student();
    if (this.model != null) {
      this.model.nativeElement.style.display = 'none';
    }
  }

  onDelete(item: Student) {
    const isDelete = confirm("Are you sure want to Delete");
    if (isDelete) {
      const currentRecord = this.studentList.findIndex(m => m.id === item.id);
      this.studentList.splice(currentRecord, 1);
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('Studentdata', JSON.stringify(this.studentList));
      }
    }
  }

  onEdit(item: Student) {
    this.studentObj = item;
    this.openModel();
  }

  updateStud() {
    const currentRecord = this.studentList.find(m => m.id === this.studentObj.id);
    if (currentRecord != undefined) {
      currentRecord.name = this.studentObj.name;
      currentRecord.address = this.studentObj.address;
      currentRecord.email = this.studentObj.email;
      currentRecord.city = this.studentObj.city;
      currentRecord.state = this.studentObj.state;
      currentRecord.mobileNo = this.studentObj.mobileNo;
      currentRecord.pincode = this.studentObj.pincode;
    }
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('Studentdata', JSON.stringify(this.studentList));
    }
    this.closeModel();
  }

  saveStudent() {
    if (typeof localStorage !== 'undefined') {
      const isLocalPresent = localStorage.getItem("Studentdata");
      if (isLocalPresent != null) {
        const oldArray = JSON.parse(isLocalPresent);
        this.studentObj.id = oldArray.length + 1;
        oldArray.push(this.studentObj);
        this.studentList = oldArray;
        localStorage.setItem('Studentdata', JSON.stringify(oldArray));
      } else {
        const newArr = [];
        newArr.push(this.studentObj);
        this.studentObj.id = 1;
        this.studentList = newArr;
        localStorage.setItem('Studentdata', JSON.stringify(newArr));
      }
    }
    this.closeModel();
  }
}

export class Student {
  id: number;
  name: string;
  mobileNo: string;
  email: string;
  city: string;
  state: string;
  pincode: string;
  address: string;

  constructor() {
    this.id = 0;
    this.address = '';
    this.city = '';
    this.pincode = '';
    this.state = '';
    this.email = '';
    this.mobileNo = '';
    this.name = '';
  }
}
