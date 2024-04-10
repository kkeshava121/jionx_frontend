import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor(private toastr: ToastrService) {}
  success(title: string, message: string, options?: {}) {
    this.toastr.success(message, title, {
      progressBar: true,
    });
  }
  warning(title: string, message: string, options?: {}) {
    this.toastr.warning(message, title, {
      progressBar: true,
    });
  }
  error(title: string, message: string, options?: {}) {
    this.toastr.error(message, title, {
      progressBar: true,
      //timeOut: 45454545,
    });
  }
  conformAlert(title: string, text: string) {
		return Swal.fire({
			title: title,
			text: text,
			icon: 'warning',
			showCancelButton: true,
			allowOutsideClick: false,
			confirmButtonText: 'Yes',
			confirmButtonColor: '#414042',
			cancelButtonText: 'No',
			cancelButtonColor: '#ff4500',
			backdrop: true,
			showCloseButton: true
		});
	}
}
