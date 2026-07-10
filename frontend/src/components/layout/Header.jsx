export default function Header({ title, showSearch }) {
  return (
    <header className="flex justify-between items-center h-16 px-md bg-background/80 backdrop-blur-md sticky top-0 z-40">
      <div className="flex items-center">
        <h2 className="text-headline-md font-headline-md font-semibold text-primary">{title}</h2>
      </div>
      <div className="flex items-center space-x-lg">
        {showSearch && (
          <div className="relative group">
            <div className="flex items-center bg-surface-container-low px-4 py-2 rounded-full border border-outline-variant/20 focus-within:border-primary transition-all">
              <span className="material-symbols-outlined text-outline mr-2">search</span>
              <input 
                className="bg-transparent border-none focus:ring-0 text-label-md w-64 p-0 outline-none" 
                placeholder="Search..." 
                type="text" 
              />
            </div>
          </div>
        )}
        <div className="flex items-center space-x-md">
          <div className="relative cursor-pointer hover:text-primary transition-colors">
            <span className="material-symbols-outlined">notifications</span>
            <span className="absolute top-0 right-0 w-2 h-2 bg-error rounded-full"></span>
          </div>
          <span className="material-symbols-outlined cursor-pointer hover:text-primary transition-colors">help_outline</span>
        </div>
      </div>
    </header>
  );
}
