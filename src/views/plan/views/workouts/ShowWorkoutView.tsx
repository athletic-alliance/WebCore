import React from "react";
import { useQuery } from "react-query";
import { fetchWorkout } from "../../../../adapter/workout.adapter";
import { useParams } from "react-router";
import Loader from "../../../../shared/components/Loader";
import { ShowWorkout } from "./components/ShowWorkout";

export const ShowWorkoutView = () => {
  let params = useParams();

  const { data, isLoading } = useQuery(["fetchWorkout", params.workoutId], () =>
    fetchWorkout(+params.workoutId!!)
  );

  return (
    <div className={"w-full"}>
      {isLoading && <Loader />}
      {data && <ShowWorkout workout={data} />}
    </div>
  );
};
