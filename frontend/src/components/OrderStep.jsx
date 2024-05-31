import { Stepper, Step, Typography } from "@material-tailwind/react";
import {
  CogIcon,
  UserIcon,
  BuildingLibraryIcon,
} from "@heroicons/react/24/outline";

const OrderStep = ({activeStep,setIsFirstStep,setIsLastStep,setActiveStep}) => {
  return (
    <Stepper
    activeStep={activeStep}
    isLastStep={(value) => setIsLastStep(value)}
    isFirstStep={(value) => setIsFirstStep(value)}
  >
    <Step onClick={() => setActiveStep(0)}>
      <UserIcon className="h-5 w-5" />
      <div className="absolute -bottom-[2rem] w-max text-center">
        <Typography
          variant="h6"
          color={activeStep === 0 ? "blue-gray" : "gray"}
        >
          Shipping
        </Typography>
      </div>
    </Step>
    <Step onClick={() => setActiveStep(1)}>
      <CogIcon className="h-5 w-5" />
      <div className="absolute -bottom-[2rem] w-max text-center">
        <Typography
          variant="h6"
          color={activeStep === 1 ? "blue-gray" : "gray"}
        >
          Payment Method
        </Typography>
       
      </div>
    </Step>
    <Step onClick={() => setActiveStep(2)}>
      <BuildingLibraryIcon className="h-5 w-5" />
      <div className="absolute -bottom-[2rem] w-max text-center">
        <Typography
          variant="h6"
          color={activeStep === 2 ? "blue-gray" : "gray"}
        >
          Order placement
        </Typography>
       
      </div>
    </Step>
  </Stepper>
  )
}

export default OrderStep