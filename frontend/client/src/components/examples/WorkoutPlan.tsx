import WorkoutPlan from '../WorkoutPlan';

export default function WorkoutPlanExample() {
  // todo: remove mock functionality
  const mockWorkoutData = {
    days_per_week: 4,
    days: [
      {
        day: "Monday",
        exercises: [
          {
            name: "Dumbbell Bicep Curl",
            sets: 3,
            reps: "8-12",
            rest_time_seconds: 60,
            notes: "Keep elbows stationary"
          },
          {
            name: "Standing Dumbbell Reverse Curl",
            sets: 3,
            reps: "10-15",
            rest_time_seconds: 60,
            notes: "Focus on forearm activation"
          }
        ]
      },
      {
        day: "Wednesday",
        exercises: [
          {
            name: "High Cable Curls",
            sets: 3,
            reps: "12-15",
            rest_time_seconds: 60,
            notes: "Squeeze at the top"
          },
          {
            name: "Hammer Curls",
            sets: 2,
            reps: "8-10",
            rest_time_seconds: 90,
            notes: "Neutral grip throughout"
          }
        ]
      },
      {
        day: "Friday",
        exercises: [
          {
            name: "Preacher Curls",
            sets: 3,
            reps: "8-12",
            rest_time_seconds: 75,
            notes: "Control the negative"
          }
        ]
      },
      {
        day: "Sunday",
        exercises: [
          {
            name: "Cable Rope Curls",
            sets: 3,
            reps: "12-15",
            rest_time_seconds: 60,
            notes: "Split the rope at the top"
          }
        ]
      }
    ],
    injuries_considered: [],
    preferences_respected: [
      "4 day workout plan",
      "Focus on bicep development"
    ]
  };

  const mockQuery = "Create a 4-day bicep focused workout plan with dumbbells and cables";

  return (
    <WorkoutPlan 
      data={mockWorkoutData}
      query={mockQuery}
    />
  );
}