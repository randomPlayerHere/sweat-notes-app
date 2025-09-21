import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Target, Dumbbell, CheckCircle } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface Exercise {
  name: string;
  sets: number;
  reps: string;
  rest_time_seconds: number;
  notes: string;
}

interface WorkoutDay {
  day: string;
  exercises: Exercise[];
}

interface WorkoutData {
  days_per_week: number;
  days: WorkoutDay[];
  injuries_considered: string[];
  preferences_respected: string[];
}

interface WorkoutPlanProps {
  data: WorkoutData;
  query?: string;
}

export default function WorkoutPlan({ data, query }: WorkoutPlanProps) {
  const [completedExercises, setCompletedExercises] = useState<Set<string>>(new Set());

  const toggleExerciseComplete = (dayIndex: number, exerciseIndex: number) => {
    const exerciseId = `${dayIndex}-${exerciseIndex}`;
    setCompletedExercises(prev => {
      const newSet = new Set(prev);
      if (newSet.has(exerciseId)) {
        newSet.delete(exerciseId);
      } else {
        newSet.add(exerciseId);
      }
      return newSet;
    });
    console.log(`Exercise ${exerciseIndex + 1} on ${data.days[dayIndex]?.day} ${completedExercises.has(exerciseId) ? 'uncompleted' : 'completed'}`);
  };

  const formatRestTime = (seconds: number) => {
    if (seconds >= 60) {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      return remainingSeconds > 0 ? `${minutes}m ${remainingSeconds}s` : `${minutes}m`;
    }
    return `${seconds}s`;
  };

  const totalExercises = data.days.reduce((total, day) => total + day.exercises.length, 0);

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Dumbbell className="h-5 w-5" />
          Workout Plan
        </CardTitle>
        <CardDescription>
          Your personalized {data.days_per_week}-day workout program
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {query && (
          <div className="p-3 bg-muted/50 rounded-lg" data-testid="workout-query">
            <h5 className="font-medium text-sm mb-1">Your Request</h5>
            <p className="text-sm text-muted-foreground">"{query}"</p>
          </div>
        )}

        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {data.days_per_week} days/week
          </Badge>
          <Badge variant="outline" className="flex items-center gap-1">
            <Target className="h-3 w-3" />
            {totalExercises} exercises
          </Badge>
        </div>

        <div className="space-y-4">
          <h4 className="font-medium text-sm uppercase tracking-wide text-muted-foreground">
            Weekly Schedule ({completedExercises.size}/{totalExercises} completed)
          </h4>
          
          <div className="space-y-4">
            {data.days.map((day, dayIndex) => (
              <div key={dayIndex} className="space-y-3">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="font-medium">
                    {day.day}
                  </Badge>
                  <span className="text-sm text-muted-foreground">
                    {day.exercises.length} exercises
                  </span>
                </div>
                
                <div className="space-y-2 ml-4">
                  {day.exercises.map((exercise, exerciseIndex) => {
                    const exerciseId = `${dayIndex}-${exerciseIndex}`;
                    const isCompleted = completedExercises.has(exerciseId);
                    
                    return (
                      <div 
                        key={exerciseIndex}
                        className={`p-3 rounded-lg border transition-all ${
                          isCompleted 
                            ? 'bg-chart-2/10 border-chart-2/20' 
                            : 'bg-card border-card-border hover-elevate'
                        }`}
                        data-testid={`exercise-${dayIndex}-${exerciseIndex}`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <h5 className={`font-medium ${isCompleted ? 'line-through text-muted-foreground' : ''}`}>
                                {exercise.name}
                              </h5>
                              {isCompleted && (
                                <CheckCircle className="h-4 w-4 text-chart-2 flex-shrink-0" />
                              )}
                            </div>
                            
                            <div className="flex flex-wrap gap-2 mt-1 text-sm text-muted-foreground">
                              <span>{exercise.sets} sets × {exercise.reps}</span>
                              <span>Rest: {formatRestTime(exercise.rest_time_seconds)}</span>
                            </div>

                            {exercise.notes && (
                              <p className="text-sm text-muted-foreground mt-2">{exercise.notes}</p>
                            )}
                          </div>
                          
                          <Button
                            size="sm"
                            variant={isCompleted ? "secondary" : "outline"}
                            onClick={() => toggleExerciseComplete(dayIndex, exerciseIndex)}
                            data-testid={`button-complete-${dayIndex}-${exerciseIndex}`}
                            className="flex-shrink-0"
                          >
                            {isCompleted ? "Undo" : "Done"}
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {data.preferences_respected && data.preferences_respected.length > 0 && (
          <div className="p-3 bg-primary/10 rounded-lg border border-primary/20">
            <h5 className="font-medium text-sm mb-2 text-primary">Preferences Respected</h5>
            <ul className="text-sm text-muted-foreground space-y-1">
              {data.preferences_respected.map((pref, index) => (
                <li key={index} className="flex items-start gap-2">
                  <CheckCircle className="h-3 w-3 text-chart-2 flex-shrink-0 mt-1" />
                  {pref}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="text-center">
          <Button 
            variant="outline" 
            onClick={() => {
              setCompletedExercises(new Set());
              console.log('Workout reset');
            }}
            data-testid="button-reset-workout"
          >
            Reset Progress
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}