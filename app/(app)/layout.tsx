import Navbar from '@/components/Navbar';

interface RootLayoutProps {
  children: React.ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
  return (
    
      <div suppressHydrationWarning={true} className="flex flex-col min-h-screen">
      
      {children}
      
    </div>
    
    
  );
}