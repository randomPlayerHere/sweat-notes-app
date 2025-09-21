import PredictionResult from '../PredictionResult';

export default function PredictionResultExample() {
  // todo: remove mock functionality
  const mockCalorieData = {
    user_id: "user123",
    predicted_calories: 2280
  };

  const mockUserInfo = {
    user_id: "user123",
    age: "28",
    gender: "Male",
    weight: "75",
    height: "1.80",
    workout_type: "HIIT",
    fat_percentage: "15.5",
    workout_frequency: "4",
    experience_level: "2",
    bmi: "23.2",
    intensity_level: "2",
    session_duration: "60"
  };

  return (
    <PredictionResult 
      data={mockCalorieData}
      userInfo={mockUserInfo}
    />
  );
}