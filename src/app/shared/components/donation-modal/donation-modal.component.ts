import {Component, OnInit} from '@angular/core';
import {animate, style, transition, trigger} from "@angular/animations";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {DonationModalService} from "../../../core/services/donation/donation-modal.service";
import {map, Observable, startWith} from "rxjs";
import {IconCloseComponent} from "../../icons/close/icon-close.component";
import {FieldComponent} from "../form/field/field.component";
import {LabelComponent} from "../form/label/label.component";
import {ErrorComponent} from "../form/error/error.component";
import {FormElementDirective} from "../../directives/form-element.directive";
import {MatCheckbox} from "@angular/material/checkbox";
import {ButtonComponent} from "../form/button/button.component";

@Component({
  selector: 'app-donation-modal',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatAutocompleteModule,
    CommonModule,
    IconCloseComponent,
    FieldComponent,
    LabelComponent,
    ErrorComponent,
    FormElementDirective,
    MatCheckbox,
    ButtonComponent
  ],
  templateUrl: './donation-modal.component.html',
  styleUrl: './donation-modal.component.scss',
  animations: [
    trigger('overlayAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('100ms', style({ opacity: 0.75 })),
      ]),
      transition(':leave', [
        animate('100ms', style({ opacity: 0 }))
      ])
    ]),
    trigger('modalAnimation', [
      transition(':enter', [
        style({ top: '400px' }),
        animate('200ms', style({ top: '120px'}))
      ]),
      transition(':leave', [
        animate('200ms', style({ top: '400px' }))
      ])
    ])
  ]
})
export class DonationModalComponent implements OnInit {
  constructor(private fb: FormBuilder, private donationModalService: DonationModalService) {
  }

  modalOpened: boolean = false;

  donationForm = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required]],
    comment: ['', [Validators.maxLength(500)]],
    anonymousDonation: ['', [Validators.required]],
    country: ['', [Validators.required, Validators.pattern('^[A-Z]{2}$')]],
    addressLine1: ['', [Validators.required]],
    addressLine2: ['', []],
    city: ['', [Validators.required]],
    state: ['', [Validators.required]],
    postalCode: ['', [Validators.required]],
  });

  onSubmit() {
    console.log(this.donationForm);
  }

  options: {name: string, code: string}[] = [
    {name: "Denmark", code: "DK"},
    {name: "Djibouti", code: "DJ"},
    {name: "Dominica", code: "DM"},
    {name: "Ecuador", code: "EC"},
    {name: "Egypt", code: "EG"}
  ];
  filteredOptions: Observable<{name: string, code: string}[]>;

  ngOnInit() {
    this.filteredOptions = this.donationForm.controls.country.valueChanges.pipe(
      startWith(''),
      map(value => {
        return this.options.filter(option => option.name.toLowerCase().includes(value.toLowerCase()))
      }),
    );

    this.donationModalService.donationModal().subscribe({
      next: (value: boolean) => this.modalOpened = value
    })
  }
}
