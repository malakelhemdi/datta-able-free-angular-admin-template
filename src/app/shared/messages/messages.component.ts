import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, NgZone, OnInit } from '@angular/core';
import { SharedFacade } from '../shared.facade';
import { Messages, MessageType } from '../shared.interfaces';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

type MessageWidth = 'login' | 'main';


declare var $: any;

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class MessagesComponent implements OnInit {
  @Input() messageWidth = 'login';
  showAlert: boolean = false;
  messageContent$ = new Observable<Messages | null>();

  constructor(protected sharedFacade: SharedFacade) {

  }
  ngOnInit(): void {
    this.sharedFacade.messages$.subscribe(res => {
      Swal.fire({
        position: 'center',
        icon: res.type,
        title: res.title,
        text: res.text,
        showConfirmButton: false,
        timer: res.type == MessageType.success ? 2000 : 7000
      })
    });
  }
}
