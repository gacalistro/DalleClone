import clsx from "clsx";
import { CircleNotch, WarningCircle } from "@phosphor-icons/react";

interface SubmitButtonProps {
  showFetchErrorAlert: boolean;
  loading: boolean;
  errorMessage?: string;
}

export function SubmitButton({
  showFetchErrorAlert,
  loading,
  errorMessage = "Ocorreu um erro. Tente novamente.",
}: SubmitButtonProps) {
  return (
    <div className="mt-9 relative">
      {showFetchErrorAlert && (
        <span className="absolute -top-5 left-0 font-medium text-xs text-alert">
          {errorMessage}
        </span>
      )}

      <button
        className={clsx(
          "w-full h-14 flex items-center justify-center text-white bg-green-accent rounded-md hover:bg-green-dark transition-all",
          {
            ["bg-green-dark"]: loading,
            ["bg-alert disabled:bg-alert"]: showFetchErrorAlert,
          }
        )}
        disabled={loading || showFetchErrorAlert}
      >
        {loading ? (
          <CircleNotch size={20} className="animate-spin" />
        ) : showFetchErrorAlert ? (
          <WarningCircle size={20} />
        ) : (
          "Continue"
        )}
      </button>
    </div>
  );
}
