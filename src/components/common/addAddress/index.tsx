import { addAddress } from "@/actions/address";
import { Button, Label, Modal, TextInput } from "flowbite-react";
import { useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { toast } from "react-toastify";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      isProcessing={pending}
      className=" mt-4"
      type="submit"
      title="Log In"
    >
      <p className=" text-base font-bold">Add</p>
    </Button>
  );
}

type Props = {
  showModal: boolean;
  onClose: () => void;
  callback: () => void;
};

export default function AddAddress({ showModal, onClose, callback }: Props) {
  let [state, formAction] = useFormState(addAddress, null);
  const getError = (input: string) => {
    return state?.errors?.length
      ? state?.errors.find((error) => error.path.includes(input))?.message
      : "";
  };
  useEffect(() => {
    if (state?.success) {
      toast.success(state.message);
      callback();
      onClose();
    } else if (state && !state.success) {
      toast.error(state.message);
    }
  }, [state, callback, onClose]);
  return (
    <Modal show={showModal} onClose={onClose}>
      <Modal.Header>Add Address</Modal.Header>
      <form action={formAction} className="flex flex-col gap-4 p-4">
        <div>
          <Label>
            <p className=" text-base font-medium">Address Line 1*</p>
          </Label>
          <TextInput
            color={
              state?.validationFail && getError("addressLine1")
                ? "failure"
                : undefined
            }
            id="addressLine1"
            name="addressLine1"
            type="text"
            placeholder="Address Line 1"
          />
          <p className=" text-sm font-medium text-red-700 text-right">
            {state?.validationFail && getError("addressLine1")}
          </p>
        </div>
        <div className=" flex gap-4">
          <div className=" basis-1/2">
            <Label>
              <p className=" text-base font-medium">City*</p>
            </Label>
            <TextInput
              color={
                state?.validationFail && getError("city")
                  ? "failure"
                  : undefined
              }
              id="city"
              name="city"
              type="text"
              placeholder="City"
            />
            <p className=" text-sm font-medium text-red-700 text-right">
              {state?.validationFail && getError("city")}
            </p>
          </div>
          <div className=" basis-1/2">
            <Label>
              <p className=" text-base font-medium">State*</p>
            </Label>
            <TextInput
              color={
                state?.validationFail && getError("state")
                  ? "failure"
                  : undefined
              }
              id="state"
              name="state"
              type="text"
              placeholder="State"
            />
            <p className=" text-sm font-medium text-red-700 text-right">
              {state?.validationFail && getError("state")}
            </p>
          </div>
        </div>
        <div className=" w-1/2 pr-2">
          <Label>
            <p className=" text-base font-medium">Zip Code*</p>
          </Label>
          <TextInput
            color={
              state?.validationFail && getError("state") ? "failure" : undefined
            }
            id="zipCode"
            name="zipCode"
            type="number"
            placeholder="Zip Code"
          />
          <p className=" text-sm font-medium text-red-700 text-right">
            {state?.validationFail && getError("zipCode")}
          </p>
        </div>
        <SubmitButton />
      </form>
    </Modal>
  );
}
