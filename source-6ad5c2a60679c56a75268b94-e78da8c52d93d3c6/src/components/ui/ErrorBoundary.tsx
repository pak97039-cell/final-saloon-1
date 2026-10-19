import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Sparkles, RefreshCw, RotateCcw } from 'lucide-react';
import { STORAGE_KEYS, safeLocalStorage } from '../../lib/storage';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Graceful silent capture without polluting console in production
  }

  private handleReload = (): void => {
    if (typeof window !== 'undefined') {
      window.location.reload();
    }
  };

  private handleResetDefaults = (): void => {
    try {
      safeLocalStorage.removeItem(STORAGE_KEYS.STUDIO);
      safeLocalStorage.removeItem(STORAGE_KEYS.SERVICES);
      safeLocalStorage.removeItem(STORAGE_KEYS.ARTISTS);
      safeLocalStorage.removeItem(STORAGE_KEYS.APPOINTMENTS);
    } catch {
      // ignore
    }
    if (typeof window !== 'undefined') {
      window.location.reload();
    }
  };

  public render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#FAF8F5] text-[#1A1A1A] flex items-center justify-center p-6 selection:bg-[#D4AF37]/20">
          <div className="max-w-md w-full bg-white border border-[#E8E2D8] p-8 sm:p-10 rounded-sm shadow-xl text-center space-y-6">
            <div className="w-14 h-14 rounded-full bg-[#1A1A1A] border border-[#D4AF37]/40 text-[#D4AF37] flex items-center justify-center mx-auto shadow-sm">
              <Sparkles className="w-6 h-6" />
            </div>

            <div className="space-y-2">
              <span className="text-[10px] uppercase tracking-widest text-[#8A6A2F] font-semibold block">
                Atelier System Notice
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-[#1A1A1A]">
                Restoring Sanctuary State
              </h2>
              <p className="text-xs text-[#1A1A1A]/70 font-sans leading-relaxed">
                An unexpected interruption occurred. You can smoothly refresh your session or restore factory seed data.
              </p>
            </div>

            <div className="space-y-3 pt-2">
              <button
                type="button"
                onClick={this.handleReload}
                className="w-full py-3 px-4 bg-[#1A1A1A] hover:bg-[#121212] text-[#FAF8F5] text-xs uppercase tracking-widest font-semibold rounded-sm border border-[#D4AF37] transition-all flex items-center justify-center gap-2 cursor-pointer min-h-[44px]"
              >
                <RefreshCw className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Reload Sanctuary</span>
              </button>

              <button
                type="button"
                onClick={this.handleResetDefaults}
                className="w-full py-2.5 px-4 bg-white border border-[#E8E2D8] hover:bg-[#FAF8F5] text-[#1A1A1A] text-xs uppercase tracking-wider font-medium rounded-sm transition-colors flex items-center justify-center gap-2 cursor-pointer min-h-[44px]"
              >
                <RotateCcw className="w-3.5 h-3.5 text-[#8A6A2F]" />
                <span>Reset to Seed Defaults</span>
              </button>
            </div>

            <p className="text-[10px] text-[#1A1A1A]/40 font-mono">
              Luxeora Studio • Super Market F-6 Islamabad
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
