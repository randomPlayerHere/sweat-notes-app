import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Dumbbell, Loader2 } from "lucide-react";

interface WorkoutFormData {
  query: string;
}

interface WorkoutGeneratorFormProps {
  onGenerate: (data: WorkoutFormData) => void;
  isLoading?: boolean;
}

export default function WorkoutGeneratorForm({ onGenerate, isLoading = false }: WorkoutGeneratorFormProps) {
  const [formData, setFormData] = useState<WorkoutFormData>({
    query: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.query.trim()) {
      onGenerate(formData);
    }
  };

  const handleInputChange = (value: string) => {
    setFormData({ query: value });
  };

  const isFormValid = formData.query.trim().length > 0;

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Dumbbell className="h-5 w-5" />
          Workout Generator
        </CardTitle>
        <CardDescription>
          Get a personalized workout plan based on your preferences
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="query" data-testid="label-query">Workout Request</Label>
            <Input
              id="query"
              type="text"
              placeholder="Generate a 4-day upper body workout plan for muscle gain with dumbbells"
              value={formData.query}
              onChange={(e) => handleInputChange(e.target.value)}
              data-testid="input-query"
              className="min-h-[60px] resize-none"
            />
            <p className="text-sm text-muted-foreground">
              Describe your ideal workout plan including goals, equipment, duration, and preferences.
            </p>
          </div>

          <div className="space-y-3">
            <Label className="text-sm font-medium">Example requests:</Label>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="p-2 bg-muted/50 rounded cursor-pointer hover-elevate" 
                   onClick={() => handleInputChange("Create a 3-day full body strength training plan for beginners")}>
                "Create a 3-day full body strength training plan for beginners"
              </div>
              <div className="p-2 bg-muted/50 rounded cursor-pointer hover-elevate" 
                   onClick={() => handleInputChange("4-day HIIT workout schedule for weight loss with no equipment")}>
                "4-day HIIT workout schedule for weight loss with no equipment"
              </div>
              <div className="p-2 bg-muted/50 rounded cursor-pointer hover-elevate" 
                   onClick={() => handleInputChange("Upper body muscle building program with dumbbells and resistance bands")}>
                "Upper body muscle building program with dumbbells and resistance bands"
              </div>
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full" 
            disabled={!isFormValid || isLoading}
            data-testid="button-generate"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              "Generate Workout"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}