import { Component, ChangeDetectionStrategy, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DockComponent, App } from './components/sidebar/sidebar.component';
import { WindowComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { JourneyComponent } from './components/journey/journey.component';
import { SkillsComponent } from './components/skills/skills.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { AiAssistantComponent } from './components/ai-assistant/ai-assistant.component';
import { ContactComponent } from './components/contact/contact.component';
import { DataService } from './services/data.service';

export interface WindowInstance {
  id: string;
  app: App;
  zIndex: number;
  position: { x: number; y: number };
  size: { width: number, height: number };
  isMaximized: boolean;
  previousState?: {
    position: { x: number; y: number };
    size: { width: number; height: number };
  };
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    DockComponent,
    WindowComponent,
    HomeComponent,
    JourneyComponent,
    SkillsComponent,
    ProjectsComponent,
    AiAssistantComponent,
    ContactComponent
  ],
  providers: [DataService]
})
export class AppComponent {
  apps: App[] = [
    { id: 'home', name: 'Welcome', icon: 'fa-id-card' },
    { id: 'journey', name: 'Journey', icon: 'fa-timeline' },
    { id: 'skills', name: 'Skills', icon: 'fa-code' },
    { id: 'projects', name: 'Projects', icon: 'fa-layer-group' },
    { id: 'ai-assistant', name: 'Terminal', icon: 'fa-terminal' },
    { id: 'contact', name: 'Contact', icon: 'fa-paper-plane' },
  ];

  windows = signal<WindowInstance[]>([]);
  private nextZIndex = signal(10);
  
  highestZIndex = computed(() => {
    const allZIndexes = this.windows().map(w => w.zIndex);
    return allZIndexes.length > 0 ? Math.max(...allZIndexes) : 9;
  });

  openWindowsMap = computed(() => {
    return this.windows().reduce((acc, curr) => {
      acc[curr.id] = true;
      return acc;
    }, {} as Record<string, boolean>);
  });

  openApp(appId: string): void {
    const existingWindow = this.windows().find(w => w.id === appId);
    if (existingWindow) {
      this.focusWindow(appId);
      return;
    }

    const app = this.apps.find(a => a.id === appId);
    if (!app) return;

    const newZIndex = this.highestZIndex() + 1;
    this.nextZIndex.set(newZIndex + 1);
    
    // Default positions and sizes
    const initialPositions: { [key: string]: { pos: {x: number, y: number}, size: {width: number, height: number} } } = {
        'home': { pos: { x: 50, y: 50 }, size: { width: 700, height: 450 } },
        'journey': { pos: { x: 100, y: 100 }, size: { width: 450, height: 600 } },
        'skills': { pos: { x: 150, y: 150 }, size: { width: 650, height: 500 } },
        'projects': { pos: { x: 200, y: 80 }, size: { width: 800, height: 550 } },
        'ai-assistant': { pos: { x: 250, y: 120 }, size: { width: 680, height: 500 } },
        'contact': { pos: { x: 300, y: 160 }, size: { width: 600, height: 400 } },
    };

    const config = initialPositions[appId] || { pos: { x: 100, y: 100 }, size: { width: 600, height: 400 } };
    
    this.windows.update(ws => [...ws, { 
      id: appId, 
      app, 
      zIndex: newZIndex,
      position: config.pos,
      size: config.size,
      isMaximized: false
    }]);
  }

  closeWindow(windowId: string): void {
    this.windows.update(ws => ws.filter(w => w.id !== windowId));
  }

  focusWindow(windowId: string): void {
    const windowToFocus = this.windows().find(w => w.id === windowId);
    if (windowToFocus && windowToFocus.zIndex === this.highestZIndex()) {
        return; // Already focused
    }

    const newZIndex = this.highestZIndex() + 1;
    this.nextZIndex.set(newZIndex + 1);

    this.windows.update(ws => ws.map(w => 
      w.id === windowId ? { ...w, zIndex: newZIndex } : w
    ));
  }

  updateWindowPosition(event: { id: string; position: { x: number; y: number } }): void {
    this.windows.update(ws => ws.map(w =>
        w.id === event.id ? { ...w, position: event.position } : w
    ));
  }

  updateWindowSize(event: { id: string; size: { width: number; height: number } }): void {
    this.windows.update(ws => ws.map(w =>
        w.id === event.id ? { ...w, size: event.size } : w
    ));
  }

  toggleMaximizeWindow(windowId: string): void {
    this.windows.update(ws => ws.map(w => {
      if (w.id !== windowId) return w;
      
      if (w.isMaximized) {
        // Restore
        return { 
          ...w, 
          isMaximized: false,
          position: w.previousState!.position,
          size: w.previousState!.size
        };
      } else {
        // Maximize
        const mainElement = document.querySelector('main');
        const desktopRect = mainElement ? mainElement.getBoundingClientRect() : { width: window.innerWidth, height: window.innerHeight, top: 0, left: 0 };
        const newWidth = desktopRect.width - 40;
        const newHeight = desktopRect.height - 40;
        return { 
          ...w, 
          isMaximized: true,
          previousState: { position: w.position, size: w.size },
          position: { x: 20, y: 20 },
          size: { width: newWidth, height: newHeight }
        };
      }
    }));
    this.focusWindow(windowId);
  }
}