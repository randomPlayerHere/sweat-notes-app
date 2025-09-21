import WorkoutGeneratorForm from '../WorkoutGeneratorForm';

export default function WorkoutGeneratorFormExample() {
  const handleGenerate = (data: any) => {
    console.log('Workout generation requested:', data);
    // todo: remove mock functionality
  };

  return (
    <WorkoutGeneratorForm 
      onGenerate={handleGenerate}
      isLoading={false}
    />
  );
}