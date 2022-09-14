import {Component} from '@angular/core';
import {IUploadImage} from './interfaces/IUploadImage';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  public maxImgCount: number = 5;
  public allImages: IUploadImage[] = [];
  public showingImages: IUploadImage[] = [];

  private renderImage(image: IUploadImage): void {
    if (image) {
      this.showingImages.push(image);
      let reader = new FileReader();
      reader.onload = (event: any) => {
        image.src = event?.target?.result;

        if (this.allImages?.length > this.maxImgCount) {
          this.allImages.forEach((item, i) => {
            if (item?.src) {
              this.renderImage(this.allImages[this.maxImgCount]);
              this.allImages.splice(i, 1);
            }
          });
        }
      }

      setTimeout(() => {
        reader.readAsDataURL(image.file);
      }, 10000 * Math.random());
    }
  }

  public onFileChange(event: any): void {
    if (event?.target?.files?.length) {
      this.allImages = [];
      [...event.target.files].forEach((item: File) => {
        this.allImages.push({file: item});
      });
      this.showImages();
    }
  }

  public showImages(): void {
    for (let i = 0; i < this.maxImgCount; i++) {
      this.renderImage(this.allImages[i]);
    }
  }

  public getUploadedImgData(): string {
    let uploadedImagesCount: number = 0;
    this.showingImages.forEach((item: IUploadImage) => {
      if (item?.src) {
        uploadedImagesCount += 1;
      }
    })
    return `${uploadedImagesCount} / ${this.showingImages?.length}`;
  }
}
