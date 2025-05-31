import { Component } from '@angular/core';

@Component({
  selector: 'app-no-access',
  template: `
    <div class="text-center mt-20">
      <h1 class="text-3xl font-bold text-red-500">403 - No Access</h1>
      <p class="mt-4 text-lg text-gray-700">You do not have permission to view this page.</p>
    </div>
  `,
})
export class NoAccessComponent {}
