import { useState } from "react";
import Header from "@/components/Header";
import CaloriePredictorForm from "@/components/CaloriePredictorForm";
import WorkoutGeneratorForm from "@/components/WorkoutGeneratorForm";
import PredictionResult from "@/components/PredictionResult";
import WorkoutPlan from "@/components/WorkoutPlan";

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

interface WorkoutFormData {
  query: string;
}

interface CalorieResult {
  user_id: string;
  predicted_calories: number;
}

interface WorkoutResult {
  days_per_week: number;
  days: Array<{
    day: string;
    exercises: Array<{
      name: string;
      sets: number;
      reps: string;
      rest_time_seconds: number;
      notes: string;
    }>;
  }>;
  injuries_considered: string[];
  preferences_respected: string[];
}

export default function Home() {
  const [calorieResult, setCalorieResult] = useState<CalorieResult | null>(null);
  const [workoutResult, setWorkoutResult] = useState<WorkoutResult | null>(null);
  const [calorieFormData, setCalorieFormData] = useState<CalorieFormData | null>(null);
  const [workoutQuery, setWorkoutQuery] = useState<string | null>(null);
  const [loadingCalories, setLoadingCalories] = useState(false);
  const [loadingWorkout, setLoadingWorkout] = useState(false);

  const handleCaloriePredict = async (data: CalorieFormData) => {
    setLoadingCalories(true);
    setCalorieFormData(data);
    
    try {
      // todo: replace with actual API call to FastAPI backend
      console.log('Sending calorie prediction request:', data);
      
      // Mock API response (todo: remove mock functionality)
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API delay
      
      // Convert form data to API format
      const apiData = {
        user_id: data.user_id,
        age: parseInt(data.age),
        gender: data.gender,
        weight: parseFloat(data.weight),
        height: parseFloat(data.height),
        workout_type: data.workout_type,
        fat_percentage: parseFloat(data.fat_percentage),
        workout_frequency: parseInt(data.workout_frequency),
        experience_level: parseInt(data.experience_level),
        bmi: parseFloat(data.bmi),
        intensity_level: parseInt(data.intensity_level),
        session_duration: parseInt(data.session_duration)
      };
      
      // Mock prediction based on basic BMR calculation 
      const weight = apiData.weight;
      const height = apiData.height * 100; // convert to cm
      const age = apiData.age;
      
      let bmr: number;
      if (apiData.gender === 'Male') {
        bmr = (10 * weight) + (6.25 * height) - (5 * age) + 5;
      } else {
        bmr = (10 * weight) + (6.25 * height) - (5 * age) - 161;
      }
      
      // Adjust for workout frequency and intensity
      const activityMultiplier = 1.2 + (apiData.workout_frequency * 0.1) + (apiData.intensity_level * 0.05);
      const predictedCalories = Math.round(bmr * activityMultiplier);
      
      const mockResult: CalorieResult = {
        user_id: apiData.user_id,
        predicted_calories: predictedCalories
      };
      
      setCalorieResult(mockResult);
    } catch (error) {
      console.error('Error predicting calories:', error);
      // todo: add proper error handling
    } finally {
      setLoadingCalories(false);
    }
  };

  const handleWorkoutGenerate = async (data: WorkoutFormData) => {
    setLoadingWorkout(true);
    setWorkoutQuery(data.query);
    
    try {
      // todo: replace with actual API call to FastAPI backend
      console.log('Sending workout generation request:', data);
      
      // Mock generation for demo (todo: remove mock functionality)
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API delay
      
      // Generate mock workout based on query keywords
      const query = data.query.toLowerCase();
      const isDumbbell = query.includes('dumbbell');
      const isHiit = query.includes('hiit');
      const isUpperBody = query.includes('upper');
      const is4Day = query.includes('4') || query.includes('four');
      const is3Day = query.includes('3') || query.includes('three');
      
      const daysPerWeek = is4Day ? 4 : is3Day ? 3 : 3;
      
      const mockResult: WorkoutResult = {
        days_per_week: daysPerWeek,
        days: [
          {
            day: "Monday",
            exercises: [
              {
                name: isDumbbell ? "Dumbbell Bicep Curl" : isHiit ? "Burpees" : "Push-ups",
                sets: 3,
                reps: isHiit ? "10-15" : "8-12",
                rest_time_seconds: isHiit ? 30 : 60,
                notes: isHiit ? "High intensity, minimal rest" : "Control the movement"
              },
              {
                name: isUpperBody ? "Overhead Press" : "Squats",
                sets: 3,
                reps: "10-12",
                rest_time_seconds: 60,
                notes: "Focus on form"
              }
            ]
          },
          {
            day: "Wednesday",
            exercises: [
              {
                name: isDumbbell ? "Dumbbell Rows" : isHiit ? "Mountain Climbers" : "Pull-ups",
                sets: 3,
                reps: isHiit ? "20-30" : "6-10",
                rest_time_seconds: isHiit ? 30 : 90,
                notes: isHiit ? "Fast pace" : "Full range of motion"
              }
            ]
          },
          {
            day: "Friday",
            exercises: [
              {
                name: isDumbbell ? "Dumbbell Chest Press" : isHiit ? "Jump Squats" : "Dips",
                sets: 3,
                reps: isHiit ? "15-20" : "8-12",
                rest_time_seconds: isHiit ? 45 : 75,
                notes: isHiit ? "Explosive movement" : "Steady tempo"
              }
            ]
          }
        ],
        injuries_considered: [],
        preferences_respected: [
          query.includes('day') ? `${daysPerWeek} day workout plan` : "Custom workout plan",
          isDumbbell ? "Using dumbbells" : isHiit ? "HIIT training focus" : "Bodyweight exercises"
        ]
      };
      
      // Add 4th day if requested
      if (is4Day && mockResult.days.length === 3) {
        mockResult.days.push({
          day: "Sunday",
          exercises: [
            {
              name: isHiit ? "High Knees" : "Plank",
              sets: isHiit ? 4 : 3,
              reps: isHiit ? "30s" : "45-60s",
              rest_time_seconds: 30,
              notes: isHiit ? "Cardio finisher" : "Core stability"
            }
          ]
        });
      }
      
      setWorkoutResult(mockResult);
    } catch (error) {
      console.error('Error generating workout:', error);
      // todo: add proper error handling
    } finally {
      setLoadingWorkout(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4" data-testid="page-title">
              Your Fitness Tools
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="page-description">
              Calculate your daily calorie needs and get personalized workout plans to reach your fitness goals.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {/* Calorie Predictor Section */}
            <div className="space-y-6">
              <CaloriePredictorForm 
                onPredict={handleCaloriePredict}
                isLoading={loadingCalories}
              />
              
              {calorieResult && (
                <PredictionResult 
                  data={calorieResult}
                  userInfo={calorieFormData || undefined}
                />
              )}
            </div>

            {/* Workout Generator Section */}
            <div className="space-y-6">
              <WorkoutGeneratorForm 
                onGenerate={handleWorkoutGenerate}
                isLoading={loadingWorkout}
              />
              
              {workoutResult && (
                <WorkoutPlan 
                  data={workoutResult}
                  query={workoutQuery || undefined}
                />
              )}
            </div>
          </div>

          {/* Instructions */}
          <div className="bg-muted/50 rounded-lg p-6 text-center">
            <h3 className="font-semibold mb-2" data-testid="instructions-title">
              How to use
            </h3>
            <p className="text-muted-foreground" data-testid="instructions-text">
              Fill out the forms above to get your personalized calorie recommendations and workout plans. 
              All calculations are based on scientifically proven formulas and fitness guidelines.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}