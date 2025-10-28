import { useState } from "react";
import { Globe } from "lucide-react";
import { useTranslation } from 'react-i18next';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

type DialogType = "account" | "settings" | "about" | "feedback" | "privacy" | null;

const Header = () => {
  const [openDialog, setOpenDialog] = useState<DialogType>(null);
  const { t, i18n } = useTranslation();
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };
  const dialogContent = {
    
      title: "Account",
      description: "Manage your account settings and preferences",
      items: ["Profile Settings", "Billing Information", "Security", "Notifications"],
    },
    settings: {
      title: "Settings",
      description: "Configure your application preferences",
      items: ["General Settings", "Display Options", "Privacy Controls", "Advanced"],
    },
    about: {
      title: "About Us",
      description: "Learn more about our company and mission",
      items: ["Company History", "Our Team", "Mission & Values", "Contact Information"],
    },
    feedback: {
      title: "Feedback",
      description: "Share your thoughts and suggestions with us",
      items: ["Submit Feedback", "Report an Issue", "Feature Request", "Customer Support"],
    },
    privacy: {
      title: "Privacy & Policy",
      description: "Our commitment to protecting your information",
      items: ["Privacy Policy", "Terms of Service", "Cookie Policy", "Data Protection"],
    },
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <div className="text-xl font-bold text-primary">Ekko Business</div>
            
            <nav className="hidden md:flex items-center gap-8">
              <button
                onClick={() => setOpenDialog("account")}
                // 🎯 เปลี่ยนสีข้อความเป็น text-primary
                className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
              >
                Account
              </button>
              <button
                onClick={() => setOpenDialog("settings")}
                // 🎯 เปลี่ยนสีข้อความเป็น text-primary
                className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
              >
                Settings
              </button>
              <button
                onClick={() => setOpenDialog("about")}
                // 🎯 เปลี่ยนสีข้อความเป็น text-primary
                className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
              >
                About Us
              </button>
              <button
                onClick={() => setOpenDialog("feedback")}
                // 🎯 เปลี่ยนสีข้อความเป็น text-primary
                className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
              >
                Feedback
              </button>
              <button
                onClick={() => setOpenDialog("privacy")}
                // 🎯 เปลี่ยนสีข้อความเป็น text-primary
                className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
              >
                Privacy & Policy
              </button>
            </nav>

            {/* ส่วนปุ่มเปลี่ยนภาษา */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                {/* 🎯 แก้ไข Button ให้มีสีข้อความหลักเป็น text-primary */}
                <Button variant="outline" size="sm" className="gap-2 text-primary border-primary hover:bg-primary/10">
                  <Globe className="h-4 w-4" />
                  <span className="hidden sm:inline">Language</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-popover">
                <DropdownMenuItem>Thailand</DropdownMenuItem>
                <DropdownMenuItem>English</DropdownMenuItem>
                <DropdownMenuItem>Français</DropdownMenuItem>
                <DropdownMenuItem>Deutsch</DropdownMenuItem>
                <DropdownMenuItem>中文</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {openDialog && (
        <Dialog open={!!openDialog} onOpenChange={() => setOpenDialog(null)}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>{dialogContent[openDialog].title}</DialogTitle>
              <DialogDescription>
                {dialogContent[openDialog].description}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-2 py-4">
              {dialogContent[openDialog].items.map((item) => (
                <Button
                  key={item}
                  variant="outline"
                  className="justify-start"
                >
                  {item}
                </Button>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default Header;
