import { Dispatch, SetStateAction } from "react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";

import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc"; // ES 2015
import { bookAppointment } from "./actions";

dayjs.extend(utc);
dayjs.extend(timezone);

type Props = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  bookingDate: string | null;
};
export default function BookAppointmentDialog({ bookingDate, open, setOpen }: Props) {
  const handleConfirmAppointment = async () => {
    await bookAppointment(bookingDate!);
    setOpen(false);
  };
  if (bookingDate == null) return <></>;
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Book an Appointment</DialogTitle>
        </DialogHeader>
        <div>
          You are going to book an appointment at {dayjs(bookingDate).tz(dayjs.tz.guess()).format("YYYY-MM-DD h:mm A")}
        </div>

        <DialogFooter>
          <Button
            type="submit"
            onClick={async () => {
              await handleConfirmAppointment();
            }}
          >
            Book
          </Button>
          <Button type="button" variant={"destructive"} onClick={() => setOpen(false)}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
