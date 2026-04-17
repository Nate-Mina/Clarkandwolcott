import { ChangeDetectionStrategy, Component, OnInit, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgClass } from '@angular/common';

interface Testimonial {
  name: string;
  quote: string;
}

interface SiteContent {
  heroTitle: string;
  heroSubtitle: string;
  phone: string;
  email: string;
  aboutText: string;
  testimonials?: Testimonial[];
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-root',
  imports: [NgClass],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  private http = inject(HttpClient);

  content = signal<SiteContent>({
    heroTitle: 'Expert Masonry & Construction in Rochester, NY',
    heroSubtitle: 'Providing high-quality, aesthetically pleasing structures with an emphasis on craftsmanship, safety, and sustainability.',
    phone: '585-261-3180',
    email: 'JClark@clarkandwolcott.net',
    aboutText: 'At Clark & Wolcott, we specialize in providing a wide range of masonry construction services. We are dedicated to creating high-quality and aesthetically pleasing structures, with an emphasis on craftsmanship, safety, and sustainability.',
    testimonials: []
  });

  isMobileMenuOpen = signal(false);

  ngOnInit() {
    this.http.get<SiteContent>('/content.json').subscribe({
      next: (data) => {
        this.content.set({ ...this.content(), ...data });
      },
      error: (err) => {
        console.error('CMS data not found, using default text.', err);
      }
    });
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen.update(v => !v);
  }

  closeMobileMenu() {
    this.isMobileMenuOpen.set(false);
  }
}
