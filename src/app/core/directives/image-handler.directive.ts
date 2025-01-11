import { Directive, ElementRef, Renderer2, output, input, inject, model, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[scImageHandler]',
  standalone: false,
})
export class ImageHandlerDirective implements OnChanges {

  private readonly el = inject(ElementRef<HTMLDivElement>);
  private readonly renderer = inject(Renderer2);

  readonly imagePath = model<string>('');
  readonly alt = input<string>('Upload File');
  readonly saveIcon = input<boolean>(false);
  readonly defaultImage = input('assets/images/avatar_1.webp');
  readonly imgStyle = input('height: 8rem; width: 8rem; border-radius: 50%');
  readonly image = output<File>();
  readonly save = output();

  private imageEl!: HTMLImageElement;

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['imagePath'] || changes['defaultImage']) {
      this.el.nativeElement.innerHTML = '';
      this.createImageUploadElement();
    } else if(changes['imgStyle']) {
      this.imageEl.setAttribute('style', this.imgStyle())
    }
    this.imageEl.alt = this.alt();
  }

  private createImageUploadElement() {
    const container = this.el.nativeElement;
    this.addRequiredClasses(container);

    const inputFile = this.renderer.createElement('input');
    this.renderer.setAttribute(inputFile, 'type', 'file');
    this.renderer.setAttribute(inputFile, 'hidden', 'true');

    const uploadImageDiv = this.renderer.createElement('div');
    this.renderer.addClass(uploadImageDiv, 'upload_image');
    this.renderer.listen(uploadImageDiv, 'click', () => inputFile.click());

    const imgElement = this.renderer.createElement('img');
    this.renderer.setAttribute(imgElement, 'style', this.imgStyle());
    this.renderer.setAttribute(imgElement, 'alt', this.alt());

    const saveIcon = this.renderer.createElement('mat-icon');
    this.renderer.addClass(saveIcon,'save');
    saveIcon.style.display = 'none';
    if(this.saveIcon()) {
      this.renderer.listen(saveIcon, 'click', () => this.save.emit());
      this.renderer.appendChild(uploadImageDiv, saveIcon);
    }

    this.renderer.listen(inputFile, 'change', (event: Event) => {
      saveIcon.style.display = 'block';
      this.onFileChange(event)
    });

    const imagePath = this.imagePath();
    if (imagePath) {
      this.renderer.setAttribute(imgElement, 'src', imagePath);
    } else {
      this.renderer.setAttribute(imgElement, 'src', this.defaultImage());
    }

    this.imageEl = imgElement;
    this.renderer.appendChild(uploadImageDiv, imgElement);
    this.renderer.appendChild(container, inputFile);
    this.renderer.appendChild(container, uploadImageDiv);
  }

  private addRequiredClasses(container: HTMLElement) {
    const requiredClasses = ['d-flex', 'flex-column', 'align-items-center', 'justify-content-center'];

    requiredClasses.forEach((className) => {
      this.renderer.addClass(container, className);
    });
  }

  private onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files?.[0]) {
      const reader = new FileReader();
      this.image.emit(input.files[0]);
      reader.readAsDataURL(input.files[0]);
      reader.onload = () => {
        this.imagePath.set(reader.result as string);
        this.imageEl.src = this.imagePath();
      };
    }
  }
}
