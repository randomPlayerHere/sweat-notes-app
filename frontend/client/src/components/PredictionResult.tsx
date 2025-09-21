import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Target, Activity } from "lucide-react";

interface CalorieData {
  user_id: string;
  predicted_calories: number;
}

interface PredictionResultProps {
  data: CalorieData;
  userInfo?: {
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
  };
}

export default function PredictionResult({ data, userInfo }: PredictionResultProps) {
  const formatCalories = (calories: number) => Math.round(calories).toLocaleString();

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          Your Calorie Prediction
        </CardTitle>
        <CardDescription>
          Daily calorie recommendations based on your profile
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {userInfo && (
          <div className="grid grid-cols-2 gap-3 text-sm" data-testid="user-summary">
            <div>
              <span className="text-muted-foreground">User ID:</span> {userInfo.user_id}
            </div>
            <div>
              <span className="text-muted-foreground">Age:</span> {userInfo.age}
            </div>
            <div>
              <span className="text-muted-foreground">Gender:</span> {userInfo.gender}
            </div>
            <div>
              <span className="text-muted-foreground">Weight:</span> {userInfo.weight} kg
            </div>
            <div>
              <span className="text-muted-foreground">Height:</span> {userInfo.height} m
            </div>
            <div>
              <span className="text-muted-foreground">Workout Type:</span> {userInfo.workout_type}
            </div>
            <div>
              <span className="text-muted-foreground">Body Fat:</span> {userInfo.fat_percentage}%
            </div>
            <div>
              <span className="text-muted-foreground">BMI:</span> {userInfo.bmi}
            </div>
            <div>
              <span className="text-muted-foreground">Frequency:</span> {userInfo.workout_frequency}/week
            </div>
            <div>
              <span className="text-muted-foreground">Experience:</span> Level {userInfo.experience_level}
            </div>
            <div>
              <span className="text-muted-foreground">Intensity:</span> Level {userInfo.intensity_level}
            </div>
            <div>
              <span className="text-muted-foreground">Duration:</span> {userInfo.session_duration} min
            </div>
          </div>
        )}

        <div className="space-y-4">
          <div className="flex justify-between items-center p-4 bg-primary/10 rounded-lg border border-primary/20">
            <div className="flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              <div>
                <div className="font-semibold text-lg" data-testid="text-predicted-calories">Predicted Daily Calories</div>
                <div className="text-sm text-muted-foreground">Based on your profile and goals</div>
              </div>
            </div>
            <Badge className="text-lg py-2 px-4" data-testid="value-predicted-calories">
              {formatCalories(data.predicted_calories)} cal
            </Badge>
          </div>

          <div className="p-3 bg-muted/50 rounded-lg">
            <p className="text-sm text-muted-foreground text-center">
              This prediction is tailored to your specific workout type, intensity, and goals.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}