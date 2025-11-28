import { Calculator } from '@/components/calculator/Calculator';
import { Helmet } from 'react-helmet-async';

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Calculator | Beautiful Scientific Calculator</title>
        <meta name="description" content="A beautiful, modern calculator with basic and scientific modes. Features glassmorphism design, calculation history, and keyboard support." />
      </Helmet>
      
      <main className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 relative overflow-hidden">
        {/* Ambient background effects */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Gradient orbs */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        </div>

        {/* Content */}
        <div className="relative z-10 w-full max-w-md">
          {/* Header */}
          <header className="text-center mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
              Calculator
            </h1>
            <p className="text-sm text-muted-foreground">
              Basic & Scientific modes • History • Keyboard support
            </p>
          </header>

          {/* Calculator */}
          <Calculator />

          {/* Footer */}
          <footer className="mt-8 text-center">
            <p className="text-xs text-muted-foreground">
              Built with React • Glassmorphism Design
            </p>
          </footer>
        </div>
      </main>
    </>
  );
};

export default Index;
