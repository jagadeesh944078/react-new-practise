import { useState, useRef, useEffect } from "react";

const CheckoutStepper = ({ stepsConfig = [] }) => {
  const [currentStep, setCurrentStep] = useState(2);
  const [isCompleted, setIsCompleted] = useState(false);
  const [margins, setMargins] = useState({ marginLeft: 0, marginRight: 0 });
  const stepRef = useRef([]);

  useEffect(() => {
    setMargins({
      marginLeft: stepRef.current[0].offsetWidth / 2,
      marginRight: stepRef.current[stepsConfig.length - 1].offsetWidth / 2,
    });
  }, [stepRef, stepsConfig.length]);

  if (!stepsConfig.length) {
    return <></>;
  }

  const handleClick = () => {
    setCurrentStep((prevStep) => {
      if (prevStep === stepsConfig.length) {
        setIsCompleted(true);
        return prevStep;
      } else {
        return prevStep + 1;
      }
    });
  };

  const ActiveComponent = stepsConfig[currentStep - 1]?.Component;

  const calculateProgressBarWidth = () => {
    return ((currentStep - 1) / (stepsConfig.length - 1)) * 100;
  };

  return (
    <>
      <div className="stepper">
        {stepsConfig.map((steps, index) => {
          return (
            <div
              key={steps.name}
              ref={(el) => (stepRef.current[index] = el)}
              className={`step ${
                currentStep > index + 1 || isCompleted ? "completed" : ""
              } ${currentStep === index + 1 && !isCompleted ? "active" : ""} `}
            >
              <div className="step-number">
                {currentStep > index + 1 || isCompleted ? (
                  <span>&#10003;</span>
                ) : (
                  index + 1
                )}
              </div>
              <div className="step-name">{steps.name}</div>
            </div>
          );
        })}
        <div
          className="progress-bar"
          style={{
            width: `calc(100%-${margins.marginLeft + margins.marginRight}px)`,
            marginLeft: margins.marginLeft,
            marginRight: margins.marginRight,
          }}
        >
          <div
            className="progress"
            style={{ width: `${calculateProgressBarWidth()}%` }}
          ></div>
        </div>
      </div>
      <ActiveComponent />
      {!isCompleted && (
        <button onClick={handleClick}>
          {currentStep === stepsConfig.length ? "Finish" : "Next"}
        </button>
      )}
    </>
  );
};

export default CheckoutStepper;
