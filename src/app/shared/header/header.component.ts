import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  isUserMenuOpen = false;
  isMobileSearchOpen = false;

  toggleUserMenu() { this.isUserMenuOpen = !this.isUserMenuOpen; }
  toggleMobileSearch() { this.isMobileSearchOpen = !this.isMobileSearchOpen; }

  @HostListener('document:click', ['$event'])
  onDocClick(e: MouseEvent) {
    const path = e.composedPath() as HTMLElement[];
    const clickedInsideUser = path.some(el => (el as HTMLElement)?.id === 'userMenuBtn' || (el as HTMLElement)?.id === 'userMenu');
    if (!clickedInsideUser) this.isUserMenuOpen = false;
  }
}
