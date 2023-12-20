import { isPlatformServer } from '@angular/common';
import { Injectable, PLATFORM_ID, inject } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RuntimeService {
  readonly #platformId = inject(PLATFORM_ID);

  isServer = isPlatformServer(this.#platformId);
}
