import { Component, ChangeDetectionStrategy, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import type { WindowInstance } from '../../app.component';

@Component({
  selector: 'app-window',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WindowComponent {
  windowInstance = input.required<WindowInstance>();
  isActive = input.required<boolean>();
  
  close = output<void>();
  focus = output<void>();
  positionChange = output<{ id: string, position: { x: number, y: number } }>();
  sizeChange = output<{ id: string, size: { width: number, height: number } }>();
  maximize = output<void>();

  private isDragging = false;
  private dragStartPos = { x: 0, y: 0 };
  private windowStartPos = { x: 0, y: 0 };

  private isResizing = false;
  private resizeStartPos = { x: 0, y: 0 };
  private windowStartSize = { width: 0, height: 0 };
  
  onDragStart(event: MouseEvent): void {
    if ((event.target as HTMLElement).closest('.window-control') || this.windowInstance().isMaximized) {
      return; // Don't drag if clicking on a control button or maximized
    }
    this.isDragging = true;
    this.dragStartPos = { x: event.clientX, y: event.clientY };
    this.windowStartPos = { ...this.windowInstance().position };
    this.onFocus();

    const onDragMove = (moveEvent: MouseEvent) => this.onDragMove(moveEvent);
    const onDragEnd = () => {
      this.isDragging = false;
      document.body.style.cursor = 'default';
      window.removeEventListener('mousemove', onDragMove);
      window.removeEventListener('mouseup', onDragEnd);
    };
    
    document.body.style.cursor = 'grabbing';
    window.addEventListener('mousemove', onDragMove);
    window.addEventListener('mouseup', onDragEnd);
  }

  private onDragMove(event: MouseEvent): void {
    if (!this.isDragging) return;
    const dx = event.clientX - this.dragStartPos.x;
    const dy = event.clientY - this.dragStartPos.y;
    
    const newPosition = {
      x: this.windowStartPos.x + dx,
      y: this.windowStartPos.y + dy,
    };
    this.positionChange.emit({ id: this.windowInstance().id, position: newPosition });
  }
  
  onResizeStart(event: MouseEvent): void {
    event.stopPropagation();
    this.isResizing = true;
    this.resizeStartPos = { x: event.clientX, y: event.clientY };
    this.windowStartSize = { ...this.windowInstance().size };
    this.onFocus();
    
    const onResizeMove = (moveEvent: MouseEvent) => {
      if (!this.isResizing) return;
      const dx = moveEvent.clientX - this.resizeStartPos.x;
      const dy = moveEvent.clientY - this.resizeStartPos.y;

      const newSize = {
        width: Math.max(350, this.windowStartSize.width + dx), // Min width
        height: Math.max(200, this.windowStartSize.height + dy), // Min height
      };
      this.sizeChange.emit({ id: this.windowInstance().id, size: newSize });
    };

    const onResizeEnd = () => {
      this.isResizing = false;
      window.removeEventListener('mousemove', onResizeMove);
      window.removeEventListener('mouseup', onResizeEnd);
    };

    window.addEventListener('mousemove', onResizeMove);
    window.addEventListener('mouseup', onResizeEnd);
  }

  onMaximize(event: MouseEvent) {
    event.stopPropagation();
    this.maximize.emit();
  }

  onClose(event: MouseEvent): void {
    event.stopPropagation();
    this.close.emit();
  }
  
  onFocus(): void {
    if (!this.isActive()) {
      this.focus.emit();
    }
  }
}
