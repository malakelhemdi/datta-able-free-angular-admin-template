import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'manage-roles',
  templateUrl: './manage-roles.component.html',
  styleUrls: ['./manage-roles.component.scss']
})
export default class ManageRolesComponent {
  constructor(
    private fb: FormBuilder,
    private ActivatedRoute: ActivatedRoute,
    private router: Router
  ) {}
}
