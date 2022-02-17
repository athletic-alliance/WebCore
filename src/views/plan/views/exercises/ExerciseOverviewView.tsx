import React from "react";
import { useQuery } from "react-query";
import { fetchExercises } from "../../../../adapter";
import { ExerciseList } from "./components/ExerciseList";
import Loader from "../../../../shared/components/Loader";

export const ExerciseOverviewView = () => {
  const { data, isLoading } = useQuery("fetchExercises", fetchExercises);

  return (
    <div className={`w-full`}>
      {isLoading && <Loader />}
      {data && <ExerciseList exercises={data} />}
    </div>
  );
};
