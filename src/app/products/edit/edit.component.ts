import { Component, OnInit } from '@angular/core';
import { ApiFunctionService } from '../services/api-function.service';
import { FormControl, FormGroup } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  productEdit: FormGroup;
  id: any;

  constructor(private service: ApiFunctionService, private route: ActivatedRoute, private fireStorage: AngularFireStorage, private router: Router) {
    this.productEdit = new FormGroup({
      title: new FormControl(''),
      desc: new FormControl(''),
      imgUrl: new FormControl('')
    })
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.service.getItem(this.id).subscribe((res:any)=>{
      
    })
  }
  editProduct(id: string) {
    this.service.editProduct(id, this.productEdit.value).subscribe(() => {
      this.router.navigateByUrl('/products')
    })
  }
  async onFileChange(event: any) {
    const file = event.target.files[0]
    if (file) {
      const path = `assets/${file.name}`
      const uploadTask = await this.fireStorage.upload(path, file)
      const url = await uploadTask.ref.getDownloadURL()
      this.productEdit.get('imgUrl')?.setValue(url)
    }
  }

}
