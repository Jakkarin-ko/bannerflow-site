import { useState, useEffect, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

const API_ENDPOINT = "https://aidetect-github-io.onrender.com";

const Questionnaire = () => {
  const [serverStatus, setServerStatus] = useState<"checking" | "online" | "offline">("checking");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({ title: "", message: "" });
  const [formData, setFormData] = useState({
    age: "",
    urine: "",
    bmi: "",
    water: "",
    bp: "",
    mass: "",
    massChange: "",
    gender: "",
    symptoms: [] as string[],
  });
  const { toast } = useToast();

  useEffect(() => {
    checkServerStatus();
  }, []);

  const checkServerStatus = async () => {
    try {
      const response = await fetch(`${API_ENDPOINT}/api/status`, { method: "GET" });
      const data = await response.json();
      if (data.status === "online") {
        setServerStatus("online");
      } else {
        setServerStatus("offline");
        setTimeout(checkServerStatus, 5000);
      }
    } catch (error) {
      setServerStatus("offline");
      setTimeout(checkServerStatus, 5000);
    }
  };

  const handleSymptomChange = (symptom: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      symptoms: checked
        ? [...prev.symptoms, symptom]
        : prev.symptoms.filter((s) => s !== symptom),
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const allEmpty =
      !formData.age &&
      !formData.urine &&
      !formData.bmi &&
      !formData.water &&
      !formData.bp &&
      !formData.mass &&
      !formData.massChange &&
      !formData.gender &&
      formData.symptoms.length === 0;

    if (allEmpty) {
      setModalContent({
        title: "Analysis Result",
        message: "Predicted Disease: Normal Condition 🟢",
      });
      setIsModalOpen(true);
      return;
    }

    const data62Features: Record<string, number> = {
      "0-1": 0, "5-15": 0, "10-20": 0, "40+": 0, "45+": 0, "50+": 0, "60+": 0, "65+": 0,
      "<500": 0, "<800": 0, "350-550": 0, "800-2000": 0, "2000-3000": 0, ">2000": 0, ">3000": 0,
      ">=18.5": 0, ">=25": 0, "N/a": 0, "<=2700": 0, ">=3700": 0, "120/80": 0, ">130/80": 0,
      "<130/80": 0, ">=130/80": 0, ">140/80": 0, "95-145/80": 0, "Mass": 0, "Negligible": 0,
      "Overweight": 0, "M+/-": 0, "M+7Kg": 0, "-M+7Kg or 10Kg": 0, "M minus 1Kg": 0,
      "M minus 5Kg": 0, "M minus 10Kg": 0, "M minus 0.5-1Kg": 0, "<M": 0, "No change": 0,
      "Negligible.1": 0, "Male": 0, "Female": 0, "Wheezing": 0, "Headache": 0,
      "Short Breaths": 0, "Rapid Breathing": 0, "Anxiety": 0, "Urine at Night": 0,
      "Irritability": 0, "Blurred Vision": 0, "Slow Healing": 0, "Dry Mouth": 0,
      "Muscle Aches": 0, "Nausea/Vomiting": 0, "Insomnia": 0, "Chest Pain": 0,
      "Dizziness": 0, "Nosebleeds": 0, "Foamy Urine": 0, "Abdominal Pain": 0,
      "Itchy Skin": 0, "Dark Urine": 0, "Bone Pain": 0,
    };

    const fields = [
      "age", "urine", "bmi", "water", "bp", "mass", "massChange", "gender",
    ] as const;

    fields.forEach((field) => {
      const value = formData[field];
      if (value && data62Features.hasOwnProperty(value)) {
        data62Features[value] = 1;
      }
    });

    formData.symptoms.forEach((symptom) => {
      if (data62Features.hasOwnProperty(symptom)) {
        data62Features[symptom] = 1;
      }
    });

    try {
      const response = await fetch(`${API_ENDPOINT}/predict`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data62Features),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }

      const result = await response.json();
      setModalContent({
        title: "Analysis Result",
        message: `Predicted Disease: ${result.prediction}`,
      });
      setIsModalOpen(true);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      toast({
        title: "Error",
        description: `Could not connect to the server: ${errorMessage}`,
        variant: "destructive",
      });
    }
  };

  const symptoms = [
    "Wheezing", "Headache", "Short Breaths", "Rapid Breathing", "Anxiety",
    "Urine at Night", "Irritability", "Blurred Vision", "Slow Healing",
    "Dry Mouth", "Muscle Aches", "Nausea/Vomiting", "Insomnia",
    "Chest Pain", "Dizziness", "Nosebleeds", "Foamy Urine",
    "Abdominal Pain", "Itchy Skin", "Dark Urine", "Bone Pain",
  ];

  return (
    <div className="min-h-screen bg-background py-20 px-4">
      {/* ✅ Server Status Indicator */}
      <div className="fixed bottom-5 right-5 bg-card rounded-lg shadow-lg px-4 py-2 flex items-center gap-2 border border-border z-50">
        <span
          className={`w-3.5 h-3.5 rounded-full ${
            serverStatus === "online"
              ? "bg-green-500"
              : serverStatus === "offline"
              ? "bg-red-500"
              : "bg-gray-400"
          }`}
        />
        <span className="text-sm">
          {serverStatus === "online"
            ? "Server Online"
            : serverStatus === "offline"
            ? "Cannot connect to server"
            : "Checking server..."}
        </span>
      </div>

      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-primary">
          Health Information
        </h1>

        <form onSubmit={handleSubmit} className="bg-card rounded-xl shadow-lg p-8 space-y-6">
          {/* ✅ Age */}
          <div>
            <Label>Age Range</Label>
            <Select onValueChange={(v) => setFormData({ ...formData, age: v })}>
              <SelectTrigger><SelectValue placeholder="Select age range" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="5-15">5–15</SelectItem>
                <SelectItem value="40+">40+</SelectItem>
                <SelectItem value="50+">50+</SelectItem>
                <SelectItem value="60+">60+</SelectItem>
                <SelectItem value="65+">65+</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* ✅ Gender */}
          <div>
            <Label>Gender</Label>
            <Select onValueChange={(v) => setFormData({ ...formData, gender: v })}>
              <SelectTrigger><SelectValue placeholder="Select gender" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Male">Male</SelectItem>
                <SelectItem value="Female">Female</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* ✅ BMI */}
          <div>
            <Label>BMI</Label>
            <Select onValueChange={(v) => setFormData({ ...formData, bmi: v })}>
              <SelectTrigger><SelectValue placeholder="Select BMI range" /></SelectTrigger>
              <SelectContent>
                <SelectItem value=">=18.5">≥18.5</SelectItem>
                <SelectItem value=">=25">≥25</SelectItem>
                <SelectItem value="N/a">N/A</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* ✅ Blood Pressure */}
          <div>
            <Label>Blood Pressure</Label>
            <Select onValueChange={(v) => setFormData({ ...formData, bp: v })}>
              <SelectTrigger><SelectValue placeholder="Select BP" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="120/80">120/80</SelectItem>
                <SelectItem value=">130/80">&gt;130/80</SelectItem>
                <SelectItem value=">140/80">&gt;140/80</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* ✅ Symptoms */}
          <div>
            <Label>Symptoms</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
              {symptoms.map((symptom) => (
                <div key={symptom} className="flex items-center space-x-2">
                  <Checkbox
                    id={symptom}
                    checked={formData.symptoms.includes(symptom)}
                    onCheckedChange={(checked) =>
                      handleSymptomChange(symptom, checked === true)
                    }
                  />
                  <Label htmlFor={symptom}>{symptom}</Label>
                </div>
              ))}
            </div>
          </div>

          {/* ✅ Submit */}
          <Button type="submit" className="w-full mt-8" size="lg">
            Submit
          </Button>
        </form>
      </div>

      {/* ✅ Result Dialog */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-primary">{modalContent.title}</DialogTitle>
            <DialogDescription className="text-lg pt-4">
              {modalContent.message}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Questionnaire;
