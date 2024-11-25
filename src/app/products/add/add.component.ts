import { Component, OnInit } from '@angular/core';
import { ApiFunctionService } from '../services/api-function.service';
import { FormControl, FormGroup } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  productPost: FormGroup;
  constructor(private service: ApiFunctionService, private fireStorage: AngularFireStorage) {
    this.productPost = new FormGroup({
      title: new FormControl(''),
      desc: new FormControl(''),
      imgUrl: new FormControl('')
    })
  }

  async onFileChange(event: any) {
    const file = event.target.files[0]
    if (file) {
      const path = `assets/${file.name}`
      const uploadTask = await this.fireStorage.upload(path, file)
      const url = await uploadTask.ref.getDownloadURL()
      this.productPost.get('imgUrl')?.setValue(url)
    }
  }

  postProduct() {
    this.service.postProduct(this.productPost.value).subscribe(responseData => {
      console.log(responseData)
    })
  }

  ngOnInit(): void {
  }

}
