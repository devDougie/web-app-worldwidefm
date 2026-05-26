import { Component, inject, OnInit, signal } from '@angular/core';
import { RadioService } from '../../core/services/radio.service';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
    private radioService = inject(RadioService);
    protected totalRadios = signal<number>(0);

    ngOnInit(): void {
        this.radioService.getAllRadios().subscribe({
            next: (radios) => this.totalRadios.set(radios.length)
        });
    }
}