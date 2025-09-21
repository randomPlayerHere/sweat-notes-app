import CaloriePredictorForm from '../CaloriePredictorForm';

export default function CaloriePredictorFormExample() {
  const handlePredict = (data: any) => {
    console.log('Calorie prediction requested:', data);
    // todo: remove mock functionality
  };

  return (
    <CaloriePredictorForm 
      onPredict={handlePredict}
      isLoading={false}
    />
  );
}