import { Spinner } from "@material-tailwind/react";
 
export function Loading() {
  return (
    <div className="flex w-full justify-center">
      <Spinner color="indigo" className="h-14 w-14" />
    </div>
  );
}