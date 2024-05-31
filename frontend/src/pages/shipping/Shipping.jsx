import { Button } from "@material-tailwind/react";
import React from "react";
import OrderStep from "../../components/OrderStep";
import ShippingForm from "../../components/ShippingForm";
import PaymentForm from "../../components/PaymentForm";
import OrderPlacement from "../../components/OrderPlacement";


function Shipping() {
    
    const [activeStep, setActiveStep] = React.useState(0);
    const [isLastStep, setIsLastStep] = React.useState(false);
    const [isFirstStep, setIsFirstStep] = React.useState(false);

    const handleNext = () => !isLastStep && setActiveStep((cur) => cur + 1);
    const handlePrev = () => !isFirstStep && setActiveStep((cur) => cur - 1);

    return (
        <div className="w-full px-24 py-4 mt-7">
            <div>
                <OrderStep activeStep={activeStep} setActiveStep={setActiveStep} setIsFirstStep={setIsFirstStep} setIsLastStep={setIsLastStep} />
            </div>
            <div className="w-full">
                {activeStep == 0 ? (
                    <ShippingForm/>
                ) : activeStep == 1 ? (<PaymentForm/>) : (<OrderPlacement/>)}
            </div>
            <div className=" flex justify-between">
                <Button onClick={handlePrev} disabled={isFirstStep}>
                    Prev
                </Button>
                <Button onClick={handleNext} disabled={isLastStep}>
                    Next
                </Button>
            </div>
        </div>
    );
}

export default Shipping