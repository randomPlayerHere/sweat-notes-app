import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calculator, Loader2 } from "lucide-react";

interface CalorieFormData {
  user_id: string;
  age: string;
  gender: string;
  weight: string;
  height: string;
  workout_type: string;
  fat_percentage: string;
  workout_frequency: string;
  experience_level: string;
  bmi: string;
  intensity_level: string;
  session_duration: string;
}

interface CaloriePredictorFormProps {
  onPredict: (data: CalorieFormData) => void;
  isLoading?: boolean;
}

export default function CaloriePredictorForm({ onPredict, isLoading = false }: CaloriePredictorFormProps) {
  const [formData, setFormData] = useState<CalorieFormData>({
    user_id: "",
    age: "",
    gender: "",
    weight: "",
    height: "",
    workout_type: "",
    fat_percentage: "",
    workout_frequency: "",
    experience_level: "",
    bmi: "",
    intensity_level: "",
    session_duration: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.user_id && formData.age && formData.gender && formData.weight && formData.height && 
        formData.workout_type && formData.fat_percentage && formData.workout_frequency && 
        formData.experience_level && formData.bmi && formData.intensity_level && formData.session_duration) {
      onPredict(formData);
    }
  };

  const handleInputChange = (field: keyof CalorieFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const isFormValid = formData.user_id && formData.age && formData.gender && formData.weight && formData.height && 
                      formData.workout_type && formData.fat_percentage && formData.workout_frequency && 
                      formData.experience_level && formData.bmi && formData.intensity_level && formData.session_duration;

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-5 w-5" />
          Calorie Predictor
        </CardTitle>
        <CardDescription>
          Enter your information to calculate your daily calorie needs
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="user_id" data-testid="label-user-id">User ID</Label>
            <Input
              id="user_id"
              type="text"
              placeholder="user123"
              value={formData.user_id}
              onChange={(e) => handleInputChange("user_id", e.target.value)}
              data-testid="input-user-id"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="age" data-testid="label-age">Age</Label>
              <Input
                id="age"
                type="number"
                placeholder="25"
                value={formData.age}
                onChange={(e) => handleInputChange("age", e.target.value)}
                data-testid="input-age"
                min="10"
                max="100"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="gender" data-testid="label-gender">Gender</Label>
              <Select value={formData.gender} onValueChange={(value) => handleInputChange("gender", value)}>
                <SelectTrigger data-testid="select-gender">
                  <SelectValue placeholder="Gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="weight" data-testid="label-weight">Weight (kg)</Label>
              <Input
                id="weight"
                type="number"
                placeholder="70"
                value={formData.weight}
                onChange={(e) => handleInputChange("weight", e.target.value)}
                data-testid="input-weight"
                min="30"
                max="300"
                step="0.1"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="height" data-testid="label-height">Height (m)</Label>
              <Input
                id="height"
                type="number"
                placeholder="1.75"
                value={formData.height}
                onChange={(e) => handleInputChange("height", e.target.value)}
                data-testid="input-height"
                min="1.0"
                max="2.5"
                step="0.01"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="workout_type" data-testid="label-workout-type">Workout Type</Label>
            <Select value={formData.workout_type} onValueChange={(value) => handleInputChange("workout_type", value)}>
              <SelectTrigger data-testid="select-workout-type">
                <SelectValue placeholder="Select workout type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="HIIT">HIIT</SelectItem>
                <SelectItem value="Strength">Strength Training</SelectItem>
                <SelectItem value="Cardio">Cardio</SelectItem>
                <SelectItem value="Yoga">Yoga</SelectItem>
                <SelectItem value="Mixed">Mixed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="fat_percentage" data-testid="label-fat-percentage">Body Fat (%)</Label>
              <Input
                id="fat_percentage"
                type="number"
                placeholder="15.5"
                value={formData.fat_percentage}
                onChange={(e) => handleInputChange("fat_percentage", e.target.value)}
                data-testid="input-fat-percentage"
                min="5"
                max="50"
                step="0.1"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bmi" data-testid="label-bmi">BMI</Label>
              <Input
                id="bmi"
                type="number"
                placeholder="22.5"
                value={formData.bmi}
                onChange={(e) => handleInputChange("bmi", e.target.value)}
                data-testid="input-bmi"
                min="15"
                max="40"
                step="0.1"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="workout_frequency" data-testid="label-workout-frequency">Workouts/Week</Label>
              <Select value={formData.workout_frequency} onValueChange={(value) => handleInputChange("workout_frequency", value)}>
                <SelectTrigger data-testid="select-workout-frequency">
                  <SelectValue placeholder="Days" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 day</SelectItem>
                  <SelectItem value="2">2 days</SelectItem>
                  <SelectItem value="3">3 days</SelectItem>
                  <SelectItem value="4">4 days</SelectItem>
                  <SelectItem value="5">5 days</SelectItem>
                  <SelectItem value="6">6 days</SelectItem>
                  <SelectItem value="7">7 days</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="experience_level" data-testid="label-experience-level">Experience Level</Label>
              <Select value={formData.experience_level} onValueChange={(value) => handleInputChange("experience_level", value)}>
                <SelectTrigger data-testid="select-experience-level">
                  <SelectValue placeholder="Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Beginner (1)</SelectItem>
                  <SelectItem value="2">Intermediate (2)</SelectItem>
                  <SelectItem value="3">Advanced (3)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="intensity_level" data-testid="label-intensity-level">Intensity Level</Label>
              <Select value={formData.intensity_level} onValueChange={(value) => handleInputChange("intensity_level", value)}>
                <SelectTrigger data-testid="select-intensity-level">
                  <SelectValue placeholder="Intensity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Low (1)</SelectItem>
                  <SelectItem value="2">Medium (2)</SelectItem>
                  <SelectItem value="3">High (3)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="session_duration" data-testid="label-session-duration">Session Duration (min)</Label>
              <Input
                id="session_duration"
                type="number"
                placeholder="60"
                value={formData.session_duration}
                onChange={(e) => handleInputChange("session_duration", e.target.value)}
                data-testid="input-session-duration"
                min="15"
                max="180"
              />
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full" 
            disabled={!isFormValid || isLoading}
            data-testid="button-predict"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Calculating...
              </>
            ) : (
              "Calculate Calories"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}