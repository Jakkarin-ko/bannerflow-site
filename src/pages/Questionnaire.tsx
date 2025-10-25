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
  const { toast } = useToast();

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

  const symptoms = [
    "Wheezing", "Headache", "Short Breaths", "Rapid Breathing", "Anxiety",
    "Urine at Night", "Irritability", "Blurred Vision", "Slow Healing",
    "Dry Mouth", "Muscle Aches", "Nausea/Vomiting", "Insomnia",
    "Chest Pain", "Dizziness", "Nosebleeds", "Foamy Urine",
    "Abdominal Pain", "Itchy Skin", "Dark Urine", "Bone Pain",
  ];

  useEffect(() => {
    const checkServerStatus = async () => {
      try {
        const res = await fetch(`${API_ENDPOINT}/api/status`);
        const data = await res.json();
        setServerStatus(data.status === "online" ? "online" : "offline");
        if (data.status !== "online") setTimeout(checkServerStatus, 5000);
      } catch {
        setServerStatus("offline");
        setTimeout(checkServerStatus, 5000);
      }
    };
    checkServerStatus();
  }, []);

  const handleSymptomChange = (symptom: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      symptoms: checked ? [...prev.symptoms, symptom] : prev.symptoms.filter(s => s !== symptom),
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const data62Features: Record<string, number> = {
      "0-1":0,"5-15":0,"10-20":0,"40+":0,"45+":0,"50+":0,"60+":0,"65+":0,
      "<500":0,"<800":0,"350-550":0,"800-2000":0,"2000-3000":0,">2000":0,">3000":0,
      ">=18.5":0,">=25":0,"N/a":0,"<=2700":0,">=3700":0,"120/80":0,">130/80":0,
      "<130/80":0,">=130/80":0,">140/80":0,"95-145/80":0,"Mass":0,"Negligible":0,
      "Overweight":0,"M+/-":0,"M+7Kg":0,"-M+7Kg or 10Kg":0,"M minus 1Kg":0,
      "M minus 5Kg":0,"M minus 10Kg":0,"M minus 0.5-1Kg":0,"<M":0,"No change":0,
      "Negligible.1":0,"Male":0,"Female":0,
      ...Object.fromEntries(symptoms.map(s => [s, 0]))
    };

    // Map dropdowns
    (["age","urine","bmi","water","bp","mass","massChange","gender"] as const).forEach(field => {
      const value = formData[field];
      if (value && data62Features.hasOwnProperty(value)) data62Features[value] = 1;
    });

    // Map symptoms
    formData.symptoms.forEach(symptom => {
      if (data62Features.hasOwnProperty(symptom)) data62Features[symptom] = 1;
    });

    try {
      const res = await fetch(`${API_ENDPOINT}/predict`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data62Features),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const result = await res.json();
      setModalContent({ title: "Analysis Result", message: `Predicted Disease: ${result.prediction}` });
      setIsModalOpen(true);
    } catch (err: any) {
      toast({ title: "Error", description: `Could not connect: ${err.message}`, variant: "destructive" });
    }
  };

  return (
    <div className="min-h-screen bg-background py-20 px-4">
      {/* Server Status */}
      <div className="fixed bottom-5 right-5 bg-card rounded-lg shadow-lg px-4 py-2 flex items-center gap-2 border border-border z-50">
        <span className={`w-3.5 h-3.5 rounded-full ${serverStatus==="online"?"bg-green-500":serverStatus==="offline"?"bg-red-500":"bg-gray-400"}`}/>
        <span className="text-sm">
          {serverStatus==="online"?"Server Online":serverStatus==="offline"?"Cannot connect":"Checking server..."}
        </span>
      </div>

      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-primary">Health Information</h1>
        <form onSubmit={handleSubmit} className="bg-card rounded-xl shadow-lg p-8 space-y-6">

          {/* Age */}
          <div>
            <Label>Age</Label>
            <Select onValueChange={(v)=>setFormData({...formData, age:v})}>
              <SelectTrigger><SelectValue placeholder="Select age"/></SelectTrigger>
              <SelectContent>
                {["0-1","5-15","10-20","40+","45+","50+","60+","65+"].map(v => <SelectItem key={v} value={v}>{v}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>

          {/* Urine */}
          <div>
            <Label>Urine per Day</Label>
            <Select onValueChange={(v)=>setFormData({...formData, urine:v})}>
              <SelectTrigger><SelectValue placeholder="Select urine"/></SelectTrigger>
              <SelectContent>
                ["<500","<800","350-550","800-2000","2000-3000",">2000",">3000"].map(v => <SelectItem key={v} value={v}>{v}</SelectItem>)
              </SelectContent>
            </Select>
          </div>

          {/* BMI */}
          <div>
            <Label>BMI</Label>
            <Select onValueChange={(v)=>setFormData({...formData, bmi:v})}>
              <SelectTrigger><SelectValue placeholder="Select BMI"/></SelectTrigger>
              <SelectContent>
                [">=18.5",">=25","N/a"].map(v => <SelectItem key={v} value={v}>{v}</SelectItem>)
              </SelectContent>
            </Select>
          </div>

          {/* Water */}
          <div>
            <Label>Water Intake</Label>
            <Select onValueChange={(v)=>setFormData({...formData, water:v})}>
              <SelectTrigger><SelectValue placeholder="Select water"/></SelectTrigger>
              <SelectContent>
                ["<=2700",">=3700"].map(v => <SelectItem key={v} value={v}>{v}</SelectItem>)
              </SelectContent>
            </Select>
          </div>

          {/* Blood Pressure */}
          <div>
            <Label>Blood Pressure</Label>
            <Select onValueChange={(v)=>setFormData({...formData, bp:v})}>
              <SelectTrigger><SelectValue placeholder="Select BP"/></SelectTrigger>
              <SelectContent>
                ["120/80",">130/80","<130/80",">=130/80",">140/80","95-145/80"].map(v => <SelectItem key={v} value={v}>{v}</SelectItem>)
              </SelectContent>
            </Select>
          </div>

          {/* Mass */}
          <div>
            <Label>Mass</Label>
            <Select onValueChange={(v)=>setFormData({...formData, mass:v})}>
              <SelectTrigger><SelectValue placeholder="Select mass"/></SelectTrigger>
              <SelectContent>
                ["Mass","Negligible","Overweight"].map(v => <SelectItem key={v} value={v}>{v}</SelectItem>)
              </SelectContent>
            </Select>
          </div>

          {/* Mass Change */}
          <div>
            <Label>Mass Change</Label>
            <Select onValueChange={(v)=>setFormData({...formData, massChange:v})}>
              <SelectTrigger><SelectValue placeholder="Select mass change"/></SelectTrigger>
              <SelectContent>
                ["M+/-","M+7Kg","-M+7Kg or 10Kg","M minus 1Kg","M minus 5Kg","M minus 10Kg","M minus 0.5-1Kg","<M","No change","Negligible.1"].map(v => <SelectItem key={v} value={v}>{v}</SelectItem>)
              </SelectContent>
            </Select>
          </div>

          {/* Gender */}
          <div>
            <Label>Gender</Label>
            <Select onValueChange={(v)=>setFormData({...formData, gender:v})}>
              <SelectTrigger><SelectValue placeholder="Select gender"/></SelectTrigger>
              <SelectContent>
                {["Male","Female"].map(v => <SelectItem key={v} value={v}>{v}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>

          {/* Symptoms */}
          <div>
            <Label>Symptoms</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
              {symptoms.map(symptom => (
                <div key={symptom} className="flex items-center space-x-2">
                  <Checkbox
                    id={symptom}
                    checked={formData.symptoms.includes(symptom)}
                    onCheckedChange={checked => handleSymptomChange(symptom, checked===true)}
                  />
                  <Label htmlFor={symptom}>{symptom}</Label>
                </div>
              ))}
            </div>
          </div>

          <Button type="submit" className="w-full mt-8" size="lg">Submit</Button>
        </form>
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-primary">{modalContent.title}</DialogTitle>
            <DialogDescription className="text-lg pt-4">{modalContent.message}</DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Questionnaire;
