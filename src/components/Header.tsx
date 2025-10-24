import { Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const navItems = [
    {
      label: "Account",
      items: ["My Profile", "Settings", "Orders", "Sign Out"]
    },
    {
      label: "Settings",
      items: ["General", "Security", "Notifications", "Preferences"]
    },
    {
      label: "About Us",
      items: ["Our Story", "Team", "Careers", "Contact"]
    },
    {
      label: "Feedback",
      items: ["Submit Feedback", "Report Issue", "Suggestions", "Reviews"]
    },
    {
      label: "Privacy & Policy",
      items: ["Privacy Policy", "Terms of Service", "Cookie Policy", "Legal"]
    }
  ];

  const languages = ["English", "Spanish", "French", "German", "Chinese"];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between flex-wrap gap-4">
          {/* Navigation */}
          <nav className="flex items-center gap-4 md:gap-8 flex-wrap">
            {navItems.map((item) => (
              <DropdownMenu key={item.label}>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="text-foreground hover:text-foreground/80 font-normal px-2 md:px-0 h-auto text-sm md:text-base">
                    {item.label}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-card border-border z-50">
                  {item.items.map((subItem) => (
                    <DropdownMenuItem 
                      key={subItem}
                      className="cursor-pointer hover:bg-muted"
                    >
                      {subItem}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ))}
          </nav>

          {/* Language Selector */}
          <div className="flex items-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2 rounded-lg">
                  <Globe className="h-4 w-4" />
                  <span>Language</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-card border-border z-50">
                {languages.map((lang) => (
                  <DropdownMenuItem 
                    key={lang}
                    className="cursor-pointer hover:bg-muted"
                  >
                    {lang}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
