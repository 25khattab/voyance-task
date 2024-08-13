import { Dispatch, SetStateAction } from "react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";

import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc"; // ES 2015
import { approveAppointment, rejectAppointment } from "./actions";

dayjs.extend(utc);
dayjs.extend(timezone);

type Props = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  bookingDate: string | null;
  appointmentId: string | null;
};
export default function ManageAppointmentDialog({ bookingDate, appointmentId, open, setOpen }: Props) {
  const handleApproveAppointment = async () => {
    if (!appointmentId) return;
    await approveAppointment(appointmentId);
    setOpen(false);
  };

  const handleRejectAppointment = async () => {
    if (!appointmentId) return;
    await rejectAppointment(appointmentId);
    setOpen(false);
  };

  if (bookingDate == null) return <></>;
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Manage an Appointment</DialogTitle>
        </DialogHeader>
        <div>
          You are going to approve or reject an appointment at{" "}
          {dayjs(bookingDate).tz(dayjs.tz.guess()).format("YYYY-MM-DD h:mm A")}
        </div>

        <DialogFooter>
          <Button
            type="submit"
            onClick={async () => {
              await handleApproveAppointment();
            }}
          >
            Accept
          </Button>
          <Button type="button" variant={"destructive"} onClick={async () => await handleRejectAppointment()}>
            Reject
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
